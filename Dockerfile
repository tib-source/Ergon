FROM openjdk:17-jdk-slim

VOLUME /tmp

COPY target/*.jar app.jar

RUN mkdir -p /app/uploads && chmod 777 /app/uploads

# Expose the port
EXPOSE 8081

ENTRYPOINT ["java","-jar","-Dimage.upload.directory=/app/uploads", "/app.jar"]