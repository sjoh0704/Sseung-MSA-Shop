FROM python:3.7.8-buster

ENV FRONTEND frontend-service.default.svc

WORKDIR /app

COPY . .

RUN apt update

RUN apt install curl -y

RUN apt install jq -y

CMD ./load.py

EXPOSE 80