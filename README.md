# K8S 환경에서 Istio 서비스 매쉬를 이용한 MSA Shopping Mall 개발 

<br/>

## 개요

클라우드 네이티브 환경에서 MSA 애플리케이션 개발 및 분산 서비스 추적 시스템, 모니터링 관리 시스템 구축 

<br/>

## 주요 기능 
- 컨테이너 배포, 관리 ,확장, 네트워킹 자동화
- 서비스의 지속적인 상태확인과 셀프힐링
- User service의 Sticky session
- Product service의 Circuit Breaking 
- Rating service의 카나리 배포  
- Envoy Metric을 이용한 Pod Autoscaling 
- Header propagation과 Jaeger를 이용한 분산 서비스 추적 시스템 
- Prometheus와 Grafana를 이용한 서비스 모니터링
- Kiali를 이용한 서비스 관리 

<br/>


## 적용 기술

### 1. Cloud Techs
- AWS VPC 
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
- Mongodb

<br/>

### 4. CI/CD Techs
- [Helm](https://github.com/sjoh0704/Sseung-Helm-Chart/tree/master/MSA-Shop "go to sjoh0704's helm chart!")
- Jenkins
- git

<br/>

## Manifest
- [go to Helm chart](https://github.com/sjoh0704/Sseung-Helm-Chart/tree/master/MSA-Shop "go to sjoh0704's helm chart!")

<br/>


## Architecture


### 1. Infrastructure Diagram 
![image](https://user-images.githubusercontent.com/66519046/133252790-b19b0e60-5452-40b9-a0a1-7a1fed6ab104.png)

<br/>

### 2. Service Diagram
![image](https://user-images.githubusercontent.com/66519046/133252317-20e43bf0-1ee7-4c13-86a2-dcdd5c7400ec.png)

<br/>

### 3. S/W Diagram
![image](https://user-images.githubusercontent.com/66519046/133252515-1cf9e35a-e2ea-419b-8c93-4ffdbc4e2a3e.png)

<br/>

### 4. CI/CD Diagram
![image](https://user-images.githubusercontent.com/66519046/133252709-4c2519e5-7b08-4140-8824-47816504dd5a.png)
