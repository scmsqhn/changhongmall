#!/usr/bin/env python
#! -- coding=utf-8 --
#  wsgi.py



from flask import Flask
from app import create_app, db
import app as application
import os

def create_app():
    return application.create_app(os.getenv('FLASK_CONFIG') or 'default')

app = create_app()

if __name__ == '__main__':
    app.run()
