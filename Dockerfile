# Use the official Rasa image
# Use the latest version available
FROM rasa/rasa:3.6.20-full 

# Set the working directory
WORKDIR /app
USER root

# Copy necessary files (adjust paths as needed)
COPY ./ /app

RUN rasa train

# Expose the Rasa server port
EXPOSE 5005

