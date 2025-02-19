# Entix Web Application

## Configuration Management

### Environment Variables

This project uses Zod for type-safe environment variable validation.

### Step-by-Step Guide to Adding a New Environment Variable

#### 1. Update Environment Schema

In `src/config/env.config.ts`, add the new environment variable to the `envSchema`:

```typescript
// Optional variable (can be undefined)
VITE_FEATURE_FLAG: z.string().optional()

// Required variable
VITE_API_KEY: z.string()

// Variable with specific validation
VITE_MAX_ITEMS: z.coerce.number().min(1).max(100)

// URL validation
VITE_EXTERNAL_SERVICE: z.string().url()
```

#### 2. Update `.env.example`

Add a placeholder in `.env.example`:

```shell
# Existing variables...
VITE_FEATURE_FLAG=false
VITE_API_KEY=your_api_key_here
VITE_MAX_ITEMS=50
VITE_EXTERNAL_SERVICE=https://api.example.com
```

#### 3. Update Local `.env`

Add the actual value in your local `.env` file:

```shell
# Use real values for local development
VITE_FEATURE_FLAG=true
VITE_API_KEY=local_dev_key_12345
VITE_MAX_ITEMS=25
VITE_EXTERNAL_SERVICE=http://localhost:8000
```

#### 4. Using the New Environment Variable

In your code, access the variable through the `env` export:

```typescript
import { env } from '@/config/env.config'

// Optional variable with fallback
const isFeatureEnabled = env.VITE_FEATURE_FLAG === 'true'

// Required variable
function callApi() {
  fetch('https://api.example.com', {
    headers: {
      'Authorization': `Bearer ${env.VITE_API_KEY}`
    }
  })
}

// Validated number
const maxItems = env.VITE_MAX_ITEMS // Guaranteed to be between 1-100
```

### Configuration Validation

The configuration system provides:
- Type-safe environment variables
- Runtime validation
- Clear error messages for missing or invalid variables

### Deployment Considerations

#### Local Development
1. Copy `.env.example` to `.env`
2. Fill in actual values

#### GitHub Actions
1. Add secrets in GitHub repository settings
2. Ensure all required variables are set
3. Use repository secrets to populate environment variables

## Development Setup

1. Install dependencies: `npm install`
2. Set up environment variables
3. Start development server: `npm run dev`

## Deployment

Ensure all required environment variables are set in your deployment environment.