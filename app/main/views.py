#!/usr/bin/env python
#! -- coding=utf-8 --

import sys
sys.path.append('..')
sys.path.append('../..')
from . import main
import app
from app.whooshsearch import WhooshSearch
from flask import Flask
import chardet
import traceback
from flask import render_template, redirect, url_for, abort, flash, request, current_app, make_response
from flask_login import login_required, current_user
from flask_sqlalchemy import get_debug_queries
print app.__path__
from .forms import EditProfileForm, EditProfileAdminForm, PostForm, CommentForm
from ..models import Permission, Role, User, Post, Comment, HostPageTable, Pict,News,Goods
from app.decorators import admin_required, permission_required
from app import utils as ut
import urllib
import urllib2
from urllib import quote,unquote
import json
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
import jieba
import jieba.analyse
from app import globalvar
from ..mylog import logtools
from flask import current_app
import json
import re 
import os


#"""Table = \
#u'<table  border="0" cellpadding="0" cellspacing="0"  align="center">
#  <tr>
#    <td><img src="http://i3.vanclimg.com/cms/20170803/xtsy_46.jpg" width="19" height="414" alt="夏季新品"></td>
#    <td><a href="http://catalog.vancl.com/xjy.html" target="_blank" class="track" name="hp-hp-xptj-3_1-v:n"><img src="http://i3.vanclimg.com/cms/20170803/xtsy_47.jpg" width="272" height="414" alt="简鱼 boxer"></a></td>
#    <td><img src="http://i3.vanclimg.com/cms/20170803/xtsy_48.jpg" width="25" height="414" alt="夏季新品"></td>
#    <td><a href="http://catalog.vancl.com/xxjy1.html" target="_blank" class="track" name="hp-hp-xptj-3_2-v:n"><img src="http://i3.vanclimg.com/cms/20170803/xtsy_49.jpg" width="272" height="414" alt="薛继业 果儿"></a></td>
#    <td><img src="http://i3.vanclimg.com/cms/20170803/xtsy_50.jpg" width="24" height="414" alt="夏季新品"></td>
#    <td><a href="http://catalog.vancl.com/xhxm.html" target="_blank" class="track" name="hp-hp-xptj-3_3-v:n"><img src="http://i3.vanclimg.com/cms/20170803/xtsy_51.jpg" width="272" height="414" alt="好小猫14"></a></td>
#    <td><img src="http://i3.vanclimg.com/cms/20170803/xtsy_52.jpg" width="25" height="414" alt="夏季新品"></td>
#    <td><a href="http://catalog.vancl.com/polo.html" target="_blank" class="track" name="hp-hp-xptj-3_4-v:n"><img src="http://i2.vanclimg.com/cms/20170803/2017_56.jpg" width="272" height="414" alt="polo"></a></td>
#    <td><img src="http://i3.vanclimg.com/cms/20170803/xtsy_54.jpg" width="19" height="414" alt="夏季新品"></td>
#  </tr>
#</table>
#'
#"""

def p(i):
    print "[x]", i


def s(i, j):
    i = i*(10**j)
    p(i)
    time.sleep(i)


def base_table_format(*ldata):
    ldata = ldata[0][0]
    for i in ldata:
        pass
#       print i, type(i), len(ldata)
#       pass # pass # printldata, type(ldata)
    ut.prt(ldata[0])
    ut.prt(ldata)
    ut.prts("==========")
    return ldata

@main.after_app_request
def after_request(response):
    for query in get_debug_queries():
        if query.duration >= current_app.config['FLASKY_SLOW_DB_QUERY_TIME']:
            current_current_app.logger.warning(
                'Slow query: %s\nParameters: %s\nDuration: %fs\nContext: %s\n'
                % (query.statement, query.parameters, query.duration,
                   query.context))
    return response

@main.route('/shutdown')
def server_shutdown():
    if not current_app.testing:
        abort(404)
    shutdown = request.environ.get('werkzeug.server.shutdown')
    if not shutdown:
        abort(500)
    shutdown()
    return 'Shutting down...'
    
def sortData(alldata):
    lbasecount=0
    allst =[]
    list=[]
    for i in alldata:
        i = i.__dict__
        list.append(i['href_url'])
        list.append(lbasecount)
        list.append(i['img_url'])
        lbasecount+=1
        if lbasecount%4==0:
            allst.append(list)
            list=[]
            ut.prt([allst])
            if lbasecount>32:
                lbasecount = 0
                return allst    
    
def sortPicDat(alldata):
    alldata=list(alldata)
    lbasecount=0
    allst =[]
    for i in alldata:
        i = i.__dict__
        allst.append(i['img_url'])
        lbasecount+=1
        if lbasecount>current_app.config['PICNUM']:
            lbasecount = 0
            return allst    

