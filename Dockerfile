# Stage 1: Install Dependencies with Bun
FROM oven/bun:latest AS deps

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# Stage 2: Build the Application with Node.js
FROM oven/bun:latest AS builder

# Set working directory
WORKDIR /app

# Copy installed dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application source code
COPY . .

# Optionally disable Next.js telemetry (uncomment if desired)
# ENV NEXT_TELEMETRY_DISABLED=1

# Build the application using Node.js based on the detected package manager
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm run build; \
  elif [ -f bun.lockb ]; then bun run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 3: Create Production Image with Node.js
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Optionally disable Next.js telemetry during runtime (uncomment if desired)
# ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user and group for running the application
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy public assets from the builder stage
COPY --from=builder /app/public ./public

# Create and set permissions for the prerender cache directory
RUN mkdir .next && chown nextjs:nodejs .next

# Leverage Next.js output tracing to reduce image size by copying only necessary files
COPY --from=builder --chown=nextjs:nodejs /app/.next/ ./.next/

# Switch to the non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set environment variables for the application
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Define the command to start the application using Node.js
CMD ["node", "server.js"]