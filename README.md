# K8S 환경에서 Istio 서비스 매쉬를 이용한 MSA Shop 개발 및 모니터링 시스템 구축

<br/>

## 개요
AWS환경에서 K8S와 Istio를 이용하여 인프라를 구성하고, 쇼핑몰을 MSA로 개발합니다.
인프라를 관리하는 분산 서비스 추적 시스템, 모니터링 관리 시스템을 구축합니다.  

<br/>

## 구성 요소 및 버전
- cri-o: v1.19
- kubeadm: v1.19
- kubectl: v1.19
- kubelet: v1.19
- istio: v1.12
- calico-CrossSubnet: v3.17 
- cloud-controller-manager: v1.19
- helm: v3.8
- number of master: 3 
- number of worker: 2


<br/>

## 주요 기능 
- Container Orchestration
- User service의 Sticky session
- Product service의 Circuit Breaking 
- Rating service의 Canary Release  
- Istio Envoy Metric을 이용한 Horizontal Pod Autoscaling 
- Jaeger를 이용한 microservice Transaction Tracing 
- Grafana를 이용한 모니터링
- Kiali를 이용한 서비스 모니터링

<br/>

## Architecture


### 1. Infrastructure Diagram 
![image](https://user-images.githubusercontent.com/66519046/144748860-f323b4e4-3ed6-4d76-b879-09cb2e581162.png)


<br/>

### 2. Service Diagram
![image](https://user-images.githubusercontent.com/66519046/144748884-0c461176-4451-4432-82bc-f1e84e44b8f8.png)

<br/>

### 3. S/W Diagram
![image](https://user-images.githubusercontent.com/66519046/145411879-da5dadae-cef7-4ee4-b7c5-96358e174b39.png)



<br/>

### 4. CI/CD Diagram
![image](https://user-images.githubusercontent.com/66519046/144749920-1eb1edb3-b9b1-4150-b080-46ce757ce808.png)



<br/>

## Components

### 1. Cloud Techs
- AWS VPC 
- AWS NAT 
- AWS EC2
- AWS ELB
- AWS EFS

<br/>

### 2. Infrastructure Techs 
- Kubernetes
- Istio
- Kilai
- Prometheus
- Grafana
- Jaeger

<br/>

### 3. Application Techs 
- Nodejs 
- React
- Django
- Nginx
- Mysql
- MongoDB

<br/>

### 4. CI/CD Techs
- [Helm](https://github.com/sjoh0704/Sseung-Helm-Chart/tree/master/MSA-Shop "go to sjoh0704's helm chart!")
- Jenkins
- git

<br/>

## Manifest
- [go to Helm chart](https://github.com/sjoh0704/Sseung-Helm-Chart/tree/master/MSA-Shop "go to sjoh0704's helm chart!")

<br/>

## Youtube
[![Youtube](http://img.youtube.com/vi/TDG2syZHrpI/0.jpg)](https://www.youtube.com/watch?v=TDG2syZHrpI)
