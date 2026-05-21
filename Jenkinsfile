pipeline {
    agent any
    stages {        
        stage('Deploy Production') {
            echo "Deploy Pipeline Started (branch: ${env.BRANCH_NAME})"
            when {
                branch 'main'
            }
            steps {
                echo "Production Deploy (branch: ${env.BRANCH_NAME})"
                sh 'docker compose up -d --build'
            }
        }
        stage('Deploy Staging') {
            when {
                branch 'dev'
            }
            steps {
                echo "Staging Deploy (branch: ${env.BRANCH_NAME})"
                sh 'docker compose -f docker-compose-dev.yml up -d --build'
            }
        }
    }
}
