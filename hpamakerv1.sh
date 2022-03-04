#!/bin/bash
cd hpas

kubectl apply -f users-hpa.yml

kubectl apply -f python-hpa.yml

kubectl apply -f node-hpa.yml

kubectl apply -f java-hpa.yml

kubectl apply -f api-gtw-hpa.yml