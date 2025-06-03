.PHONY: help install dev build test lint clean docker-build docker-up docker-down deploy-staging deploy-production teardown-staging teardown-production

# Default target
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development
install: ## Install dependencies
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Dependencies installed successfully!"

dev: ## Start development servers
	@echo "Starting development environment..."
	docker-compose up -d postgres redis
	@echo "Waiting for services to be ready..."
	sleep 5
	cd backend && npm run dev &
	cd frontend && npm run dev &
	@echo "Development servers started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:3001"

build: ## Build applications
	@echo "Building backend..."
	cd backend && npm run build
	@echo "Building frontend..."
	cd frontend && npm run build
	@echo "Build completed!"

test: ## Run tests
	@echo "Running backend tests..."
	cd backend && npm test
	@echo "Running frontend tests..."
	cd frontend && npm test
	@echo "Tests completed!"

lint: ## Run linting
	@echo "Linting backend..."
	cd backend && npm run lint
	@echo "Linting frontend..."
	cd frontend && npm run lint
	@echo "Linting completed!"

clean: ## Clean build artifacts
	@echo "Cleaning backend..."
	cd backend && rm -rf dist node_modules
	@echo "Cleaning frontend..."
	cd frontend && rm -rf .next node_modules
	@echo "Clean completed!"

# Docker
docker-build: ## Build Docker images
	@echo "Building Docker images..."
	docker build -t cloudops/backend:latest ./backend
	docker build -t cloudops/frontend:latest ./frontend
	@echo "Docker images built successfully!"

docker-up: ## Start services with Docker Compose
	@echo "Starting services with Docker Compose..."
	docker-compose up -d
	@echo "Services started successfully!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:3001"

docker-down: ## Stop Docker Compose services
	@echo "Stopping Docker Compose services..."
	docker-compose down
	@echo "Services stopped!"

# Infrastructure
terraform-init: ## Initialize Terraform
	@echo "Initializing Terraform..."
	cd infra/terraform && terraform init
	@echo "Terraform initialized!"

terraform-plan: ## Plan Terraform changes
	@echo "Planning Terraform changes..."
	cd infra/terraform && terraform plan
	@echo "Terraform plan completed!"

terraform-apply: ## Apply Terraform changes
	@echo "Applying Terraform changes..."
	cd infra/terraform && terraform apply
	@echo "Terraform applied successfully!"

terraform-destroy: ## Destroy Terraform infrastructure
	@echo "Destroying Terraform infrastructure..."
	cd infra/terraform && terraform destroy
	@echo "Infrastructure destroyed!"

# Deployment
bootstrap: ## Bootstrap the project
	@echo "Bootstrapping CloudOps Platform..."
	./scripts/bootstrap.sh
	@echo "Bootstrap completed!"

deploy-staging: ## Deploy to staging environment
	@echo "Deploying to staging..."
	./scripts/deploy.sh -e staging
	@echo "Staging deployment completed!"

deploy-production: ## Deploy to production environment
	@echo "Deploying to production..."
	./scripts/deploy.sh -e production
	@echo "Production deployment completed!"

teardown-staging: ## Teardown staging environment
	@echo "Tearing down staging environment..."
	./scripts/teardown.sh -e staging
	@echo "Staging teardown completed!"

teardown-production: ## Teardown production environment
	@echo "Tearing down production environment..."
	./scripts/teardown.sh -e production
	@echo "Production teardown completed!"

# Monitoring
logs-backend: ## View backend logs
	kubectl logs -f deployment/cloudops-staging-backend -n cloudops-staging

logs-frontend: ## View frontend logs
	kubectl logs -f deployment/cloudops-staging-frontend -n cloudops-staging

port-forward-grafana: ## Port forward to Grafana
	kubectl port-forward svc/grafana 3000:80 -n monitoring

port-forward-kibana: ## Port forward to Kibana
	kubectl port-forward svc/kibana 5601:5601 -n monitoring

# Database
db-migrate: ## Run database migrations
	cd backend && npx prisma migrate dev

db-reset: ## Reset database
	cd backend && npx prisma migrate reset

db-seed: ## Seed database
	cd backend && npx prisma db seed

db-studio: ## Open Prisma Studio
	cd backend && npx prisma studio