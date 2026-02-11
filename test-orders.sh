#!/bin/bash

# Test Script for First Mart Orders System
# This script tests the backend API endpoints

API_URL="http://localhost:5001/api"
COLORS_RESET='\033[0m'
COLORS_GREEN='\033[0;32m'
COLORS_RED='\033[0;31m'
COLORS_YELLOW='\033[1;33m'

echo -e "${COLORS_YELLOW}🧪 First Mart Orders System Test Suite${COLORS_RESET}\n"

# Test 1: Health Check
echo -e "${COLORS_YELLOW}Test 1: Health Check${COLORS_RESET}"
HEALTH=$(curl -s $API_URL/health)
if [[ $HEALTH == *"OK"* ]]; then
    echo -e "${COLORS_GREEN}✓ Backend is running${COLORS_RESET}"
    echo "Response: $HEALTH\n"
else
    echo -e "${COLORS_RED}✗ Backend health check failed${COLORS_RESET}"
    echo "Response: $HEALTH\n"
    exit 1
fi

# Test 2: Get All Products
echo -e "${COLORS_YELLOW}Test 2: Get All Products${COLORS_RESET}"
PRODUCTS=$(curl -s $API_URL/products)
PRODUCT_COUNT=$(echo $PRODUCTS | grep -o '"id"' | wc -l)
echo -e "${COLORS_GREEN}✓ Retrieved $PRODUCT_COUNT products${COLORS_RESET}\n"

# Test 3: Get All Orders (should be empty)
echo -e "${COLORS_YELLOW}Test 3: Get All Orders (Initial - should be empty)${COLORS_RESET}"
ORDERS=$(curl -s $API_URL/orders)
echo -e "${COLORS_GREEN}✓ Current orders: $ORDERS${COLORS_RESET}\n"

# Test 4: Create an Order
echo -e "${COLORS_YELLOW}Test 4: Create New Order${COLORS_RESET}"
ORDER_PAYLOAD='{
  "items": [
    {
      "id": 1,
      "name": "Test Product",
      "price": 99.99,
      "quantity": 2,
      "image": "test.jpg",
      "selectedOptions": null
    }
  ],
  "total": 199.98,
  "subtotal": 249.98,
  "discount": 50,
  "discountApplied": true
}'

CREATE_RESPONSE=$(curl -s -X POST $API_URL/orders \
  -H "Content-Type: application/json" \
  -d "$ORDER_PAYLOAD")

ORDER_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Order created with ID: $ORDER_ID"
echo -e "${COLORS_GREEN}✓ Order created successfully${COLORS_RESET}"
echo "Full response: $CREATE_RESPONSE\n"

# Test 5: Get All Orders (should have 1)
echo -e "${COLORS_YELLOW}Test 5: Get All Orders (After creation)${COLORS_RESET}"
ORDERS_AFTER=$(curl -s $API_URL/orders)
echo -e "${COLORS_GREEN}✓ Orders retrieved${COLORS_RESET}"
echo "Response: $ORDERS_AFTER\n"

# Test 6: Get Order by ID
echo -e "${COLORS_YELLOW}Test 6: Get Order by ID${COLORS_RESET}"
if [ ! -z "$ORDER_ID" ]; then
    GET_ORDER=$(curl -s "$API_URL/orders/$ORDER_ID")
    echo -e "${COLORS_GREEN}✓ Retrieved order: $GET_ORDER${COLORS_RESET}\n"
fi

# Test 7: Update Order Status to Delivered
echo -e "${COLORS_YELLOW}Test 7: Update Order Status (to Delivered)${COLORS_RESET}"
if [ ! -z "$ORDER_ID" ]; then
    UPDATE_RESPONSE=$(curl -s -X PATCH "$API_URL/orders/$ORDER_ID" \
      -H "Content-Type: application/json" \
      -d '{"status": "Delivered"}')
    echo -e "${COLORS_GREEN}✓ Order status updated${COLORS_RESET}"
    echo "Response: $UPDATE_RESPONSE\n"
fi

# Test 8: Get Orders by Status
echo -e "${COLORS_YELLOW}Test 8: Get Orders by Status (Delivered)${COLORS_RESET}"
STATUS_RESPONSE=$(curl -s "$API_URL/orders/status/Delivered")
echo -e "${COLORS_GREEN}✓ Retrieved delivered orders${COLORS_RESET}"
echo "Response: $STATUS_RESPONSE\n"

echo -e "${COLORS_GREEN}✅ All tests completed successfully!${COLORS_RESET}"
