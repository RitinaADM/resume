pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                sh 'rm -rf /var/www/my-site/*'
                sh 'cp -r * /var/www/my-site/'
            }
        }
    }
}
