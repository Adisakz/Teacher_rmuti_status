FROM python:3.11.4-alpine

ADD  . /app
WORKDIR /app

RUN pip install --upgrade pip && pip install -r requirements.txt

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "3000"]

EXPOSE 3000

