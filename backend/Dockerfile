# Use the official Node.js image from Docker Hub
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the Node.js server
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
