# Use the official Golang image as a base image
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Build the Go application
RUN go build -o server .

# Expose the port on which the server runs
EXPOSE 8080

# Start the server
CMD ["./server"]