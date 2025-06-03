.PHONY: help install dev build test clean docker-build docker-up docker-down deploy

# Default target
help:
	@echo "Available commands:"
	@echo "  install      - Install dependencies for both frontend and backend"
	@echo "  dev          - Start development servers"
	@echo "  build        - Build both frontend and backend"
	@echo "  test         - Run tests for both frontend and backend"
	@echo "  clean        - Clean build artifacts and node_modules"
	@echo "  docker-build - Build Docker images"
	@echo "  docker-up    - Start Docker Compose services"
	@echo "  docker-down  - Stop Docker Compose services"
	@echo "  deploy       - Deploy to Kubernetes"

# Install dependencies
install:
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Generating Prisma client..."
	cd backend && npx prisma generate

# Start development servers
dev:
	@echo "Starting development servers..."
	docker-compose up -d postgres
	cd backend && npm run start:dev &
	cd frontend && npm run dev

# Build applications
build:
	@echo "Building backend..."
	cd backend && npm run build
	@echo "Building frontend..."
	cd frontend && npm run build

# Run tests
test:
	@echo "Running backend tests..."
	cd backend && npm test
	@echo "Running frontend tests..."
	cd frontend && npm test

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf backend/dist
	rm -rf frontend/.next
	rm -rf backend/node_modules
	rm -rf frontend/node_modules

# Build Docker images
docker-build:
	@echo "Building Docker images..."
	docker build -t cloudops/backend:latest ./backend
	docker build -t cloudops/frontend:latest ./frontend

# Start Docker Compose services
docker-up:
	@echo "Starting Docker Compose services..."
	docker-compose up -d

# Stop Docker Compose services
docker-down:
	@echo "Stopping Docker Compose services..."
	docker-compose down

# Deploy to Kubernetes
deploy:
	@echo "Deploying to Kubernetes..."
	kubectl apply -f infra/k8s/
	kubectl rollout status deployment/cloudops-backend -n cloudops
	kubectl rollout status deployment/cloudops-frontend -n cloudops

# Database operations
db-migrate:
	@echo "Running database migrations..."
	cd backend && npx prisma migrate deploy

db-seed:
	@echo "Seeding database..."
	cd backend && npx prisma db seed

db-reset:
	@echo "Resetting database..."
	cd backend && npx prisma migrate reset --force

# Infrastructure operations
infra-plan:
	@echo "Planning Terraform infrastructure..."
	cd infra/terraform && terraform plan

infra-apply:
	@echo "Applying Terraform infrastructure..."
	cd infra/terraform && terraform apply

infra-destroy:
	@echo "Destroying Terraform infrastructure..."
	cd infra/terraform && terraform destroy