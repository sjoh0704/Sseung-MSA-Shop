node {
    def hello = 'Hello jojoldu' // 변수선언
    stage ('clone') {
        checkout scm
//         git 'https://github.com/jojoldu/jenkins-pipeline.git' // git clone
    }
    dir ('sample') { // clone 받은 프로젝트 안의 sample 디렉토리에서 stage 실행
        stage ('sample/execute') {
            sh './execute.sh'
        }
    }
    stage ('print') {
        print(hello) // 함수 + 변수 사용
    }
}

// 함수 선언 (반환 타입이 없기 때문에 void로 선언, 있다면 def로 선언하면 됨)
void print(message) {
    echo "${message}"
}
// pipeline {
//     agent any
//     environment{
//     IMAGE_NAME = 'test'
//     }
    

//     stages{
    
//     stage("clone"){
//         steps{
 
//         checkout([
//              $class: 'GitSCM',
//              branches: scm.dev,
//              doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
//              extensions: scm.extensions,
//              userRemoteConfigs: scm.userRemoteConfigs
//         ])

 
//         }

//     }

//         stage("image build"){
//             steps{
//             dir('front'){
        
//             sh 'docker build -t ${IMAGE_NAME} .'
//             sh 'docker tag ${IMAGE_NAME}:latest 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE_NAME}:$BUILD_NUMBER'
//             }
            
            
//     }

//     }
    

//     stage("image push"){
//         steps{
//         sh 'aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com'
//         sh 'docker push 752943197678.dkr.ecr.ap-northeast-2.amazonaws.com/${IMAGE_NAME}:$BUILD_NUMBER'
//         }
 
//     }

//     stage("deploy"){
//         steps{
//         echo "deploy!!"
//         }
   
//         }

//     }
    
// }
