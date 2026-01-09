#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}Ulysse Ruff Williams Advisory${NC}"
echo -e "${BLUE}Development Server Startup${NC}"
echo -e "${BLUE}======================================${NC}\n"

# Check if running from correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found${NC}"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Start frontend
echo -e "${YELLOW}Starting Frontend...${NC}"
npm run dev &
FRONTEND_PID=$!

sleep 2

# Start backend
echo -e "${YELLOW}Starting Backend...${NC}"
cd backend

# Check for virtual environment
if [ ! -d "venv" ]; then
    echo -e "${RED}Error: Virtual environment not found${NC}"
    echo "Run ./setup.sh first to install dependencies"
    exit 1
fi

source venv/bin/activate
python server.py &
BACKEND_PID=$!

cd ..

echo -e "\n${GREEN}======================================${NC}"
echo -e "${GREEN}Servers Started!${NC}"
echo -e "${GREEN}======================================${NC}\n"

echo -e "${BLUE}Frontend:${NC} http://localhost:5173"
echo -e "${BLUE}Backend API:${NC} http://localhost:5000/api"
echo -e "${BLUE}Health Check:${NC} http://localhost:5000/api/health\n"

echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}\n"

# Handle Ctrl+C
trap cleanup INT TERM

cleanup() {
    echo -e "\n${YELLOW}Stopping servers...${NC}"
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    echo -e "${GREEN}Servers stopped${NC}"
    exit 0
}

# Wait for both processes
wait
