#!/usr/bin/env python
#! -- coding=utf-8 --
# manage.py

import os
from werkzeug.contrib.fixers import ProxyFix
from datetime import datetime
import hashlib
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from markdown import markdown
import bleach
from flask import current_app, request, url_for
from flask_login import UserMixin, AnonymousUserMixin
from app.exceptions import ValidationError
import sqlalchemy
from flask import Flask
import chardet
import traceback
from flask import render_template, redirect, url_for, abort, flash, request, current_app, make_response
from flask_login import login_required, current_user
from flask_sqlalchemy import get_debug_queries
import sqlalchemy
from sqlalchemy.orm import sessionmaker, scoped_session
import jieba
import jieba.analyse
import app



COV = None
if os.environ.get('FLASK_COVERAGE'):
    import coverage
    COV = coverage.coverage(branch=True, include='app/*')
    COV.start()

if os.path.exists('.env'):
    print('Importing environment from .env...')
    for line in open('.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            os.environ[var[0]] = var[1]

from app import create_app, db
from app.models import User, Follow, Role, Permission, Post, Comment, HostPageTable,Pict,News
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)


def make_shell_context():
    return dict(app=app, db=db, User=User, Follow=Follow, Role=Role,
                Permission=Permission, Post=Post, Comment=Comment, HostPageTable=HostPageTable,Pict=Pict,News=News)
manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

@manager.command
def index(length=25, profile_dir=None):
  try:
    """Run the unit tests."""
    engine=sqlalchemy.create_engine('mysql://root:root@localhost:3306/ultrax?charset=utf8')
    #Config.SQLALCHEMY_DATABASE_URI)
    Session=scoped_session(sessionmaker(bind=engine))
    sess=Session()
    CMD=u'SELECT couponlink,name,shop FROM goods' # [0,1]=[code,name]
    sqlData = sess.execute(CMD)
    sqlData = sqlData.cursor._rows
    sqlData = list(sqlData)
    codelist = []
    codedict = {}
    for i in sqlData:
        import chardet
        type="utf8"
        codedict[u"title"] = i[0]
        codedict[u"content"] = i[1]
        codedict[u"path"] = i[2]
        #type = chardet.detect(i[0])['encoding']
        #codedict[u"title"] = i[0].decode(type)
        #type = chardet.detect(i[1])['encoding']
        #codedict[u"content"] = i[1].decode(type)
        #type = chardet.detect(i[2])['encoding']
        #codedict[u"path"] = i[2].decode(type)
        import json
        print json.dumps(codedict)
        codelist.append(codedict)
    from app.whooshsearch import WhooshSearch
    woshsearch = WhooshSearch()
    woshsearch.insert_index()
    woshsearch.add_path_2_index("indexer", codelist)
    # test data 
    results = woshsearch.search("indexer", u"content", u"dido")
  except:
    traceback.print_exc()


@manager.command
def test(coverage=False):
    """Run the unit tests."""
    if coverage and not os.environ.get('FLASK_COVERAGE'):
        import sys
        os.environ['FLASK_COVERAGE'] = '1'
        os.execvp(sys.executable, [sys.executable] + sys.argv)
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)
    if COV:
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        basedir = os.path.abspath(os.path.dirname(__file__))
        covdir = os.path.join(basedir, 'tmp/coverage')
        COV.html_report(directory=covdir)
        print('HTML version: file://%s/index.html' % covdir)
        COV.erase()


@manager.command
def profile(length=25, profile_dir=None):
    """Start the application under the code profiler."""
    from werkzeug.contrib.profiler import ProfilerMiddleware
    app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[length],
                                      profile_dir=profile_dir)
    app.run()


@manager.command
def deploy():
    """Run deployment tasks."""
    from flask_migrate import upgrade
    from app.models import Role, User, HostPageTable, Pict,News

    # migrate database to latest revision
    upgrade()

    # create user roles
    Role.insert_roles()

    # create self-follows for all users
    User.add_self_follows()


if __name__ == '__main__':

    app.wsgi_app = ProxyFix(app.wsgi_app)
    manager.run()
