# Full-Stack Application Deployment and Management on Kubernetes

## Overview

This project demonstrates the deployment and management of a full-stack application on a Kubernetes cluster. The application includes:

- **Frontend**: An Nginx server serving a static website.
- **Backend**: A Node.js API server that connects to a MongoDB database.
- **Database**: A MongoDB database to store and retrieve data.

## Objectives

- Containerize the application using Docker.
- Deploy the application on Kubernetes.
- Manage environment variables using ConfigMaps and Secrets.
- Ensure data persistence using Persistent Volumes.
- Perform scaling, monitoring, and load testing.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Minikube
- kubectl
- Apache Benchmark (`ab`) for load testing

## Project Structure

```plaintext
/project-root
│
├── /frontend
│   ├── Dockerfile
│   └── (static website files)
│
├── /backend
│   ├── Dockerfile
│   └── server.js
│
├── /kubernetes
│   ├── pv-pvc.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   ├── node-backend-deployment.yaml
│   ├── node-backend-service.yaml
│   ├── nginx-deployment.yaml
│   ├── nginx-service.yaml
│   └── configmap.yaml
│   └── secrets.yaml
│
└── README.md
```

## Step 1: Setup the Kubernetes Environment

1. **Start Minikube with Sufficient Resources:**

   ```bash
   minikube start --cpus=4 --memory=8192
   ```

2. **Verify kubectl Configuration:**

   ```bash
   kubectl config current-context
   ```

3. **Create a Namespace:**
   ```bash
   kubectl create namespace fullstack-app
   kubectl config set-context --current --namespace=fullstack-app
   ```

## Step 2: Containerize the Application

### 2.1 Frontend (Nginx)

1. **Create Dockerfile:**

   - In the `/frontend` directory, create a `Dockerfile` with the following content:
     ```Dockerfile
     FROM nginx:alpine
     COPY . /usr/share/nginx/html
     EXPOSE 80
     CMD ["nginx", "-g", "daemon off;"]
     ```

2. **Build and Push Docker Image:**
   ```bash
   docker build -t your-docker-username/nginx-frontend:v1 .
   docker push your-docker-username/nginx-frontend:v1
   ```

### 2.2 Backend (Node.js)

1. **Create Dockerfile:**

   - In the `/backend` directory, create a `Dockerfile` with the following content:
     ```Dockerfile
     FROM node:14
     WORKDIR /usr/src/app
     COPY package*.json ./
     RUN npm install
     COPY . .
     EXPOSE 3000
     CMD ["node", "server.js"]
     ```

2. **Build and Push Docker Image:**
   ```bash
   docker build -t your-docker-username/node-backend:v1 .
   docker push your-docker-username/node-backend:v1
   ```

### 2.3 Database (MongoDB)

1. **Use the Official MongoDB Image:**

   - No Dockerfile needed. The official MongoDB image will be used directly.

2. **Configure Persistent Storage:**
   - Create a Kubernetes Persistent Volume and Persistent Volume Claim in the `/kubernetes/pv-pvc.yaml` file.

## Step 3: Create Kubernetes Manifests

1. **Create Persistent Volumes and Persistent Volume Claims:**

   ```bash
   kubectl apply -f kubernetes/pv-pvc.yaml
   ```

2. **Create and Apply ConfigMaps:**

   ```bash
   kubectl apply -f kubernetes/configmap.yaml
   ```

3. **Create and Apply Secrets:**

   ```bash
   kubectl apply -f kubernetes/secrets.yaml
   ```

4. **Deploy MongoDB:**

   ```bash
   kubectl apply -f kubernetes/mongo-deployment.yaml
   kubectl apply -f kubernetes/mongo-service.yaml
   ```

5. **Deploy Node.js Backend:**

   ```bash
   kubectl apply -f kubernetes/node-backend-deployment.yaml
   kubectl apply -f kubernetes/node-backend-service.yaml
   ```

6. **Deploy Nginx Frontend:**
   ```bash
   kubectl apply -f kubernetes/nginx-deployment.yaml
   kubectl apply -f kubernetes/nginx-service.yaml
   ```

## Step 4: Application Management

1. **Scale Deployments:**

   ```bash
   kubectl scale deployment node-backend-deployment --replicas=5
   kubectl scale deployment nginx-deployment --replicas=5
   ```

2. **Monitor Logs:**

   ```bash
   kubectl logs -f deployment/node-backend-deployment
   kubectl logs -f deployment/nginx-deployment
   ```

3. **Port Forwarding for MongoDB:**

   ```bash
   kubectl port-forward svc/mongo-service 27017:27017
   ```

4. **Perform Rolling Updates:**
   ```bash
   kubectl set image deployment/node-backend-deployment node-backend=your-docker-username/node-backend:v2
   kubectl set image deployment/nginx-deployment nginx=your-docker-username/nginx-frontend:v2
   ```

## Step 5: Testing and Validation

1. **Access the Application:**

   - Open a browser and navigate to `http://<minikube-ip>:30080`.

2. **Load Testing:**

   - Using Apache Benchmark:
     ```bash
     ab -n 1000 -c 10 http://<minikube-ip>:<node-backend-port>/api/endpoint
     ```

3. **Verify Data Persistence:**
   - Restart the MongoDB pod and check if data persists.

## Step 6: Documentation and Submission

1. **Create Documentation:**

   - Include detailed steps for each part of the process.

2. **Prepare a Presentation:**

   - Create a 5-minute presentation covering all steps of the project.

3. **Push to GitHub:**
   - Push all your code, Dockerfiles, and Kubernetes manifests to a GitHub repository.

## Evaluation Criteria

- **Correctness:** All components should be correctly deployed and configured.
- **Documentation:** Clear, comprehensive, and well-structured documentation.
- **Functionality:** The application should work as expected, with proper scaling, monitoring, and data persistence.

## Conclusion

This project demonstrates the deployment and management of a full-stack application on Kubernetes. By following the steps outlined above, you will gain hands-on experience with Docker, Kubernetes, and related tools, ensuring you are well-prepared to manage complex applications in a production environment.
