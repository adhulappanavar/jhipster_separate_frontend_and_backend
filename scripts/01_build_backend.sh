mkdir backend-service
cd backend-service

jhipster import-jdl ../backend/customer-service-backend.jdl

cd customerservice
./gradlew bootJar -Pprod jibDockerBuild