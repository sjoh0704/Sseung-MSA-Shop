FROM python:3.6.6

RUN pip install django

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000
