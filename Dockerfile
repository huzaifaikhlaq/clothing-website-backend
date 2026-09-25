FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
# This allows Docker to cache npm install
# when application source code changes.
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev \
    && npm cache clean --force

# Copy backend source code
COPY . .

# Run application as non-root user
USER node

# Backend listens on port 2009
EXPOSE 2009

# Start backend
CMD ["npm", "start"]