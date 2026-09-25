# Use lightweight Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy backend source
COPY . .

# Backend port
EXPOSE 2009

# Start backend
CMD ["npm", "start"]