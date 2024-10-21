# Makefile

# Variables
PYTHON = python3
PIP = pip
MANAGE = $(PYTHON) backend/manage.py
VENV = backend/venv
ACTIVATE = . $(VENV)/bin/activate
DOCKER_COMPOSE = docker-compose

# Colors
GREEN = \033[0;32m
NC = \033[0m

# Backend commands
backend-setup:
	@echo "$(GREEN)Setting up backend...$(NC)"
	$(PYTHON) -m venv $(VENV)
	$(ACTIVATE) && $(PIP) install -r backend/requirements.txt

backend-migrate:
	@echo "$(GREEN)Running database migrations...$(NC)"
	$(ACTIVATE) && $(MANAGE) migrate

backend-run:
	@echo "$(GREEN)Running Django server...$(NC)"
	$(ACTIVATE) && $(MANAGE) runserver

backend-shell:
	@echo "$(GREEN)Starting Django shell...$(NC)"
	$(ACTIVATE) && $(MANAGE) shell

# Frontend commands
frontend-setup:
	@echo "$(GREEN)Setting up frontend...$(NC)"
	cd frontend && npm install

frontend-run:
	@echo "$(GREEN)Running frontend server...$(NC)"
	cd frontend && npm run dev

# Database commands
db-up:
	@echo "$(GREEN)Starting PostgreSQL database...$(NC)"
	$(DOCKER_COMPOSE) up -d db

db-down:
	@echo "$(GREEN)Stopping PostgreSQL database...$(NC)"
	$(DOCKER_COMPOSE) down

# Combined commands
setup: backend-setup frontend-setup
	@echo "$(GREEN)Project setup complete.$(NC)"

run: db-up backend-run
	@echo "$(GREEN)Backend is running. In a new terminal, run 'make frontend-run' to start the frontend.$(NC)"

# Help command
help:
	@echo "$(GREEN)Available commands:$(NC)"
	@echo "  make setup          : Set up both backend and frontend"
	@echo "  make backend-setup  : Set up backend virtual environment and install dependencies"
	@echo "  make frontend-setup : Install frontend dependencies"
	@echo "  make backend-migrate: Run database migrations"
	@echo "  make backend-run    : Run Django development server"
	@echo "  make frontend-run   : Run frontend development server"
	@echo "  make db-up          : Start PostgreSQL database"
	@echo "  make db-down        : Stop PostgreSQL database"
	@echo "  make run            : Start database and run backend (run frontend separately)"
	@echo "  make backend-shell  : Start Django shell"

.PHONY: backend-setup backend-migrate backend-run frontend-setup frontend-run db-up db-down setup run help