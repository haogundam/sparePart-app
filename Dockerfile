# Stage 1: Build the Angular application
FROM node:20 as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine
COPY --from=build-step /app/dist/sparePart /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
