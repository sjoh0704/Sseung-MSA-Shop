pipeline {
    agent any
    environment{
    DOCKER_ID = 'tmdwn0704'
    FRONT_IMAGE = 'frontend'
    USER_IMAGE = 'user-service'
    PRODUCT_IMAGE = 'product-service'
    ORDER_IMAGE = 'order-service'    
    GATEWAY_IMAGE = 'gateway-service'
    CART_IMAGE = 'cart-service'
    RATING_IMAGE = 'rating-service'
    TAG = 'test'
    VERSION = 'test${BUILD_NUMBER}'
    }
    
    stages{

        stage("clone"){
            steps{
                git([url: 'https://github.com/sjoh0704/react-django-shop.git', branch: 'dev', credentialsId: 'github-credential'])
            }
        }

        stage("image build"){
            steps{
                
                    
                dir('product'){
                    sh 'docker build -t ${DOCKER_ID}/${PRODUCT_IMAGE}:${TAG}${BUILD_NUMBER} .'
                }

                dir('front-shop'){
                sh 'docker build -t ${DOCKER_ID}/${FRONT_IMAGE}:${TAG}${BUILD_NUMBER} .'
                }   

                dir('account'){         
                sh 'docker build -t ${DOCKER_ID}/${USER_IMAGE}:${TAG}${BUILD_NUMBER} .'
                }      

                dir('order'){
                sh 'docker build -t ${DOCKER_ID}/${ORDER_IMAGE}:${TAG}${BUILD_NUMBER} .'
                }    

                dir('apigateway2'){
                sh 'docker build -t ${DOCKER_ID}/${GATEWAY_IMAGE}:${TAG}${BUILD_NUMBER} .'
                }

                dir('cart'){
                sh 'docker build -t ${DOCKER_ID}/${CART_IMAGE}:${TAG}${BUILD_NUMBER} .'
                }
                
                dir('rating'){
                sh 'docker build -t ${DOCKER_ID}/${RATING_IMAGE}:${TAG}${BUILD_NUMBER} .'
                }
            }
        }
    
    stage("push images"){

        steps{
            withCredentials([usernamePassword(credentialsId: 'dockerhub-credential', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
              sh 'docker login -u $USERNAME -p $PASSWORD'
            }
            sh 'docker push ${DOCKER_ID}/${FRONT_IMAGE}:${TAG}${BUILD_NUMBER}'
            sh 'docker push ${DOCKER_ID}/${USER_IMAGE}:${TAG}${BUILD_NUMBER}'
            sh 'docker push ${DOCKER_ID}/${PRODUCT_IMAGE}:${TAG}${BUILD_NUMBER}'
            sh 'docker push ${DOCKER_ID}/${GATEWAY_IMAGE}:${TAG}${BUILD_NUMBER}'
            sh 'docker push ${DOCKER_ID}/${ORDER_IMAGE}:${TAG}${BUILD_NUMBER}'
            sh 'docker push ${DOCKER_ID}/${CART_IMAGE}:${TAG}${BUILD_NUMBER}'
            sh 'docker push ${DOCKER_ID}/${RATING_IMAGE}:${TAG}${BUILD_NUMBER}'

        }
    }
        
        stage("update manifest"){

            steps{
            git([url: 'https://github.com/sjoh0704/MSA-Shop-Helm-Chart.git', branch: 'master', credentialsId: 'github-credential'])
            dir('version'){
           
            echo "update yamls"
            sh "sed 's/${TAG}/${TAG}${BUILD_NUMBER}/' values_demo.yaml > values_ver${BUILD_NUMBER}.yaml" 
            sh 'git add . '
            sh 'git commit -m "commit manifest${BUILD_NUMBER}"'
            withCredentials([usernamePassword(credentialsId: 'github-credential', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/sjoh0704/MSA-Shop-Helm-Chart.git master')
                    
                    }    
                }
            }         
        }
    }
}
