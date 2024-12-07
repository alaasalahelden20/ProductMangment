# Use the official Node.js image from the Docker Hub
FROM node:18.9.0-alpine

# Set the working directory
WORKDIR /frontend-app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build


# Expose port 3000
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]