# -*- coding: utf-8 -*-
# -*- encoding: utf-8 -*-

import urllib,urllib2
import random
from datetime import *
from flask import Flask
from flask_bootstrap import Bootstrap
from flask_mail import Mail
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_pagedown import PageDown
from config import Config
from config import config
from app import utils as ut
#from app import db
import time
import time
import sqlalchemy
from sqlalchemy.orm import sessionmaker, scoped_session
from werkzeug.contrib.fixers import ProxyFix
from app.whooshsearch import WhooshSearch
import traceback
import jieba
import chardet

bootstrap = Bootstrap()
mail = Mail()
moment = Moment()
db = SQLAlchemy()
pagedown = PageDown()

login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'auth.login'

def create_app(config_name):
    app = Flask(__name__)
#    app.config.from_object('chmall.default_config')
#    app.config.from_envvar(Config['CHMALL_CONFIG'])
    app.host ="0.0.0.0"
    app.port = "5000"
    app.debug = True

    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    bootstrap.init_app(app)
    mail.init_app(app)
    moment.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    pagedown.init_app(app)

    if not app.debug and not app.testing and not app.config['SSL_DISABLE']:
        from flask_sslify import SSLify
        sslify = SSLify(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .api_1_0 import api as api_1_0_blueprint
    app.register_blueprint(api_1_0_blueprint, url_prefix='/api/v1.0')

    from app.whooshsearch import WhooshSearch
    globalvar.set_whoosh(WhooshSearch())
    wsSearch = globalvar.get_whoosh()
    engine=sqlalchemy.create_engine('mysql://root:root@localhost:3306/ultrax?charset=utf8')
    #Config.SQLALCHEMY_DATABASE_URI)
    Session=scoped_session(sessionmaker(bind=engine))
    sess=Session()
    CMD=u'SELECT couponlink,name,code FROM goods' # [0,1]=[code,name]
    sqlData = sess.execute(CMD)
    sqlData = sqlData.cursor._rows
    sqlData = list(sqlData)
    codelist = []
    for i in sqlData:
        import chardet
        codedict = {}
        #codec0 = chardet.detect(i[0])["encoding"]
        #codec1 = chardet.detect(i[1])["encoding"]
        #codec2 = chardet.detect(i[2])["encoding"]
        #i[0] = i[0].decode(codec0)
        #i[1] = i[1].decode(codec1)
        #i[2] = i[2].decode(codec2)
        #print i[0],i[1],i[2]
        #print codec1, codec2, codec3
        import chardet
        type="utf8"
        codedict[u"title"] = i[0]
#       ii = i[1]
        tmp = jieba.cut_for_search(i[1])
        ii  = ", ".join(tmp)
        print ii
        try:
            codectmp = chardet.detect(ii)["encoding"]
            codedict[u"content"] = ii.decode(codectmp)
        except ValueError:
            codedict[u"content"] = ii            
        codedict[u"path"] = i[2]
        import json
        pass # printjson.dumps(codedict)
        codelist.append(codedict)
    wsSearch.insert_index()
    wsSearch.add_path_2_index("indexer", codelist)
    #results = wsSearch.search("indexer", u"content", u"dido")
    return app

'''''
obtain all the data of hostpage 
to be show by qq
'''    
def obtain_data_2_hostpage():
    pass
    crawl_data()
    
def insert2Db9Table():
    ut.prt([config])
    ut.prt([config, Config])
    engine = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    Session = scoped_session(sessionmaker(bind=engine))
    s = Session()
    for i in range(0,9*12):
        ID = i
        IMG_URL = u"http://i3.vanclimg.com/cms/20170803/xtsy_47.jpg"
        HREF_URL= u"http://catalog.vancl.com/xjy.html"
        CONTENT = u"长虹S06,完美手机"
        TITLE = u"S06"
        PRICE = random.randint(0,272)
        RATE = random.randint(0,10)/10
        TIMES = time.time()
        CMD = u'INSERT INTO hostpagetable VALUES(%d, "%s", "%s", "%s", "%s", %d, %f, %d)' %(ID, IMG_URL, HREF_URL, CONTENT, TITLE, PRICE, RATE, TIMES)
        ut.prt([TIMES,CMD])
        #result = db.engine.execute(CMD)
#        CMD= CMD.encode('utf-8')
        result = s.execute(CMD)
        ut.prts(result)
#        db.session.execute(CMD)

if __name__=='__main__':
    pass
    '''
    res = craw_baidu_pic(col=u'美女'.encode('gb2312'),tag=u'小清新'.encode('gb2312'))
    pass # printres
    imgs = json.dumps(res)
    pass # printimgs
    pass # printimgs['imgs']
    '''
    
    
