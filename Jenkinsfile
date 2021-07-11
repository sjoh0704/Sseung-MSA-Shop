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
   
            sh 'docker build -t ${DOCKER_ID}/${PRODUCT_IMAGE}:${VERSION} .'
            }
                
                
            dir('front-shop'){
            
            sh 'docker build -t ${DOCKER_ID}/${FRONT_IMAGE}:${VERSION} .'
            }
                
            dir('backend'){
            
            sh 'docker build -t ${DOCKER_ID}/${USER_IMAGE}:${VERSION} .'

            }
             
                
            dir('order'){
           
            sh 'docker build -t ${DOCKER_ID}/${ORDER_IMAGE}:${VERSION} .'
            }
                
            dir('apigateway'){
          
            sh 'docker build -t ${DOCKER_ID}/${GATEWAY_IMAGE}:${VERSION} .'
            }
            
            
        }

    }
    

    stage("push images"){
        steps{
            withCredentials([usernamePassword(credentialsId: 'dockerhub-credential', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
              sh 'docker login -u $USERNAME -p $PASSWORD'
            }
            
            sh 'docker push ${DOCKER_ID}/${FRONT_IMAGE}:${VERSION}'
            sh 'docker push ${DOCKER_ID}/${USER_IMAGE}:${VERSION}'
            sh 'docker push ${DOCKER_ID}/${PRODUCT_IMAGE}:${VERSION}'
            sh 'docker push ${DOCKER_ID}/${GATEWAY_IMAGE}:${VERSION}'
            sh 'docker push ${DOCKER_ID}/${ORDER_IMAGE}:${VERSION}'

           

        }
 
    }
        
        stage("update manifest"){
            steps{
            git([url: 'https://github.com/sjoh0704/react-django-shop.git', branch: 'manifest', credentialsId: 'github-credential'])
            dir('manifest'){
           
            echo "update yamls"
            sh "sed 's/test/${VERSION}/' > manifest{$BUILD_NUMBER}.yaml" 
            sh 'git add . '
            sh 'git commit -m "commit manifest${BUILD_NUMBER}"'
            sh 'git push origin manifest'
            
             }
            }
             
            
            
        }
        
    
}
}
