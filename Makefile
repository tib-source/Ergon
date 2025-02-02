lint:
	mvn exec:java -Dexec.mainClass="com.puppycrawl.tools.checkstyle.Main" -Dexec.args="-c /sun_checks.xml src/main/java"