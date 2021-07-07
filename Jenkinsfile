
pipeline {
    agent any
    environment{
    IMAGE_NAME = 'test'
    }
    

    stages{
    
    stage("clone"){
        steps{
 
        checkout([
             $class: 'GitSCM',
             branches: scm.dev,
             doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
             extensions: scm.extensions,
             userRemoteConfigs: scm.userRemoteConfigs
        ])

 
        }

    }

        stage("image build"){
            steps{
            dir('front'){
        
            sh 'docker build -t ${IMAGE_NAME} .'
            sh 'docker tag ${IMAGE_NAME}:latest 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE_NAME}:$BUILD_NUMBER'
            }
            
            
    }

    }
    

    stage("image push"){
        steps{
        sh 'aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com'
        sh 'docker push 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE_NAME}:$BUILD_NUMBER'
        }
 
    }

    stage("deploy"){
        steps{
        echo "deploy!!"
        }
   
        }

    }
    
}
