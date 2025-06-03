#!/bin/bash

set -euo pipefail

# Default values
ENVIRONMENT="staging"
NAMESPACE="cloudops"
FORCE=false

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

# Show usage
usage() {
    cat << EOF
Usage: $0 [OPTIONS]

Teardown CloudOps Platform deployment

OPTIONS:
    -e, --environment   Environment to teardown (staging|production) [default: staging]
    -n, --namespace     Kubernetes namespace [default: cloudops]
    -f, --force         Force teardown without confirmation
    -h, --help          Show this help message

EXAMPLES:
    $0 -e staging
    $0 -e production --force
    $0 --environment staging --namespace cloudops-test

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
            -f|--force)
                FORCE=true
                shift
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

# Confirm teardown
confirm_teardown() {
    if [ "$FORCE" = true ]; then
        return 0
    fi
    
    local full_namespace="${NAMESPACE}-${ENVIRONMENT}"
    
    log_warn "This will completely remove the CloudOps Platform deployment from:"
    log_warn "  Environment: $ENVIRONMENT"
    log_warn "  Namespace: $full_namespace"
    log_warn ""
    log_warn "This action cannot be undone!"
    
    read -p "Are you sure you want to continue? (yes/no): " -r
    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        log_info "Teardown cancelled."
        exit 0
    fi
}

# Teardown Helm release
teardown_helm_release() {
    local release_name="cloudops-${ENVIRONMENT}"
    local full_namespace="${NAMESPACE}-${ENVIRONMENT}"
    
    log_info "Removing Helm release: $release_name"
    
    if helm list -n "$full_namespace" | grep -q "$release_name"; then
        helm uninstall "$release_name" -n "$full_namespace"
        log_info "Helm release removed successfully."
    else
        log_warn "Helm release $release_name not found."
    fi
}

# Remove namespace
remove_namespace() {
    local full_namespace="${NAMESPACE}-${ENVIRONMENT}"
    
    log_info "Removing namespace: $full_namespace"
    
    if kubectl get namespace "$full_namespace" &> /dev/null; then
        kubectl delete namespace "$full_namespace" --timeout=300s
        log_info "Namespace removed successfully."
    else
        log_warn "Namespace $full_namespace not found."
    fi
}

# Remove persistent volumes
remove_persistent_volumes() {
    log_info "Checking for persistent volumes to remove..."
    
    local pvs
    pvs=$(kubectl get pv -o jsonpath='{.items[?(@.spec.claimRef.namespace=="'${NAMESPACE}-${ENVIRONMENT}'")].metadata.name}' 2>/dev/null || echo "")
    
    if [ -n "$pvs" ]; then
        log_warn "Found persistent volumes: $pvs"
        log_warn "These may contain important data!"
        
        if [ "$FORCE" = false ]; then
            read -p "Do you want to delete these persistent volumes? (yes/no): " -r
            if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
                log_info "Persistent volumes preserved."
                return 0
            fi
        fi
        
        for pv in $pvs; do
            kubectl delete pv "$pv"
            log_info "Removed persistent volume: $pv"
        done
    else
        log_info "No persistent volumes found."
    fi
}

# Main function
main() {
    parse_args "$@"
    
    log_info "Starting teardown of $ENVIRONMENT environment..."
    
    confirm_teardown
    teardown_helm_release
    remove_namespace
    remove_persistent_volumes
    
    log_info "Teardown completed successfully!"
    log_info "The $ENVIRONMENT environment has been completely removed."
}

# Run main function
main "$@"