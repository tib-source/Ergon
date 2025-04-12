.PHONY: lint ui server all

lint:
	./mvnw exec:java -Dexec.mainClass="com.puppycrawl.tools.checkstyle.Main" -Dexec.args="-c /sun_checks.xml src/main/java"

ui:
	cd src/main/client && npm run dev

server:
	./mvnw spring-boot:run -Dspring-boot.run.profiles=local

server-prod:
	./mvnw spring-boot:run -Dspring-boot.run.profiles=prod

all:
	make ui
	make server