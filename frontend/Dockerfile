# frontend/Dockerfile
# Use the official Node.js image as a base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Serve the app with a static server
CMD ["npx", "serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000