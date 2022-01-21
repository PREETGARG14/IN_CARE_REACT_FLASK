
  
FROM python:3.9
EXPOSE 5000/tcp
COPY ./backend /app
WORKDIR /app
RUN pip install -r requirements.txt

CMD ["python3","./run.py"]