# Stage 1: Build static assets and backend server
FROM node:20-slim AS builder
WORKDIR /app

# Copy package management files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Vite frontend and esbuild server backend into dist/
RUN npm run build

# Stage 2: Minimal Production Image
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy dist build artifacts from builder
COPY --from=builder /app/dist ./dist

# Expose Cloud Run default port
EXPOSE 8080

# Start server
CMD ["node", "dist/server.cjs"]
