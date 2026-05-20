pipeline {
    agent any
    stages {   
        stage('Docker Compose UP') {
            steps {
                echo "Branch: ${env.BRANCH_NAME}"
                if (env.BRANCH_NAME == 'main') {
                    sh 'docker compose up -d --build'
                } else if (env.BRANCH_NAME == 'dev') {
                    sh 'docker compose -f docker-compose-dev.yml up -d --build'
                }
            }
        }
    }
}
