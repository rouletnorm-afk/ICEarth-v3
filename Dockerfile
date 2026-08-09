# Stage 1: Build static frontend assets and esbuild server bundle
FROM node:20-slim AS builder

WORKDIR /app

# Ensure devDependencies (vite, esbuild, typescript) are always installed during build stage
ENV NODE_ENV=development
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package manifests
COPY package*.json ./

# Install all dependencies including devDependencies required for build
RUN npm install --include=dev

# Copy source files
COPY . .

# Build Vite client and esbuild server into dist/
RUN npm run build

# Stage 2: Production runtime image
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy package manifests and install runtime production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

# Copy dist build artifacts from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/server.cjs"]
