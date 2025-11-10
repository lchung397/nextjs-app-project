# Environment Setup Guide

## Quick Start

### Method 1: Using npm scripts (Recommended)

```bash
# Development (localhost:8080)
npm run dev

# Staging (34.87.142.32:8080)
npm run dev:staging
npm run build:staging
npm run start:staging

# Production (34.87.142.32:8080)
npm run dev:production
npm run build:production
npm run start:production
```

### Method 2: Switch environment manually

```bash
# Switch to development
npm run env:dev

# Switch to staging
npm run env:staging

# Switch to production
npm run env:prod

# Then run normal commands
npm run dev
npm run build
npm run start
```

## Environment Files

| File | Purpose | API URL | Commit to Git |
|------|---------|---------|---------------|
| `.env.development` | Local development | `http://localhost:8080` | ✅ Yes |
| `.env.staging` | Staging server | `http://34.87.142.32:8080` | ✅ Yes |
| `.env.production` | Production server | `http://34.87.142.32:8080` | ✅ Yes |
| `.env.local` | Local overrides | Custom | ❌ No |
| `.env.example` | Template | Example | ✅ Yes |

## How It Works

Next.js automatically loads environment files in this order:

1. `.env.$(NODE_ENV).local` (highest priority)
2. `.env.local` (not loaded in test environment)
3. `.env.$(NODE_ENV)`
4. `.env`

## Examples

### Development
```bash
npm run dev
# Uses .env.development or .env.local
# API: http://localhost:8080
```

### Staging Build & Deploy
```bash
npm run build:staging
npm run start:staging
# Uses .env.staging
# API: http://34.87.142.32:8080
```

### Production Build & Deploy
```bash
npm run build:production
npm run start:production
# Uses .env.production
# API: http://34.87.142.32:8080
```

## Troubleshooting

### Environment variables not updating?

1. **Restart the dev server** - Changes require restart
2. **Clear .next cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```
3. **Check file priority** - `.env.local` overrides other files

### Wrong API URL?

Check which env file is being used:
```bash
# In your component
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

## Best Practices

1. ✅ Use `.env.local` for local development secrets
2. ✅ Commit `.env.development`, `.env.staging`, `.env.production`
3. ❌ Never commit `.env.local` or sensitive data
4. ✅ Use `NEXT_PUBLIC_*` prefix for client-side variables
5. ✅ Restart server after changing env files
