.PHONY: lint ui server all

lint:
	mvn exec:java -Dexec.mainClass="com.puppycrawl.tools.checkstyle.Main" -Dexec.args="-c /sun_checks.xml src/main/java"

ui:
	cd src/main/client && npm run dev

server:server
	mvn spring-boot:run

all:
	make ui
	make server