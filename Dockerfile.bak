FROM openjdk:17-jdk-slim AS builder

# Install dependencies needed for Node.js with better error handling
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    gnupg \
    ca-certificates \
    apt-transport-https \
    && apt-get clean

# Install Node.js using direct binary installation method (works better for ARM)
RUN ARCH=$(dpkg --print-architecture) && \
    case ${ARCH} in \
        arm64) BINARY_ARCH="arm64";; \
        amd64) BINARY_ARCH="x64";; \
        *) echo "Unsupported architecture: ${ARCH}"; exit 1;; \
    esac && \
    curl -fsSL https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-${BINARY_ARCH}.tar.gz | tar -xz -C /usr/local --strip-components=1 && \
    ln -s /usr/local/bin/node /usr/local/bin/nodejs

# Verify installations
RUN java -version && node -v && npm -v

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-slim


VOLUME /tmp

COPY --from=builder /app/target/*.jar app.jar

RUN mkdir -p /app/uploads && chmod 777 /app/uploads

# Expose the port
EXPOSE 8081

ENTRYPOINT ["java","-jar","-Dimage.upload.directory=/app/uploads", "/app.jar"]