FROM openjdk:8

WORKDIR /app

COPY / /app/

RUN ./Install.sh

RUN ./ServerStart.sh

RUN  sed -i "s|false|true|g" ./eula.txt

EXPOSE 25575

CMD ["./ServerStart.sh"]