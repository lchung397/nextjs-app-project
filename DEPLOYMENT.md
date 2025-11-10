# Deployment Guide

## Environment Variables

Dự án sử dụng các file environment khác nhau cho từng môi trường:

- `.env.development` - Development (local)
- `.env.staging` - Staging server
- `.env.production` - Production server
- `.env.local` - Local overrides (không commit vào git)
- `.env.example` - Template cho reference

## Development

```bash
npm run dev
```

Sử dụng `.env.development` hoặc `.env.local` (nếu có)

## Build & Deploy

### Staging

```bash
# Build cho staging
npm run build:staging

# Start staging server
npm run start:staging
```

### Production

```bash
# Build cho production
npm run build:production

# Start production server
npm run start:production
```

## Environment Variables

### NEXT_PUBLIC_API_URL

- **Development**: `http://localhost:8080`
- **Staging**: `http://34.87.142.32:8080`
- **Production**: `http://34.87.142.32:8080`

## Docker Deployment (Optional)

Nếu deploy bằng Docker, có thể override env variables:

```bash
# Staging
docker run -e NEXT_PUBLIC_API_URL=http://34.87.142.32:8080 your-image

# Production
docker run -e NEXT_PUBLIC_API_URL=http://your-production-api.com your-image
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build:staging
      - run: npm run start:staging
```

### GitLab CI Example

```yaml
# .gitlab-ci.yml
staging:
  stage: deploy
  script:
    - npm install
    - npm run build:staging
    - npm run start:staging
  only:
    - develop

production:
  stage: deploy
  script:
    - npm install
    - npm run build:production
    - npm run start:production
  only:
    - main
```

## Vercel Deployment

Nếu deploy trên Vercel, set environment variables trong dashboard:

1. Vào Project Settings → Environment Variables
2. Thêm `NEXT_PUBLIC_API_URL` cho từng environment:
   - **Production**: `http://34.87.142.32:8080`
   - **Preview**: `http://34.87.142.32:8080`
   - **Development**: `http://localhost:8080`

## Notes

- File `.env.local` sẽ override các file env khác trong development
- Các biến `NEXT_PUBLIC_*` sẽ được expose ra client-side
- Restart server sau khi thay đổi env variables
- Không commit file `.env.local` vào git
