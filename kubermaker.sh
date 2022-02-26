#!/bin/bash

kubectl apply -f files-persistentvolumeclaim.yaml

kubectl apply -f users-service-service.yaml

kubectl apply -f users-service-deployment.yaml

kubectl apply -f mongoserver-service.yaml

kubectl apply -f mongoserver-deployment.yaml

kubectl apply -f pythonservice-service.yaml

kubectl apply -f pythonservice-deployment.yaml

kubectl apply -f javaservice-service.yaml

kubectl apply -f javaservice-deployment.yaml

kubectl apply -f node-service-service.yaml

kubectl apply -f node-service-deployment.yaml

kubectl apply -f redis-server-service.yaml

kubectl apply -f redis-server-deployment.yaml

kubectl apply -f apigtwservice-service.yaml

kubectl apply -f apigtwservice-deployment.yaml