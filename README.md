# K8S 환경에서 Istio 서비스 매쉬를 이용한 MSA Shopping Mall 개발 

<br/>

## 개요

AWS 클라우드 환경에서 K8S 클러스터를 구축합니다.
쇼핑몰을 MSA로 개발하고 개발 및 분산 서비스 추적 시스템, 모니터링 관리 시스템 구축 

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

## Architecture


### 1. Infrastructure Diagram 
![image](https://user-images.githubusercontent.com/66519046/144748860-f323b4e4-3ed6-4d76-b879-09cb2e581162.png)


<br/>

### 2. Service Diagram
![image](https://user-images.githubusercontent.com/66519046/144748884-0c461176-4451-4432-82bc-f1e84e44b8f8.png)

<br/>

### 3. S/W Diagram
![image](https://user-images.githubusercontent.com/66519046/144748926-d165ebf3-7759-4a27-936c-c539c03ac1f1.png)

<br/>

### 4. CI/CD Diagram
![image](https://user-images.githubusercontent.com/66519046/144748948-cb92e1ff-cdcb-4f5f-a49f-4ac293f62ba5.png)




## 적용 기술

### 1. Cloud Techs
- AWS VPC 
- AWS NAT 
- AWS EC2
- AWS ELB
- AWS EFS

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


