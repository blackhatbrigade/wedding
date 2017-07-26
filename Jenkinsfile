node('2Mean') {
  stage('Checkout') {
    checkout scm
  }
  stage('Build') {
<<<<<<< HEAD
    sh '''sudo docker build -t wedding .'''
  }
  stage('Test') {
    sh '''sudo docker run -v $WORKSPACE/build:/usr/src/app/build -v $WORKSPACE/coverage:/usr/src/app/coverage armor npm run test || true'''
    junit 'build/reports/server/test-results.xml'
    step([$class: 'CoberturaPublisher', autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'coverage/cobertura-coverage.xml', failUnhealthy: false, failUnstable: false, maxNumberOfBuilds: 0, onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false])
  }
  stage('Deploy') {
    if (env.BRANCH_NAME == 'master') {
      withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-jason', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
        sh '''`aws ecr get-login --region us-west-2`
              # tag

              # push
              
              # aws --region "us-west-2" ecs list-tasks --cluster default --service-name wedding | grep "arn:aws" | sed -E 's/^ +\"//' | sed 's/\"$//' > arn
              # aws --region "us-west-2" ecs stop-task --cluster default --task `cat arn`'''
      }
    }
  }
}
