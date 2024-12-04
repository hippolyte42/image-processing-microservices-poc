# Proof of Concept : Image Upload and Processing

## Prerequisites

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation and Usage

1. Build Docker Images :

```bash
make build
```

2. Create and start service containers and network :

```bash
make up
```

3. Upload an image to service 1 :

```bash
curl -X POST -F "image=@path/to/your/image.jpg" http://localhost:3001/image
```

4. Process the image via service 2 :

```bash
curl http://localhost:3002/process/image.jpg --output blurred_image.jpg
```

5. Stop and remove service containers and network :

```bash
make down
```
