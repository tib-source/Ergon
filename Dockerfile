FROM openjdk:17-jdk-slim
LABEL authors="tibss"

WORKDIR /app

RUN mkdir -p /app/uploads && chmod 777 /app/uploads

# Copy the pre-built JAR file (whatever it's called)
COPY target/*.jar app.jar

# Expose the port
EXPOSE 8080

ENTRYPOINT ["java","-jar","-Dimage.upload.directory=/app/uploads", "/app.jar"]