def data2Pic_9Tb():
    TABLENUM = current_app.config['TABLENUM']
    alldata = HostPageTable.query.all()
#    pass # printalldata
#    pass # pass # printalldata.__dict__
    formatData = sortData(alldata)
    tablelist = []
    for i in range(TABLENUM):
        idata = formatData#[i]
        ut.prt(["getDbData" ,idata])
        tb_html = base_table_format(idata)
        tablelist.append(tb_html)
    return tablelist

def format_one_table(*para):
    for cell in idata:
        baseTable
    pass
    
def make_pic():
    pass
    return data2Pic_9Tb()

def getPic():
    PICNUM = current_app.config['PICNUM']
    alldata = Pict.query.all()
    pass # pass # printalldata
    formatData = sortPicDat(alldata)
    pass # pass # printformatData
    return formatData

'''
def sqlTargetSwitch(argument, search):
    pass  #print"[x] content_to_title", argument
    switcher = {
        "goods": sqlGoodsSearchSwitch,
        "huodong": sqlHuodongSearchSwitch,
    }
    func = switcher.get(argument, lambda: "nothing")
    return func(search)
'''  
    
'''''
is a array[][] every line contains 4 goods and in a array[]
'''
def get_goods_dat():
    engine=sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    Session=scoped_session(sessionmaker(bind=engine))
    sess=Session()
    PICNUM = current_app.config['GOODSNUM']
    CMD=u'SELECT couponlink, img, name, price, idlink,code FROM goods ORDER BY soldpermonth DESC'
    #CMD=u'SELECT couponlink, img, name, price, couponvalue FROM goods ORDER BY soldpermonth DESC LIMIT %d' % PICNUM
    result = sess.execute(CMD)
    max=result.cursor._rows
    count=0
    goodsData=[]
    totalGoods=[]
    for i in range(len(max)):
        item=list(max[i])
        item[2]=item[2].encode('utf-8')
        item[4]=item[4].encode('utf-8')
        item[5]=item[5].encode('utf-8')
        if item[0]=="":
            item[0] = item[4]
        for j in item:
            goodsData.append(j)
            count+=1
            if count%6==0:
                totalGoods.append(goodsData)
                goodsData=[]
    return totalGoods
    
def sortGoodsdat(inputData):
    outputList=[]
    for i in range(len(inputData)):
        data=list(inputData[i])
        for j in data:
            try:
                j=j.encode('utf-8')
            except Exception, e:
                logging.exception(e)
                pass
        outputList.append(i)
    pass # pass # printoutputList
    return outputList
    
def get_huodong_dat():
    engine = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    Session = scoped_session(sessionmaker(bind=engine))
    sess = Session()
    PICNUM = current_app.config['HUODONGNUM']
    CMD = u'SELECT idlink,img,name FROM goods ORDER BY rate DESC LIMIT %d;' % PICNUM
    result = sess.execute(CMD)
    max=result.cursor._rows
    huodongData=[]
    for i in range(0,len(max)):
      item=list(max[i])
      item[2]=item[2].encode('utf-8')
      huodongData.append(item)
      pass # pass # printitem[2]
    return huodongData
        


def sortGoodsDat(alldata):
    count=0# per good click 1
    rowcol=[]# total 4*9
    row=[]#4 goods
    for i in alldata:
        i = i.__dict__
        row.append(i['link'])
        row.append(i['name'])
        row.append(i['img'])
        row.append(i['name'].encode('utf-8'))
        count+=1
        if count%4==0:
            rowcol.append(row)
            row=[]
#            ut.prt([rowcol])
            if count>36:
                count = 0
                return rowcol    
    pass
  
@main.route('/test', methods=['GET', 'POST'])
def testpage():
    func = request.args.get('fun', 'test', type=str)
    pass # pass # printfunc
    return switch(func)
    
def __testpagemode():
    pass # pass # print"<div><h1>HELLO, THIS IS TEST PAGE. BE PATIENT PLEASE.</h1></div>"
    return "<div><h1>HELLO, THIS IS TEST PAGE. BE PATIENT PLEASE.</h1></div>"
      
def __huodongdate():
    engine = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    Session = scoped_session(sessionmaker(bind=engine))
    sess = Session()
    PICNUM = current_app.config['HUODONGNUM']
    CMD = u'SELECT link,img,name FROM goods ORDER BY soldpermonth DESC LIMIT %d;' % PICNUM
    result = sess.execute(CMD)
#    pass # pass # printresult 
    max=result.cursor._rows
#    pass # pass # printmax
    count=0
    huodongData={}
    for i in range(0,len(max)):
      baseitem=list(max[i])
#      pass # pass # printbaseitem[2].encode('utf-8')
      item=baseitem[2].encode('utf-8')
