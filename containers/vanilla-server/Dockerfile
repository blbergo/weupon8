FROM openjdk:17

WORKDIR /app

COPY / /app/

RUN java -jar paper.jar

RUN  sed -i "s|false|true|g" ./eula.txt

EXPOSE 25565

ENTRYPOINT ["java","-jar","paper.jar"]