# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Copy the static website files into the Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