#      pass # pass # printitem
      huodongData[count]=item
      count+=1
#      item=baseitem[2].encode('ascii')
#      pass # pass # printitem
#      huodongData[count]=item
#      count+=1
#      item=baseitem[2].encode('GBK')
      #print item
#      huodongData[count]=item
#      count+=1
      #print huodongData
    data=huodongData
    ata=json.dumps(huodongData)
    
    return "<meta http-equiv=\"Content-Type\" content=\"text/json; charset=utf-8\" />\
            <div>\
            <form enctype='application/json'>\
            <input name='name' value='Bender'>\
            <select name='hind'>\
            <option selected>Bitable</option>\
            <option>Kickable</option>\
            </select>\
            <input type='checkbox' name='shiny' checked>\
            </form>\
            <h>%s</h>\
            </div>\
            "%ata

def __huodongdateone():
    engine = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    Session = scoped_session(sessionmaker(bind=engine))
    sess = Session()
    PICNUM = current_app.config['HUODONGNUM']
    CMD = u'SELECT link,img,name FROM goods ORDER BY rate DESC LIMIT %d;' % PICNUM
    result = sess.execute(CMD)
#    pass # pass # printresult 
    max=result.cursor._rows
#    pass # pass # printmax
    count=0
    huodongData={}
    for i in range(0,len(max)):
      baseitem=list(max[i])
#      pass # pass # printbaseitem[2].encode('utf-8')
      item=baseitem[2]#.encode('utf-8')
#      pass # pass # printitem
      huodongData[count]=item
      count+=1
#      item=baseitem[2].encode('ascii')
#      pass # pass # printitem
#      huodongData[count]=item
#      count+=1
#      item=baseitem[2].encode('GBK')
      #print item
#      huodongData[count]=item
#      count+=1
#      pass # pass # printhuodongData
    return render_template('testmode.html', data=json.dumps(huodongData))
    
'''''
'''

def switch(argument):
    pass  #print"[x] content_to_title", argument
    switcher = {
        1: "<h1>1</h1>",
        2: lambda: "<h1>two</h1>",
        "test": __testpagemode,
        "huodongall": __huodongdate,
        "huodongone": __huodongdateone,
    }
    pass # pass # printargument
    func = switcher.get(argument, lambda: "nothing")
    return func()
      

    
'''''
ATTENTION!!!
most important cause this is the entrence of hostpage of mall by qq  
'''
@main.route('/m', methods=['GET', 'POST'])
def mb():
    ''''' postdata is html style use direct by qq
    '''
    huodongData=get_huodong_dat()
    goodsData=get_goods_dat()
    datas = goodsData
#    postdata=make_pic()
    views=getPic()
    return render_template('vanke_chengpin_bootstrap.html', pics=views, datas=datas,huodong=huodongData, dev="m")

    
'''''
ATTENTION!!!
most important cause this is the entrence of hostpage of mall by qq  
'''
def subString(m):
    m=re.sub('\'','"',m)
    m=re.sub('\'','"',m)
    m=re.sub('\'','"',m)
    return m 
    
# get goods Data which is show as 4 by 9, 36 total product
def handle_search(search):
    # that's how v search
    # get all the matched word to product name
    # get the join of the every matchde product name belong to word
    # sort the word in join table with the num of word appeared
    # qin
    if search=="null":
        return []
    engine=sqlalchemy.create_engine('mysql://root:root@localhost:3306/ultrax?charset=utf8')
    #Config.SQLALCHEMY_DATABASE_URI)
    Session=scoped_session(sessionmaker(bind=engine))
    sess=Session()
    CMD=u'SELECT code,name FROM goods' # [0,1]=[code,name]
    sqlData = sess.execute(CMD)
    sqlData = sqlData.cursor._rows
    sqlData = list(sqlData)

    # make a dict to count
    codeDict = {}
    for i in sqlData:
        codeDict[i[0]] = 0
        #print codeDict[i[0]]

    # handle the customer input to pick tf-itf 'important' word
    wordsList = jieba.analyse.extract_tags(search,20)
    count=0
    for searchword in wordsList:
        for item in sqlData:
            count+=1
            itemList = jieba.analyse.extract_tags(item[1],20)
            pass # printsearchword.encode('utf-8') ,"$$", item[1].encode('utf-8')
            if searchword in itemList: # means the search word is in the prod's name
                codeDict[item[0]]+=self.getScore(count)
    for i in codeDict:
       pass # print'[x] sort ',i,":",codeDict[i]
    BigendingDict = sorted(codeDict.items(), key=lambda d:d[1], reverse = True)
    if len(BigendingDict)==0:
        return []        
    finalOutput = []
    counter = 0
    lineOutput = []    
    for i in BigendingDict:
        counter+=1
        CMD='SELECT couponlink, soldpermonth, img, name, idlink, code FROM goods WHERE code="%s"' % i[0]
        sqlData = sess.execute(CMD)
        sqlData = list(sqlData.cursor._rows[0])
        sqlData[0] = sqlData[0].encode('utf-8')
        sqlData[2] = sqlData[2].encode('utf-8')
        sqlData[3] = sqlData[3].encode('utf-8')
        sqlData[4] = sqlData[4].encode('utf-8')
        sqlData[5] = sqlData[5].encode('utf-8')
        if sqlData[0] == "":
            print "[x]", "couponlink is null, turn to idlink;"
            sqlData[0] = sqlData[4]
        lineOutput.append(sqlData[0])
        lineOutput.append(sqlData[1])
        lineOutput.append(sqlData[2])
        lineOutput.append(sqlData[3])
        lineOutput.append(sqlData[5])
        if counter%4==0:
            finalOutput.append(lineOutput)
            #print '2  [x] ', len(lineOutput)
            lineOutput = []    
    #print '1  [x] ', len(finalOutput)
