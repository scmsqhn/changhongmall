#!/usr/bin/python
import os
import sys
sys.path.append('/var/www/chmall/app')
os.environ['PYTHON_EGG_CACHE'] = '/var/www/chmall/env/.python-egg'
def application(environ, start_response):
  status = '200 OK'
  output = 'Hello World!'
  response_headers = [('Content-type', 'text/plain'),
          ('Content-Length', str(len(output)))]
  start_response(status, response_headers)
  return [output]
