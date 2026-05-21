pipeline {
    agent any
    stages {
         stage('Deploy Web Client') {                        
            steps {
                echo "Deploy Web Client - Branch: ${env.BRANCH_NAME}"                
            }
        }
        stage('Deploy Production') {            
            when {
                branch 'main'
            }
            steps {
                echo "Branch: ${env.BRANCH_NAME}"
                echo "Deploy: Production"
                sh 'docker compose up -d --build'
            }
        }
        stage('Deploy Staging') {
            when {
                branch 'dev'
            }
            steps {
                echo "Branch: ${env.BRANCH_NAME}"
                echo "Deploy: Staging"
                sh 'docker compose -f docker-compose-dev.yml up -d --build'
            }
        }
    }
}
