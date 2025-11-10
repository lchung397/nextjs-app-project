#!/bin/bash

# Script to switch environment variables

ENV=$1

if [ -z "$ENV" ]; then
  echo "Usage: ./scripts/switch-env.sh [development|staging|production]"
  exit 1
fi

if [ ! -f ".env.$ENV" ]; then
  echo "Error: .env.$ENV file not found"
  exit 1
fi

# Copy environment file to .env.local
cp ".env.$ENV" ".env.local"

echo "✅ Switched to $ENV environment"
echo "📝 Current API URL: $(grep NEXT_PUBLIC_API_URL .env.local)"
