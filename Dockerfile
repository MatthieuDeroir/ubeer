# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Define environment variable
ENV RABBITMQ_URL amqp://rabbitmq:rabbitmq@rabbitmq-6i94:10000

# Run the app when the container launches
CMD ["node", "server.js"]
