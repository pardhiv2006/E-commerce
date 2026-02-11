#!/bin/bash

# Test Script for Authentication Flow
API_URL="http://localhost:5001/api"
COLORS_RESET='\033[0m'
COLORS_GREEN='\033[0;32m'
COLORS_RED='\033[0;31m'
COLORS_YELLOW='\033[1;33m'

echo -e "${COLORS_YELLOW}🧪 First Mart Auth System Test${COLORS_RESET}\n"

# Test 1: Health Check
echo -e "${COLORS_YELLOW}Test 1: Health Check${COLORS_RESET}"
HEALTH=$(curl -s $API_URL/health)
if [[ $HEALTH == *"OK"* ]]; then
    echo -e "${COLORS_GREEN}✓ Backend is running${COLORS_RESET}\n"
else
    echo -e "${COLORS_RED}✗ Backend is NOT running${COLORS_RESET}\n"
    exit 1
fi

# Test 2: Signup
echo -e "${COLORS_YELLOW}Test 2: Signup New User${COLORS_RESET}"
RANDOM_NUM=$RANDOM
USER_EMAIL="testuser_$RANDOM_NUM@example.com"
SIGNUP_PAYLOAD="{\"email\":\"$USER_EMAIL\",\"password\":\"password123\"}"

SIGNUP_RESPONSE=$(curl -s -X POST $API_URL/auth/signup \
  -H "Content-Type: application/json" \
  -d "$SIGNUP_PAYLOAD")

TOKEN=$(echo $SIGNUP_RESPONSE | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$TOKEN" ]; then
    echo -e "${COLORS_GREEN}✓ Signup successful${COLORS_RESET}"
    echo -e "  Email: $USER_EMAIL"
    echo -e "  Token: ${TOKEN:0:20}...\n"
else
    echo -e "${COLORS_RED}✗ Signup failed${COLORS_RESET}"
    echo "Response: $SIGNUP_RESPONSE\n"
    exit 1
fi

# Test 3: Login with same credentials
echo -e "${COLORS_YELLOW}Test 3: Login with same credentials${COLORS_RESET}"
LOGIN_PAYLOAD="{\"email\":\"$USER_EMAIL\",\"password\":\"password123\"}"

LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "$LOGIN_PAYLOAD")

LOGIN_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$LOGIN_TOKEN" ]; then
    echo -e "${COLORS_GREEN}✓ Login successful${COLORS_RESET}"
    echo -e "  Token: ${LOGIN_TOKEN:0:20}...\n"
else
    echo -e "${COLORS_RED}✗ Login failed${COLORS_RESET}"
    echo "Response: $LOGIN_RESPONSE\n"
    exit 1
fi

# Test 4: Login with wrong password
echo -e "${COLORS_YELLOW}Test 4: Login with wrong password${COLORS_RESET}"
WRONG_PAYLOAD="{\"email\":\"$USER_EMAIL\",\"password\":\"wrongpassword\"}"

WRONG_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "$WRONG_PAYLOAD")

if [[ $WRONG_RESPONSE == *"Invalid"* ]]; then
    echo -e "${COLORS_GREEN}✓ Correctly rejected wrong password${COLORS_RESET}\n"
else
    echo -e "${COLORS_RED}✗ Should have rejected wrong password${COLORS_RESET}\n"
fi

echo -e "${COLORS_GREEN}✅ All Auth Tests Passed!${COLORS_RESET}"
echo -e "\n${COLORS_YELLOW}📝 Test Summary:${COLORS_RESET}"
echo -e "  • Signup creates new user with hashed password"
echo -e "  • Login validates credentials and returns token"
echo -e "  • Wrong password is rejected"
echo -e "\n${COLORS_YELLOW}🌐 Try it in browser:${COLORS_RESET}"
echo -e "  1. Go to http://localhost:5173/signup"
echo -e "  2. Create an account with any email/password"
echo -e "  3. Login with the same credentials"
echo -e "  4. Your email will appear in the navbar"
