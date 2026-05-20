pipeline {
    agent any
    stages {   
        stage('Docker Compose UP') {
            steps {
                sh 'docker compose up -d --build'
                // Build da imagem Docker usando a tag da branch correspondente
                script {
                    if (env.BRANCH_NAME == 'main') {
                        sh 'docker compose up -d --build'
                    } else if (env.BRANCH_NAME == 'dev') {
                        sh 'docker compose -f docker-compose-dev.yml up -d --build'
                    }
                }
            }
        }
    }
}
