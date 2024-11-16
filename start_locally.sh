#! /bin/zsh
set -e

# start the client
( cd src/main/client && npm run dev & )

# start the server
( ./mvnw spring-boot:run )