#    pass # printfinalOutput
    return finalOutput


def handle_search_api(search):
    from app import top_api
    if search=="null":
        return []
    res = top_api.DgItemCoupon(search)
    #p(res)
    return res


def handle_search_whoosh(search):
    # that's how v search
    # get all the matched word to product name
    # get the join of the every matchde product name belong to word
    # sort the word in join table with the num of word appeared
    # qin

#    ('User-Agent', u'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36')
#    ('Referer', u'http://118.89.184.71/?keyWord=%E8%80%B3%E6%9C%BA&guid=69a587ee3ad248498ca0bfa9ee0666a7')
#    ('Host', u'118.89.184.71')
    
    if search=="null":
        return []
    pass # printsearch
    wsSearch = globalvar.get_whoosh()
    searchList = jieba.cut_for_search(search)
    search = " ".join(searchList)
    output = []

    pass# print search
    search_result = wsSearch.search("indexer", u"content", search,  output)
    pass# print search_result
    for i in search_result:
        pass# print i 
    engine=sqlalchemy.create_engine('mysql://root:root@localhost:3306/ultrax?charset=utf8')
    #Config.SQLALCHEMY_DATABASE_URI)
    Session=scoped_session(sessionmaker(bind=engine))
    sess=Session()
    finalOutput = []
    counter=0
    for i in search_result:
        pass # printi 
        lineOutput = []
        counter+=1
        pass # printi['path']
        pass # printtype(i['path'])
        CMD = u'SELECT DISTINCT couponlink, img, name , price, idlink, code FROM goods WHERE code="%s" ORDER BY rate DESC ' % i['path']
        sqlData = sess.execute(CMD)
        sqlData = sqlData.cursor._rows
        #print sqlData
        sqlData = list(sqlData)
        sqlData = list(sqlData[0])# change tuple to list (()) ==> []
        # add for replace the couponlink to idlink, for sth no coupon
        print sqlData[1]
        print "sqlData"
        if sqlData[0] == "":
            pass# print "[x]", "couponlink is null, turn to idlink;"
            sqlData[0] = sqlData[4]
        sqlData[5] = sqlData[5].encode('utf-8')
        sqlData[2] = sqlData[2].encode('utf-8')
        sqlData[0] = sqlData[0].encode('utf-8')

        lineOutput.append(sqlData[0])
        lineOutput.append(sqlData[1])
        lineOutput.append(sqlData[2])
        lineOutput.append(sqlData[3])
        lineOutput.append(sqlData[4])
        lineOutput.append(sqlData[5])

        #if counter%5==0:
        finalOutput.append(lineOutput)
            #print '2  [x] ', len(lineOutput)
    return finalOutput


@main.route('/9tb', methods=['GET', 'POST'])
def tb9():
    data = request.args.get('data')
    current_app.logger.info(data)
    pass # print'[x]', '3 return tb9'
    return render_template('9tb.html', data=data)

    
@main.route('/search', methods=['GET', 'POST'])
def search():
    searchInput = ""
    searchInput = request.args.get("search")
    searchInput = urllib.unquote(searchInput) 
    datas = handle_search_api(searchInput)
    return render_template('meguo_phone.html', datas=datas, dev='p')


@main.route('/local_search', methods=['GET', 'POST'])
def local_search():
    searchInput = ""
    #if request.method == 'POST':
        #searchInput = request.form.get('search', 'null', type=str)
    #else:
    searchInput = request.args.get("search")
    searchInput = urllib.unquote(searchInput) 

    
#    assert type(searchInput) == unicode
        
    pass # print'[x]', '1',searchInput
    
    datas = handle_search(searchInput)
#    pass # print'[x]', '2',searchData
    
