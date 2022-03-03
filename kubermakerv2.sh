#!/bin/bash

kubectl apply -f files-persistentvolumeclaim.yaml

kubectl apply -f users-kube.yml

kubectl apply -f mongo-kube.yml

kubectl apply -f python-kube.yml

kubectl apply -f java-kube.yml

kubectl apply -f node-kube.yml

kubectl apply -f redis-kube.yml

kubectl apply -f api-gtw-kube.yml

kubectl apply -f components.yml