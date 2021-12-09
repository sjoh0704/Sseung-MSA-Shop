# K8S 환경에서 Istio 서비스 매쉬를 이용한 MSA Shop 개발 및 모니터링 시스템 구축

<br/>

## 개요
AWS, K8S, Istio 기반 환경에서 쇼핑몰을 MSA로 개발하고 분산 서비스 추적 시스템, 모니터링 관리 시스템을 구축합니다.    

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

## 적용 기술

### 1. Cloud Techs
- AWS VPC 
- AWS NAT 
- AWS EC2
- AWS ELB

<br/>

### 2. Infrastructure Techs 
- Kubernetes 
- Docker 
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
