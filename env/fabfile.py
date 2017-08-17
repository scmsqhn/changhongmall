from fabric.api import *
import traceback

#env.user = 'appuser'
env.user = 'root'
env.hosts = ['triboys.com', 'triboys.com']

def pack():
  try:
    local('python setup.py sdist --formats=gztar', capture=False)
  except:
    traceback.print_exc()

def deploy():
  try:
    dist = local('python setup.py --fullname', capture=True).strip()
    put('dist/%s.tar.gz' % dist, '/tmp/chmall.tar.gz')
    run('mkdir /tmp/chmall')
    with cd('/tmp/chmall'):
        run('tar xzf /tmp/chmall.tar.gz')
        run('/var/www/chmall/env/bin/python setup.py install')
    run('rm -rf /tmp/chmall /tmp/chmall.tar.gz')
    run('touch /var/www/chmall.wsgi')
  except:
    traceback.print_exc()
