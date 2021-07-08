
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
            withCredentials([usernamePassword(credentialsId: 'dockerhub-credential', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
  // available as an env variable, but will be masked if you try to print it out any which way
  // note: single quotes prevent Groovy interpolation; expansion is by Bourne Shell, which is what you want
  sh 'echo $PASSWORD'
  // also available as a Groovy variable
  echo USERNAME
  // or inside double quotes for string interpolation
  echo "username is $USERNAME"
}
//          withCredentials([
//                 usernamePassword(credentialsId: 'dockerhub-credential', usernameVariable: DOCKER_USER, passwordVariable: DOCKER_PWD)
//             ]){
//                 echo 'docker login!!!'
//                 sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PWD}"
//             }
 
        checkout scm
        sh 'git checkout dev'
        }

    }

        stage("image build"){
            steps{
            dir('front-shop'){
            sh 'pwd'
            sh 'docker build -t ${DOCKER_ID}/${FRONT_IMAGE}:${TAG} .'
            sh 'docker images'
//             sh 'docker build -t ${IMAGE_NAME} .'
//             sh 'docker tag ${IMAGE_NAME}:latest 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE_NAME}:$BUILD_NUMBER'
            }
            dir('backend'){
            sh 'pwd'
//             sh 'docker build -t ${IMAGE_NAME} .'
//             sh 'docker tag ${IMAGE_NAME}:latest 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE_NAME}:$BUILD_NUMBER'
            }
            dir('product'){
            sh 'pwd'
//             sh 'docker build -t ${IMAGE_NAME} .'
//             sh 'docker tag ${IMAGE_NAME}:latest 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE_NAME}:$BUILD_NUMBER'
            }
            
            
    }

    }
    

    stage("image push"){
        steps{
            withCredentials([
                usernamePassword(credentialsId: 'dockerhub-credential', usernameVariable: DOCKER_USER, passwordVariable: DOCKER_PWD)
            ]){
                echo 'docker login!!!'
                sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PWD}"
            }
           

//         sh 'aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com'
//         sh 'docker push 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE_NAME}:$BUILD_NUMBER'
        }
 
    }

    stage("deploy"){
        steps{
        echo "deploy!!"
        }
   
        }

    }
    
}
