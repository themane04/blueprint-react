# ==========================================
# Frontend Dockerfile
# ==========================================

# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .env .env
COPY . .

RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]