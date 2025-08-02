# Variables
IMAGE_NAME = schema-form-x-frontend
IMAGE_TAG = latest
DOCKER_REGISTRY = 
FULL_IMAGE_NAME = $(DOCKER_REGISTRY)$(IMAGE_NAME):$(IMAGE_TAG)

# Default target
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make build          - Build Docker image"
	@echo "  make run            - Run Docker container"
	@echo "  make stop           - Stop Docker container"
	@echo "  make clean          - Remove Docker image and containers"
	@echo "  make logs           - Show container logs"

# Build production Docker image
.PHONY: build
build:
	@echo "Building production Docker image..."
	docker build -t $(FULL_IMAGE_NAME) -f Dockerfile .
	@echo "Build completed: $(FULL_IMAGE_NAME)"

# Run Docker container
.PHONY: run
run:
	@echo "Starting Docker container..."
	docker run -d --name $(IMAGE_NAME)-container \
		-p 3000:8080 \
		$(FULL_IMAGE_NAME)
	@echo "Container started on http://localhost:3000"

# Stop Docker container
.PHONY: stop
stop:
	@echo "Stopping containers..."
	docker stop $(IMAGE_NAME)-container 2>/dev/null || true
	docker rm $(IMAGE_NAME)-container 2>/dev/null || true
	@echo "Containers stopped and removed"

# Clean up Docker resources
.PHONY: clean
clean:
	@echo "Cleaning up Docker resources..."
	docker stop $(IMAGE_NAME)-container 2>/dev/null || true
	docker rm $(IMAGE_NAME)-container 2>/dev/null || true
	docker rmi $(FULL_IMAGE_NAME) 2>/dev/null || true
	docker system prune -f
	@echo "Cleanup completed"

# Show container logs
.PHONY: logs
logs:
	@echo "Container logs:"
	docker logs -f $(IMAGE_NAME)-container
