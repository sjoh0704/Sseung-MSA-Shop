FROM ubuntu:18.04

WORKDIR /app

COPY . .

RUN apt update

RUN apt install curl -y

RUN apt install jq -y

CMD sh load.sh

EXPOSE 80