#    jsonData = {}
#    jsonData['searchData']=searchData
#    pass # print'[x]', '3',jsonData

#    jsonData = json.dumps(jsonData)
#    tm = render_template('9tb.html', datas=searchData, dev='p')
#    tm = tm.encode('utf-8')
#    pass # printtm
    return render_template('9tb.html', datas=datas, dev='p')
#    pass # printjsonData[0]
#    return jsonData
    
'''
@main.route('/', methods=['GET', 'POST'])
def crawl():
    # postdata is html style use direct by qq
        
    searchInput = request.args.get('KeyWord', 'null', type=str)
    searchData = handle_search(searchInput)
    goodsData = get_goods_dat()
    datas = goodsData

#    postdata=make_pic()
    huodongData = get_huodong_dat()
    views=getPic()
    
    return render_template('vanke_chengpin_bootstrap.html', pics=views, datas=datas, huodong=huodongData, dev="p")
    
'''

def resub(input):
    input = re.sub("['{','}',',','\"','/']","",input)
    return input

@main.route('/mgrbench', methods=['GET', 'POST'])
def mgrbench():
    #print "mgrbench()"
    with open("/var/www/chmall/log/tmplog.txt", "r") as logtxt:
         #   print "mgrbench() 2"
        datas = logtxt.readlines()
        resultlist = []
        keyslist = ["Accept-Language","Accept-Encoding","X-Forwarded-For","Connection","Accept","User-Agent","Host","X-Requested-With","clkid","Referer","time","Cookie"]
        print datas
        for i in datas:
            print i
            i = re.sub("^ *$", "", i)
            i = re.sub("http://", "", i)
            i = re.sub("https://", "", i)
            ilist = i.split("\n")
            print ilist
            for j in ilist:
                print j
                outputDatas = {}
                iitem = j.split("\", \"")
                print iitem
                for kv in iitem:
                    print kv
                    kvpair = kv.split(": ")
                    try:
                        k = resub(kvpair[0])
                        v = resub(kvpair[1])
                        print k
                        print v
                        outputDatas[k] = v
                    except IndexError, e:
                        pass
                        print e 
                resultlist.append(outputDatas)
        return render_template('mgrbench.html', datas=resultlist, keyslist=keyslist)


@main.route('/clkcnt', methods=['GET', 'POST'])
def clkcnt():
    from app import top_api
    current_app.logger.info(str(request))
    dataformat = {}
    for i in request.headers:
        dataformat[i[0]] = i[1]
    current_app.logger.info('[x] clkcnt')
#    ('User-Agent', u'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36')
#    ('Referer', u'http://118.89.184.71/?keyWord=%E8%80%B3%E6%9C%BA&guid=69a587ee3ad248498ca0bfa9ee0666a7')
#    ('Host', u'118.89.184.71')
    dataformat["clkid"] = request.args.get("clkid", "null")
    mylink = request.args.get("link", "null")
    p('mylink')
    p(mylink)
    logtools.sav_log(json.dumps(dataformat))
    res = top_api.TbkSpreadGetRequest(mylink)
    p(res)
    redirect_link = res['tbk_spread_get_response']['results']['tbk_spread'][0]['content']
    p("redirect_link 1")
    p(redirect_link)
    response = {}
    response['dat'] = 'OK'
    response['redirect_url'] = redirect_link
    p("IMPORTAMT!!! response['redirect_url']")
    p(response['redirect_url'])
    return json.dumps(response)


@main.route('/bdunion', methods=['GET', 'POST'])
def bdunion():
    return render_template('meguo_phone.html')

@main.route('/api', methods=['GET', 'POST'])
def get_api():
    p("get_api")
    current_app.logger.info('get_api()')
    searchInput = request.args.get('keyWord', u"长虹电视")
    #print searchInput
    api = handle_search_api(searchInput)
    totalst = []
    for i in api:
        itemlst = []
        itemlst.append(i[u'coupon_click_url'])
        itemlst.append(i[u'pict_url'])
        itemlst.append(0)
        itemlst.append(0)
        itemlst.append(0)
        itemlst.append(i[u'num_iid'])

        totalst.append(itemlst)
        # comment[0] couponlink
        # comment[1] img_link
        # comment[2] 0
        # comment[3] 0
        # comment[4] 0
        # comment[5] numiid
    return render_template('meguo_phone.html', datas=totalst, dev="p")

@main.route('/linkchange', methods=['GET', 'POST'])
def linkchange():
    from app import top_api
    current_app.logger.info('link_change()')
    searchInput = request.args.get('link', )
    if searchInput == u"0":
        return None
    res = top_api.TbkSpreadGetRequest(searchInput)
    #res = top_api.TbkSpreadGetRequest(searchInput.encode('utf8'))
    p(searchInput)
    p(res)
    redirect_link = res['tbk_spread_get_response']['results']['tbk_spread'][0]['content']
    p("redirect_link")
    p(redirect_link)
    return redirect(url_for(redirect_link))

