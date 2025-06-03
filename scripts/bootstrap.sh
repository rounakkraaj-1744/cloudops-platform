#!/bin/bash

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    local tools=("docker" "kubectl" "helm" "terraform")
    local missing_tools=()
    
    for tool in "${tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            missing_tools+=("$tool")
        fi
    done
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        log_error "Missing required tools: ${missing_tools[*]}"
        log_info "Please install the missing tools and run this script again."
        exit 1
    fi
    
    log_info "All prerequisites are satisfied."
}

# Setup environment variables
setup_environment() {
    log_info "Setting up environment..."
    
    # Create .env file if it doesn't exist
    if [ ! -f "backend/.env" ]; then
        log_info "Creating backend/.env file..."
        cp backend/.env.example backend/.env
        log_warn "Please update backend/.env with your actual values before proceeding."
    fi
    
    # Create terraform.tfvars if it doesn't exist
    if [ ! -f "infra/terraform/terraform.tfvars" ]; then
        log_info "Creating terraform.tfvars file..."
        cat > infra/terraform/terraform.tfvars << EOF
project_name = "cloudops"
environment = "dev"
aws_region = "us-east-1"
db_password = "changeme123!"
domain_name = "cloudops.example.com"
create_route53_zone = false
EOF
        log_warn "Please update infra/terraform/terraform.tfvars with your actual values."
    fi
}

# Initialize Terraform
init_terraform() {
    log_info "Initializing Terraform..."
    
    cd infra/terraform
    terraform init
    terraform validate
    cd ../..
    
    log_info "Terraform initialized successfully."
}

# Setup local development environment
setup_local_dev() {
    log_info "Setting up local development environment..."
    
    # Install backend dependencies
    if [ -f "backend/package.json" ]; then
        log_info "Installing backend dependencies..."
        cd backend
        npm install
        cd ..
    fi
    
    # Install frontend dependencies
    if [ -f "frontend/package.json" ]; then
        log_info "Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
    fi
    
    # Start local services with Docker Compose
    if [ -f "docker-compose.yml" ]; then
        log_info "Starting local services..."
        docker-compose up -d postgres redis
        
        # Wait for services to be ready
        log_info "Waiting for services to be ready..."
        sleep 10
        
        # Run database migrations
        log_info "Running database migrations..."
        cd backend
        npx prisma migrate dev
        cd ..
    fi
    
    log_info "Local development environment setup complete."
}

# Main function
main() {
    log_info "Starting CloudOps Platform bootstrap..."
    
    check_prerequisites
    setup_environment
    init_terraform
    setup_local_dev
    
    log_info "Bootstrap completed successfully!"
    log_info "Next steps:"
    log_info "1. Update configuration files with your actual values"
    log_info "2. Run 'make dev' to start development servers"
    log_info "3. Run 'make deploy-staging' to deploy to staging"
    log_info "4. Run 'make deploy-production' to deploy to production"
}

# Run main function
main "$@"