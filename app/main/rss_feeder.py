#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import MySQLdb
import time
import sys
reload(sys)
sys.setdefaultencoding("utf8")
sys.path.append("..")


FEEDLIST = ["http://iwucha.com/feed/"
,"http://www.toodaylab.com/feed"
,"http://feed.feedsky.com/leica"
,"http://cinephilia.net/feed"
,"http://www.adaymag.com/feed/"
,"http://feed.feedsky.com/typeisbeautiful"
,"http://www.uisdc.com/feed"
,"http://www.closhow.cn/feed"
,"http://www.photoworld.com.cn/feed"
,"https://unsplash.com/rss"
,"http://www.thesartorialist.com/feed/"
,"http://evernote-tw.tumblr.com/rss"
,"http://feed.iplaysoft.com/"
,"http://feed.xbeta.info/"
,"http://feed.appinn.com/"
,"http://www.apprcn.com/feed"
,"http://ree.apprcn.com/feed"
,"http://www.bzdiao.com/rss"
,"http://cn.engadget.com/rss.xml"
,"http://cnbeta.com/backend.php"
,"http://www.williamlong.info/blog/rss.xml"
,"http://www.phonekr.com/feed/"
,"http://www.wpdang.com/feed"
,"http://playpcesor.blogspot.com/feeds/posts/default?alt=rss"
,"http://songshuhui.net/feed"
,"http://www.guokr.com/rss/"
,"http://pansci.tw/feed"
,"http://feeds.geekpark.net/"
,"http://feed.google.org.cn/"
,"http://www.syncoo.com/feed"
,"http://www.syncoo.com/feed"
,"http://www.36kr.com/feed"
,"http://www.ifanr.com/feed"
,"http://www.techxue.com/"
,"http://www.geekfan.net/feed/"
,"http://www.chinagfw.org/feeds/posts/default?alt=rss"
,"http://fullrss.net/a/http/www.sciencenet.cn/xml/blog.aspx?di=20"
,"http://feeds.feedburner.com/zhihu-daily"
,"http://blog.sina.com.cn/rss/1286528122.xml"
,"http://feed.cnblogs.com/blog/sitehome/rss"
,"http://www.qianduan.net/feed"
,"http://cnpolitics.org/feed/"
,"http://hanhanone.sinaapp.com/feed/dajia"
,"http://www.aisixiang.com/rss.php?type=1"
,"http://www.nbweekly.com/rss/smw/"
,"http://feeds2.feedburner.com/solidot"
,"http://feeds.feedburner.com/chinadigitaltimes/IyPt"
,"http://www.21ccom.net/plus/rss.php"
,"http://www.hrw.org/zh-hans/rss"
,"http://headsalon.org/feed"
,"http://www.rfa.org/mandarin/RSS"
,"http://feeds.feedburner.com/letscorp/aDmw"
,"http://blog.ecocn.org/feed"
,"http://rss.dw.de/rdf/rss-chi-all"
,"http://cn.nytimes.com/rss.html"
,"https://cochina.co/feed/"
,"http://yidu.im/rss"
,"http://www.bbc.co.uk/zhongwen/simp/index.xml"
,"http://feed.feedsky.com/xinli001"
,"http://www.nhzy.org/?feed=rss2"
,"http://feed.smzdm.com"
,"chinaconsumerreport.org"
,"http://zh.wikihow.com/feed.rss"
,"http://feed.mifengtd.cn/"
,"http://www.read.org.cn/feed"
,"http://www.write.org.cn/feed"
,"http://chit-philosophy.blogspot.com/feeds/posts/default?alt=rss"
,"http://feeds2.feedburner.com/programthink"
,"http://www.huangjiwei.com/blog/?feed=rss2"
,"http://www.immusoul.com/feed"
,"http://commentshk.blogspot.com/feeds/posts/default"
,"http://feeds.feedburner.com/ruanyifeng"
,"http://feed.feedsky.com/bxlxwxf"
,"http://www.geekonomics10000.com/feed"
,"http://blog.sina.com.cn/rss/1286402547.xml"
,"http://www.duxieren.com/duxieren.xml"
,"http://www.adaymag.com/feed/"
,"http://www.ciqiong.cn/feed"
,"http://onehd.herokuapp.com/"
,"http://www.dfdaily.com/rss/1170.xml"
,"http://fullrss.net/a/http/www.sciencenet.cn/xml/blog.aspx?di=20"
,"http://www.zhihu.com/rss"
,"http://feed.feedsky.com/qiushi"
,"http://www.zhihudaily.net/rss.xml"
,"http://blog.china.petaasiapacific.com/feed/"
,"http://feeds2.feedburner.com/jandan"
,"http://miantiao.me/douban-yike-rss.html"
,"http://www.58dm.com/Rss.aspx"
,"http://finle.me/feed/"]

db = MySQLdb.connect(host="127.0.0.1",user="root",passwd="root",db="ultrax",charset="utf8" )
sent = u'select MAX(id) from news;'
cursor = db.cursor()
base=0
base = cursor.execute(sent)
from email.parser import FeedParser
#import feedparser
import traceback
#feedparser = FeedParser()
import feedparser
i=int(base)+1
for item in FEEDLIST:
  try:
    result = feedparser.parse(item)
    for e in result.entries:
      pass # print str(e)
      p=e.comments
      n=e.links[0].href
      m=e.summary
      m=re.sub('\'','"',m)
      n=re.sub('\'','"',n)
      p=re.sub('\'','"',p)
      t=e.published  #  str(list(time.localtime()))
      cmd=u'SELECT * FROM news WHERE link="%s";' % n
      ifzero=cursor.execute(cmd)
      cmd=u"INSERT INTO news VALUES(%d,'%s','%s','%s','%s');" % (i,m.encode('utf-8'),p.encode('utf-8'),n.encode('utf-8'),t.encode('utf-8'))
      pass # print cmd.encode('utf-8')
      resultmsg=cursor.execute(cmd)
      pass # print resultmsg
      i+=1
  except:
    i+=1
    traceback.print_exc()
db.close()
