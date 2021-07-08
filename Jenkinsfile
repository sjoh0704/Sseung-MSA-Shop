
pipeline {
    agent any
    environment{
    DOCKER_ID = 'tmdwn0704'
    FRONT_IMAGE = 'frontend'
    USER_IMAGE = 'user-service'
    PRODUCT_IMAGE = 'product-service'
    ORDER_IMAGE = 'order-service'    
    GATEWAY_IMAGE = 'gateway-service'
    TAG = 'test'
    }
    

    stages{
    
    stage("clone"){
        steps{
        checkout scm
        }


    }

        stage("image build"){
            steps{
                
                
            dir('product@tmp'){
   
            sh 'docker build -t ${DOCKER_ID}/${PRODUCT_IMAGE}:${TAG} .'
            }
                
                
            dir('front-shop@tmp'){
            sh 'git branch'
            sh 'docker build -t ${DOCKER_ID}/${FRONT_IMAGE}:${TAG} .'
            }
                
            dir('backend@tmp'){
            sh 'pwd'
            sh 'git branch'
            sh 'docker build -t ${DOCKER_ID}/${USER_IMAGE}:${TAG} .'

            }
             
                
            dir('order@tmp'){
            sh 'pwd'
            sh 'docker build -t ${DOCKER_ID}/${ORDER_IMAGE}:${TAG} .'
            }
                
            dir('apigateway@tmp'){
            sh 'pwd'
            sh 'docker build -t ${DOCKER_ID}/${GATEWAY_IMAGE}:${TAG} .'
            }
            
            
        }

    }
    

    stage("image push"){
        steps{
            withCredentials([usernamePassword(credentialsId: 'dockerhub-credential', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
              sh 'docker login -u $USERNAME -p $PASSWORD'
            }
            
            sh 'docker push ${DOCKER_ID}/${FRONT_IMAGE}:${TAG}'
            sh 'docker push ${DOCKER_ID}/${USER_IMAGE}:${TAG}'
            sh 'docker push ${DOCKER_ID}/${PRODUCT_IMAGE}:${TAG}'
            sh 'docker push ${DOCKER_ID}/${GATEWAY_IMAGE}:${TAG}'
            sh 'docker push ${DOCKER_ID}/${ORDER_IMAGE}:${TAG}'

           

        }
 
    }
    
}
}