@main.route('/finalink', methods=['GET', 'POST'])
def finalink():
    from app import top_api
    current_app.logger.info(str(request))
    dataformat = {}
    for i in request.headers:
        dataformat[i[0]] = i[1]
    dataformat["link"] = request.args.get("link", "null")
    current_app.logger.info(str(dataformat["link"]))
    res = top_api.TbkSpreadGetRequest(dataformat["link"])
    redirect_link = res['tbk_spread_get_response']['results']['tbk_spread'][0]['content']
    current_app.logger.info(str(redirect_link))
    return redirect(redirect_link)

@main.route('/', methods=['GET', 'POST'])
def crawl():
    from app import top_api
    p("get_api")
    current_app.logger.info('get_api()')
    searchInput = request.args.get('keyWord', u"长虹电视")
    #print searchInput
    api = handle_search_api(searchInput)
    totalst = []
    for i in api:
        itemlst = []
        #itemlst.append(i[u'item_url'])
        # coupon_click_url = i[u'coupon_click_url']
        # res = top_api.TbkSpreadGetRequest(coupon_click_url)
        # redirect_link = res['tbk_spread_get_response']['results']['tbk_spread'][0]['content']
        itemlst.append(i[u'coupon_click_url'])
        itemlst.append(i[u'pict_url'])
        itemlst.append(0)
        itemlst.append(0)
        itemlst.append(0)
        itemlst.append(i[u'num_iid'])

        totalst.append(itemlst)
        # comment[0] couponlink
        # comment[1] img_link
        # comment[2] 0
        # comment[3] 0
        # comment[4] 0
        # comment[5] numiid
    return render_template('meguo_phone.html', datas=totalst, dev="p")

'''
@main.route('/', methods=['GET', 'POST'])
def crawl(): 
   
    current_app.logger.info('crawl')
    pass# print request
    for i in request.args:
        pass# print i
        pass# print request.args[i]
    searchInput = request.args.get('keyWord', 'null')

    if searchInput == u"膜":
        searchInput = u"贴膜"
    elif searchInput == u"包":
        searchInput = u"手机包"
        
    pass # printsearchInput
    goodsData = []
    if searchInput == "null":
        goodsData = get_goods_dat()
    else:
        goodsData = handle_search_api(searchInput)
        if len(goodsData)==0:
             goodsData = []
    pass # print"[x] show  goodsData" , goodsData
    datas = goodsData
    huodongData = get_huodong_dat()
    views=getPic()
    return render_template('meguo_phone.html', pics=views, datas=datas, huodong=huodongData, dev="p")
'''
       
@main.route('/craw', methods=['GET', 'POST'])
def index():
    form = PostForm()
    if current_user.can(Permission.WRITE_ARTICLES) and \
            form.validate_on_submit():
        post = Post(body=form.body.data,
                    author=current_user._get_current_object())
        db.session.add(post)
        return redirect(url_for('.index'))
    page = request.args.get('page', 1, type=int)
    show_followed = False
    if current_user.is_authenticated:
        show_followed = bool(request.cookies.get('show_followed', ''))
    if show_followed:
        query = current_user.followed_posts
    else:
        query = Post.query
    pagination = query.order_by(Post.timestamp.desc()).paginate(
        page, per_page=current_app.config['FLASKY_POSTS_PER_PAGE'],
        error_out=False)
    posts = pagination.items
    return render_template('index.html', form=form, posts=posts,
                           show_followed=show_followed, pagination=pagination)


@main.route('/user/<username>')
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    page = request.args.get('page', 1, type=int)
    pagination = user.posts.order_by(Post.timestamp.desc()).paginate(
        page, per_page=current_app.config['FLASKY_POSTS_PER_PAGE'],
        error_out=False)
    posts = pagination.items
    return render_template('user.html', user=user, posts=posts, pagination=pagination)
                           
@main.route("/baidupic", methods=['GET'])
def baidupic():
    col = request.args.get('col', '壁纸', type=str)
    tag = request.args.get('tag', '国家地理', type=str)
    pass # pass # printcol
    pass # pass # printtag
    piclist={}
    count=0
    target=[count,piclist]
    res=craw_baidu_pic(col,tag)
    res=json.loads(res)
    res=res['imgs']
    for i in res:
        '''
        try:
            target=savePic(target,i['thumbnailUrl'])
        except:
            logging.exception(e)
            pass
        try:
	        target=savePic(target,i['imageUrl'])
        except:
            logging.exception(e)
            pass
        try:
	        target=savePic(target,i['thumbLargeTnUrl'])
        except:
            logging.exception(e)
            pass
        '''
        try:
	        target=savePic(target,i['downloadUrl'])
        except:
            logging.exception(e)
            pass
    sav2DB(target[1])
    pass # pass # printjson.dumps(target[1])
    return json.dumps(target[1])

