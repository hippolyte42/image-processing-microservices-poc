# Proof of Concept: Image Upload and Processing

This proof of concept demonstrates an image processing pipeline using microservices. The setup includes two services:

1. **Service 1**: Handles image uploads.
2. **Service 2**: Processes uploaded images (blurring).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation and Usage](#installation-and-usage)
  - [1. Build Docker Images](#1-build-docker-images)
  - [2. Start Services and Network](#2-start-services-and-network)
  - [3. Upload an Image](#3-upload-an-image)
  - [4. Process the Image](#4-process-the-image)
  - [5. Stop and Clean Up](#5-stop-and-clean-up)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

## Prerequisites

Ensure the following are installed on your system:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/)

## Installation and Usage

Follow these steps to run the project:

### 1. Build Services

```bash
make build
```

### 2. Start Services and Network

```bash
make up
```

### 3. Upload an image

Use **Service 1** to upload an image. Replace path/to/your/image.jpg with the actual path to your image:

```bash
curl -X POST -F "image=@path/to/your/image.jpg" http://localhost:3001/image
```

### 4. Process the Image

Call **Service 2** to process the uploaded image. Save the output to `blurred_image.jpg`:

```bash
curl http://localhost:3002/process/image.jpg --output blurred_image.jpg
```

### 5. Stop and Clean Up

Stop all containers and remove the Docker network:

```bash
make down
```

## Setting Up Environment Variables

To customize the application configuration, you can use a `.env` file to define environment variables. An example `.env.example` file is provided in the repository as a reference.

## Project Structure

```bash
.
├── service1/          # Code for image upload service
├── service2/          # Code for image processing service
├── compose.yml        # Service orchestration
├── Makefile           # Simplified commands
├── assignment.pdf     # Project assignment
└── README.md          # Project documentation
```

## Future Improvements

- Add error handling middleware.
