# CloudOps Platform Terraform Configuration

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Configuration
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"  
  
  name = "${var.project_name}-vpc"
  cidr = var.vpc_cidr
  
  azs             = var.availability_zones
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets
  
  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"
  enable_vpn_gateway = false
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
    Terraform   = "true"
  }
}

# Security Groups
resource "aws_security_group" "api_sg" {
  name        = "${var.project_name}-api-sg"
  description = "Security group for API servers"
  vpc_id      = module.vpc.vpc_id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
    Terraform   = "true"
  }
}

resource "aws_security_group" "db_sg" {
  name        = "${var.project_name}-db-sg"
  description = "Security group for database servers"
  vpc_id      = module.vpc.vpc_id
  
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.api_sg.id]
  }
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
    Terraform   = "true"
  }
}

# RDS Database
resource "aws_db_instance" "postgres" {
  identifier           = "${var.project_name}-db"
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = var.db_instance_class
  allocated_storage    = var.db_allocated_storage
  storage_encrypted    = true
  
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.postgres.name
  
  backup_retention_period = var.environment == "production" ? 7 : 1
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = var.environment != "production"
  deletion_protection = var.environment == "production"
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
    Terraform   = "true"
  }
}

resource "aws_db_subnet_group" "postgres" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = module.vpc.private_subnets
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
    Terraform   = "true"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"
  
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
    Terraform   = "true"
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.api_sg.id]
  subnets            = module.vpc.public_subnets
  
  enable_deletion_protection = var.environment == "production"
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
    Terraform   = "true"
  }
}

# S3 Bucket for static assets
resource "aws_s3_bucket" "assets" {
  bucket = "${var.project_name}-assets-${random_string.bucket_suffix.result}"
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
    Terraform   = "true"
  }
}

resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "assets" {
  bucket = aws_s3_bucket.assets.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# CloudWatch Log Groups
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/${var.project_name}"
  retention_in_days = var.environment == "production" ? 30 : 7
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
    Terraform   = "true"
  }
}