def sav2DB(items):
    engine = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)
    Session = scoped_session(sessionmaker(bind=engine))
    s = Session()
    CMD = u'SELECT MAX(id) FROM pict;'
    result = s.execute(CMD)
    max=result.cursor._rows[0][0]
    pass # pass # printtype(items)
    count=max+1
    for i in items:
        try:
	        count+=1
	        ID = count
	        IMG_URL = items[i]
	        NAME = i
	        TIMES = str(list(time.localtime()))
	        CMD = u'INSERT INTO pict VALUES(%d, "%s", "%s", "%s")' %(ID, IMG_URL, NAME, TIMES)
	        result = s.execute(CMD)
        except:
            logging.exception(e)
            traceback.print_exc()
            pass # pass # printi 
            continue

@main.route('/bdunion.txt', methods=['GET'])
def bdunionttx():
    url = os.path.join("/var/www/chmall/app/static", "bdunion.txt")
    print url
    cont = open(url, "r")
    conts = cont.readlines()[0]
    print conts
    return conts
    #return main.send_file('bdunion.txt')

@main.route('/root.txt', methods=['GET'])
def roottxt():
    url = os.path.join("/var/www/chmall/app/static", "root.txt")
    print url
    cont = open(url, "r")
    conts = cont.readlines()[0]
    print conts
    return conts
    #return main.send_file('bdunion.txt')

@main.route('/robots.txt', methods=['GET'])
def robotstxt():
    url = os.path.join("/var/www/chmall/app/static", "robots.txt")
    print url
    cont = open(url, "r")
    conts = cont.readlines()[0]
    print conts
    return conts
    #return main.send_file('bdunion.txt')

def savePic(tar, urlpath):
    try:
        name='pic_'+str(tar[0])
        tar[1][name]=urlpath
        tar[0]+=1
        pass # pass # printtar[0]
        return tar
    except:
        logging.exception(e)
#        traceback.print_exc()
        pass # pass # printtar[0]
        return tar
        
def crawl_data(col='手机',tag='长虹'):
    craw_baidu_pic(col,tag)
    craw_taobao_api()
    pass
#    insert2Db9Table()

def craw_taobao_api():
    pass
    
def craw_baidu_pic(col='手机',tag='长虹'):
    ut.prt(["[x] craw_baidu_pic"])
#    col = quote(col)
#    tag = quote(tag)
    baseurl='http://image.baidu.com/data/imgs?col=%s&tag=%s&sort=0&pn=0&rn=100&p=channel&from=1'%(col,tag)
    textmod = baseurl
    req = urllib2.Request(textmod)
    res = urllib2.urlopen(req)
    res = res.read()
    ut.prt([type(res)])
    return res


