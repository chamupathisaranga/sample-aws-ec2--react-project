# -------- Build stage --------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the React Vite app
RUN npm run build

# -------- Production stage --------
FROM node:20-alpine

WORKDIR /app

# Install serve to serve built files
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port 5173
EXPOSE 5173

# Default environment
ENV PORT=5173

# Start the app
CMD ["serve", "-s", "dist", "-l", "5173"]