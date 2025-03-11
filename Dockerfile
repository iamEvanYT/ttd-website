# Stage 1: Install Dependencies with Bun
FROM oven/bun:latest AS deps

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package.json bun.lockb ./

# Install dependencies using Bun (only production dependencies)
RUN bun install --frozen-lockfile --production

# Stage 2: Build the Application with Bun
FROM oven/bun:latest AS builder

# Set working directory
WORKDIR /app

# Copy only production dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application source code
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application using Bun
RUN bun run build

# Stage 3: Create Production Image with Bun (smaller than Node)
FROM oven/bun:latest AS runner

# Set working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user and group for running the application
RUN addgroup --system --gid 1001 bunjs \
    && adduser --system --uid 1001 nextjs

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=nextjs:bunjs /app/public ./public
COPY --from=builder --chown=nextjs:bunjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bunjs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set environment variables for the application
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Define the command to start the application using Bun
CMD ["bun", "server.js"]