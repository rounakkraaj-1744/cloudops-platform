#!/bin/bash

set -euo pipefail

# Default values
ENVIRONMENT="staging"
NAMESPACE="cloudops"
CHART_PATH="./infra/helm/cloudops"
TIMEOUT="10m"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

log_debug() {
    echo -e "${BLUE}[DEBUG]${NC} $1"
}

# Show usage
usage() {
    cat << EOF
Usage: $0 [OPTIONS]

Deploy CloudOps Platform to Kubernetes

OPTIONS:
    -e, --environment   Environment to deploy to (staging|production) [default: staging]
    -n, --namespace     Kubernetes namespace [default: cloudops]
    -t, --timeout       Deployment timeout [default: 10m]
    -h, --help          Show this help message

EXAMPLES:
    $0 -e staging
    $0 -e production -n cloudops-prod
    $0 --environment production --timeout 15m

EOF
}

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -e|--environment)
                ENVIRONMENT="$2"
                shift 2
                ;;
            -n|--namespace)
                NAMESPACE="$2"
                shift 2
                ;;
            -t|--timeout)
                TIMEOUT="$2"
                shift 2
                ;;
            -h|--help)
                usage
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                usage
                exit 1
                ;;
        esac
    done
}

# Validate environment
validate_environment() {
    if [[ ! "$ENVIRONMENT" =~ ^(staging|production)$ ]]; then
        log_error "Invalid environment: $ENVIRONMENT. Must be 'staging' or 'production'."
        exit 1
    fi
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    local tools=("kubectl" "helm")
    local missing_tools=()
    
    for tool in "${tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            missing_tools+=("$tool")
        fi
    done
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        log_error "Missing required tools: ${missing_tools[*]}"
        exit 1
    fi
    
    # Check if kubectl can connect to cluster
    if ! kubectl cluster-info &> /dev/null; then
        log_error "Cannot connect to Kubernetes cluster. Please check your kubeconfig."
        exit 1
    fi
    
    log_info "Prerequisites check passed."
}

# Build and push Docker images
build_and_push_images() {
    log_info "Building and pushing Docker images..."
    
    local image_tag="${ENVIRONMENT}-$(git rev-parse --short HEAD)"
    local registry="ghcr.io/your-org/cloudops"
    
    # Build backend image
    log_info "Building backend image..."
    docker build -t "${registry}/backend:${image_tag}" ./backend
    docker push "${registry}/backend:${image_tag}"
    
    # Build frontend image
    log_info "Building frontend image..."
    docker build -t "${registry}/frontend:${image_tag}" ./frontend
    docker push "${registry}/frontend:${image_tag}"
    
    log_info "Images built and pushed successfully."
    echo "$image_tag"
}

# Deploy with Helm
deploy_with_helm() {
    local image_tag="$1"
    local release_name="cloudops-${ENVIRONMENT}"
    local full_namespace="${NAMESPACE}-${ENVIRONMENT}"
    local values_file="${CHART_PATH}/values-${ENVIRONMENT}.yaml"
    
    log_info "Deploying to ${ENVIRONMENT} environment..."
    log_debug "Release name: $release_name"
    log_debug "Namespace: $full_namespace"
    log_debug "Values file: $values_file"
    
    # Check if values file exists
    if [ ! -f "$values_file" ]; then
        log_error "Values file not found: $values_file"
        exit 1
    fi
    
    # Create namespace if it doesn't exist
    kubectl create namespace "$full_namespace" --dry-run=client -o yaml | kubectl apply -f -
    
    # Deploy with Helm
    helm upgrade --install "$release_name" "$CHART_PATH" \
        --namespace "$full_namespace" \
        --values "$values_file" \
        --set image.tag="$image_tag" \
        --set environment="$ENVIRONMENT" \
        --timeout "$TIMEOUT" \
        --wait
    
    log_info "Deployment completed successfully."
}

# Verify deployment
verify_deployment() {
    local full_namespace="${NAMESPACE}-${ENVIRONMENT}"
    
    log_info "Verifying deployment..."
    
    # Check if pods are running
    log_info "Checking pod status..."
    kubectl get pods -n "$full_namespace" -l app.kubernetes.io/name=cloudops
    
    # Check if services are ready
    log_info "Checking service status..."
    kubectl get services -n "$full_namespace"
    
    # Check if ingress is configured
    log_info "Checking ingress status..."
    kubectl get ingress -n "$full_namespace"
    
    # Wait for rollout to complete
    log_info "Waiting for rollout to complete..."
    kubectl rollout status deployment/cloudops-${ENVIRONMENT}-backend -n "$full_namespace" --timeout=300s
    kubectl rollout status deployment/cloudops-${ENVIRONMENT}-frontend -n "$full_namespace" --timeout=300s
    
    log_info "Deployment verification completed."
}

# Main function
main() {
    parse_args "$@"
    validate_environment
    check_prerequisites
    
    log_info "Starting deployment to $ENVIRONMENT environment..."
    
    # Build and push images
    local image_tag
    image_tag=$(build_and_push_images)
    
    # Deploy with Helm
    deploy_with_helm "$image_tag"
    
    # Verify deployment
    verify_deployment
    
    log_info "Deployment to $ENVIRONMENT completed successfully!"
    
    # Show access information
    local full_namespace="${NAMESPACE}-${ENVIRONMENT}"
    local ingress_ip
    ingress_ip=$(kubectl get ingress -n "$full_namespace" -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "pending")
    
    log_info "Access information:"
    log_info "  Frontend: https://cloudops.example.com"
    log_info "  Backend API: https://api.cloudops.example.com"
    log_info "  Ingress IP: $ingress_ip"
}

# Run main function
main "$@"