# Use the official Node.js runtime as the base image
FROM node:22-alpine

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
# CMD ["npm", "run", "dev"]
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm run dev"]