# Use official Node 20 LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Install ts-node globally (for development)
RUN npm install -g ts-node typescript

# Expose API port
EXPOSE 5000

# Start Fastify using ts-node for dev
CMD ["npm", "run", "dev"]