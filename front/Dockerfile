#Stage 1: Build the React app,
FROM node:18-alpine AS builder

# Set working directory,
WORKDIR /game-app

# Install dependencies,
COPY ./front/package*.json ./
RUN npm install

# Copy source code and build,
COPY ./front .
RUN npm run build

# Stage 2: Serve with Nginx,
FROM nginx:alpine

# Copy built React app from builder stage,
COPY --from=builder /game-app/build /usr/share/nginx/html

# Copy my custom Nginx config,
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 and start Nginx,
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
