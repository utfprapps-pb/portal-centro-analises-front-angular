pipeline {
    agent any
    stages {
        stage('Deploy Web Client') {
            steps {
                script {
                    def branch = env.BRANCH_NAME?.trim()
                    if (!branch) {
                        branch = env.GIT_BRANCH?.trim()
                    }
                    if (branch?.startsWith('origin/')) {
                        branch = branch.substring('origin/'.length())
                    }
                    if (!branch) {
                        branch = sh(
                            script: 'git rev-parse --abbrev-ref HEAD',
                            returnStdout: true
                        ).trim()
                    }
                    env.DEPLOY_BRANCH = branch ?: 'unknown'
                    echo "Deploy Web Client - Branch: ${env.DEPLOY_BRANCH}"
                }
            }
        }
        stage('Deploy Production') {
            when {
                expression { env.DEPLOY_BRANCH == 'main' }
            }
            steps {
                echo "Branch: ${env.DEPLOY_BRANCH}"
                echo "Deploy: Production"
                sh 'docker compose up -d --build'
            }
        }
        stage('Deploy Staging') {
            when {
                expression { env.DEPLOY_BRANCH == 'dev' }
            }
            steps {
                echo "Branch: ${env.DEPLOY_BRANCH}"
                echo "Deploy: Staging"
                sh 'docker compose -f docker-compose-dev.yml up -d --build'
            }
        }
    }
}