@main.route('/edit-profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = EditProfileForm()
    if form.validate_on_submit():
        current_user.name = form.name.data
        current_user.location = form.location.data
        current_user.about_me = form.about_me.data
        db.session.add(current_user)
        flash('Your profile has been updated.')
        return redirect(url_for('.user', username=current_user.username))
    form.name.data = current_user.name
    form.location.data = current_user.location
    form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', form=form)


@main.route('/edit-profile/<int:id>', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_profile_admin(id):
    user = User.query.get_or_404(id)
    form = EditProfileAdminForm(user=user)
    if form.validate_on_submit():
        user.email = form.email.data
        user.username = form.username.data
        user.confirmed = form.confirmed.data
        user.role = Role.query.get(form.role.data)
        user.name = form.name.data
        user.location = form.location.data
        user.about_me = form.about_me.data
        db.session.add(user)
        flash('The profile has been updated.')
        return redirect(url_for('.user', username=user.username))
    form.email.data = user.email
    form.username.data = user.username
    form.confirmed.data = user.confirmed
    form.role.data = user.role_id
    form.name.data = user.name
    form.location.data = user.location
    form.about_me.data = user.about_me
    return render_template('edit_profile.html', form=form, user=user)


@main.route('/post/<int:id>', methods=['GET', 'POST'])
def post(id):
    post = Post.query.get_or_404(id)
    form = CommentForm()
    if form.validate_on_submit():
        comment = Comment(body=form.body.data,
                          post=post,
                          author=current_user._get_current_object())
        db.session.add(comment)
        flash('Your comment has been published.')
        return redirect(url_for('.post', id=post.id, page=-1))
    page = request.args.get('page', 1, type=int)
    if page == -1:
        page = (post.comments.count() - 1) // \
            current_app.config['FLASKY_COMMENTS_PER_PAGE'] + 1
    pagination = post.comments.order_by(Comment.timestamp.asc()).paginate(
        page, per_page=current_app.config['FLASKY_COMMENTS_PER_PAGE'],
        error_out=False)
    comments = pagination.items
    return render_template('post.html', posts=[post], form=form,
                           comments=comments, pagination=pagination)


@main.route('/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit(id):
    post = Post.query.get_or_404(id)
    if current_user != post.author and \
            not current_user.can(Permission.ADMINISTER):
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        post.body = form.body.data
        db.session.add(post)
        flash('The post has been updated.')
        return redirect(url_for('.post', id=post.id))
    form.body.data = post.body
    return render_template('edit_post.html', form=form)


@main.route('/follow/<username>')
@login_required
@permission_required(Permission.FOLLOW)
def follow(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('Invalid user.')
        return redirect(url_for('.index'))
    if current_user.is_following(user):
        flash('You are already following this user.')
        return redirect(url_for('.user', username=username))
    current_user.follow(user)
    flash('You are now following %s.' % username)
    return redirect(url_for('.user', username=username))


@main.route('/unfollow/<username>')
@login_required
@permission_required(Permission.FOLLOW)
def unfollow(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('Invalid user.')
        return redirect(url_for('.index'))
    if not current_user.is_following(user):
        flash('You are not following this user.')
        return redirect(url_for('.user', username=username))
    current_user.unfollow(user)
    flash('You are not following %s anymore.' % username)
    return redirect(url_for('.user', username=username))


@main.route('/followers/<username>')
def followers(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('Invalid user.')
        return redirect(url_for('.index'))
    page = request.args.get('page', 1, type=int)
    pagination = user.followers.paginate(
        page, per_page=current_app.config['FLASKY_FOLLOWERS_PER_PAGE'],
        error_out=False)
    follows = [{'user': item.follower, 'timestamp': item.timestamp}
               for item in pagination.items]
    return render_template('followers.html', user=user, title="Followers of",
                           endpoint='.followers', pagination=pagination,
                           follows=follows)


@main.route('/followed-by/<username>')
def followed_by(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('Invalid user.')
        return redirect(url_for('.index'))
    page = request.args.get('page', 1, type=int)
    pagination = user.followed.paginate(
        page, per_page=current_app.config['FLASKY_FOLLOWERS_PER_PAGE'],
        error_out=False)
    follows = [{'user': item.followed, 'timestamp': item.timestamp}
               for item in pagination.items]
    return render_template('followers.html', user=user, title="Followed by",
                           endpoint='.followed_by', pagination=pagination,
                           follows=follows)


@main.route('/all')
@login_required
def show_all():
    resp = make_response(redirect(url_for('.index')))
    resp.set_cookie('show_followed', '', max_age=30*24*60*60)
    return resp


@main.route('/followed')
@login_required
def show_followed():
    resp = make_response(redirect(url_for('.index')))
    resp.set_cookie('show_followed', '1', max_age=30*24*60*60)
    return resp


@main.route('/moderate')
@login_required
@permission_required(Permission.MODERATE_COMMENTS)
def moderate():
    page = request.args.get('page', 1, type=int)
    pagination = Comment.query.order_by(Comment.timestamp.desc()).paginate(
        page, per_page=current_app.config['FLASKY_COMMENTS_PER_PAGE'],
        error_out=False)
    comments = pagination.items
    return render_template('moderate.html', comments=comments,
                           pagination=pagination, page=page)


@main.route('/moderate/enable/<int:id>')
@login_required
@permission_required(Permission.MODERATE_COMMENTS)
def moderate_enable(id):
    comment = Comment.query.get_or_404(id)
    comment.disabled = False
    db.session.add(comment)
    return redirect(url_for('.moderate',
                            page=request.args.get('page', 1, type=int)))


@main.route('/moderate/disable/<int:id>')
@login_required
@permission_required(Permission.MODERATE_COMMENTS)
def moderate_disable(id):
    comment = Comment.query.get_or_404(id)
    comment.disabled = True
    db.session.add(comment)
    return redirect(url_for('.moderate',
                            page=request.args.get('page', 1, type=int)))
if __name__=='__main__':
    pass
    engine = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI,)
    Session = scoped_session(sessionmaker(bind=engine))
    sess = Session()
    PICNUM = current_app.config['HUODONGNUM']
    CMD = u'SELECT link,img,name FROM goods ORDER BY rate DESC LIMIT %d;' % PICNUM
    result = sess.execute(CMD)
    max=result.cursor._rows
    huodongData=[]
    for i in range(0,len(max)):
      item=list(max[i])
      item[2]=item[2].encode('utf-8')
      pass # pass # printitem[2]
      huodongData.append(item)

      
      
