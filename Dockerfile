FROM openjdk:17-jdk-slim as builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim


VOLUME /tmp

COPY --from=builder /app/target/*.jar app.jar

RUN mkdir -p /app/uploads && chmod 777 /app/uploads

# Expose the port
EXPOSE 8081

ENTRYPOINT ["java","-jar","-Dimage.upload.directory=/app/uploads", "/app.jar"]