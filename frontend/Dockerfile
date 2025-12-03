##########
# Build stage
##########
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Build the production bundle
COPY . .
RUN npm run build

##########
# Runtime stage
##########
FROM nginx:1.27-alpine

# Replace default nginx configuration with SPA-aware config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the compiled frontend
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
