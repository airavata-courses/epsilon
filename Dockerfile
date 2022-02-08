FROM openjdk:latest

WORKDIR /app

COPY ./target/*.jar ./app.jar
# ENTRYPOINT ["java", "-jar", "/app/app.jar"]
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/app.jar"]

EXPOSE 8080