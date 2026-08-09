FROM node:20-slim

WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Build Vite frontend and esbuild server bundle into dist/
RUN npm run build

# Environment settings for Cloud Run
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/server.cjs"]
