pipeline {
    agent any

    stages {
        stage('Deploy static site') {
            steps {
                sh '''
                    mkdir -p /var/www/my-site/
                    cp -r index.html script.js styles.css /var/www/my-site/
                '''
            }
        }
    }
}
