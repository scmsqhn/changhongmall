#!bin/bash

cd /
cd /chmall
source activate env
gunicorn -w 1 -b 127.0.0.1:5000 wsgi:app
