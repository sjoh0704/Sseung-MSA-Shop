FROM python:3.6.6

RUN pip install django

RUN pip install --upgrade pip

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["/bin/bash", "run.sh"]

EXPOSE 8000
