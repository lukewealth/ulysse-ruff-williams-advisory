#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}Ulysse Ruff Williams Advisory${NC}"
echo -e "${BLUE}Development Environment Setup${NC}"
echo -e "${BLUE}======================================${NC}\n"

# Check if running from correct directory
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}Error: package.json not found${NC}"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Frontend setup
echo -e "${GREEN}1. Setting up Frontend...${NC}"
npm install

# Backend setup
echo -e "\n${GREEN}2. Setting up Backend...${NC}"
cd backend

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}Warning: Python 3 is not installed${NC}"
    echo "Please install Python 3.8 or higher"
else
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install Python dependencies
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
fi

cd ..

echo -e "\n${GREEN}======================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}======================================${NC}\n"

echo -e "${BLUE}To start development:${NC}\n"

echo -e "${YELLOW}Terminal 1 - Frontend:${NC}"
echo "npm run dev"
echo -e "  → Frontend will run on ${BLUE}http://localhost:5173${NC}\n"

echo -e "${YELLOW}Terminal 2 - Backend:${NC}"
echo "cd backend"
echo "source venv/bin/activate"
echo "python server.py"
echo -e "  → Backend will run on ${BLUE}http://localhost:5000${NC}\n"

echo -e "${BLUE}Access the application:${NC}"
echo -e "  → ${BLUE}http://localhost:5173${NC}\n"

echo -e "${BLUE}API Documentation:${NC}"
echo -e "  → See backend/README.md${NC}\n"

echo -e "${BLUE}Development Documentation:${NC}"
echo -e "  → See task.md${NC}\n"
