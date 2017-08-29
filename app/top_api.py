#!/usr/bin/envpython
#-*-coding:utf-8-*-
#@Date:2017-08-2502:23:02
#@Author:qin_hai_ning(haining.qin@changhong.com)
#@Link:https://www.triboys.com/
#@Version:$Id$

'''
# keyval
'''

import sys
import time
import os
reload(sys)
sys.setdefaultencoding("utf-8")
sys.path.append("..")
import chardet
import xlrd
import MySQLdb
import time
import traceback
import sys
import config 
from config import Config
from config import config

import app
import time
import top
from app import top
from top import api
print top.__path__

from mylog import logtools
import sqlalchemy
from sqlalchemy.orm import sessionmaker, scoped_session

import re 

url = "gw.api.taobao.com"
port = 80
appkey = os.environ.get('TOP_API_KEY')
secret = os.environ.get('TOP_SECRET')
adzone_id_my = 128366033
query_words = [u"手机配件", u"摄像头", u"手机挂绳", u"手机壳", u"耳机",
    u"蓝牙音箱", u"手机贴膜", u"手机软件", u'女装', u'長虹', u'长虹']


def p(i):
	print "[x]", i


def s(i, j):
	i = i*(10**j)
	p(i)
	time.sleep(i)


def goods_query():
	req = top.api.TbkItemGetRequest("gw.api.taobao.com", 80)
	info = top.appinfo(os.environ.get('TOP_API_KEY'),
	                   os.environ.get("TOP_SECRET"))
	req.set_app_info(info)
	req.fields = "num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick"
	req.q = "音箱"
	req.cat = "16,18"
	req.itemloc = "杭州"
	req.sort = "tk_rate_des"
#	req.is_tmall = False
#	req.is_overseas = False
	req.start_price = 0
	req.end_price = 10000
	req.start_tk_rate = 9999
	req.end_tk_rate = 0001
	req.platform = 1
	req.page_no = 0
	req.page_size = 20
	resp = req.getResponse()


def TbkItemConvert():
	req = top.api.TbkItemConvertRequest(url, port)
	req.set_app_info(top.appinfo(appkey, secret))
	req.fields = "num_iid,click_url"
	req.num_iids = "123,456"
	req.adzone_id = adzone_id_my
	req.platform = 1
	req.unid = ""
	resp = req.getResponse()


def recommend_goods():
	req = top.api.TbkItemRecommendGetRequest(url, port)
	req.set_app_info(top.appinfo(os.environ.get(
	    "TOP_API_KEY"), os.environ.get("TOP_SECRET")))

	req.fields = "num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url"
	req.num_iid = 123
	req.count = 20
	req.platform = 1
	resp = req.getResponse()


def item_info():
	req = top.api.TbkItemInfoGetRequest(url, port)
	req.set_app_info(top.appinfo(os.environ.get(
	    "TOP_API_KEY"), os.environ.get("TOP_SECRET")))

	req.fields = "num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url"
	req.platform = 1
	req.num_iids = "123,456"
	resp = req.getResponse()


def shops():
	req = top.api.TbkShopGetRequest(url, port)
	req.set_app_info(top.appinfo(os.environ.get(
	    "TOP_API_KEY"), os.environ.get("TOP_SECRET")))
	req.fields = "user_id,shop_title,shop_type,seller_nick,pict_url,shop_url"
	req.q = "女装"
	req.sort = "commission_rate_des"
#	req.is_tmall = False
	req.start_credit = 1
	req.end_credit = 20
	req.start_commission_rate = 2000
	req.end_commission_rate = 123
	req.start_total_action = 1
	req.end_total_action = 100
	req.start_auction_count = 123
	req.end_auction_count = 200
	req.platform = 1
	req.page_no = 1
	req.page_size = 20
	resp = req.getResponse()


def TbkUatmEvent():
	req = top.api.TbkUatmEventGetRequest("gw.api.taobao.com", 80)
	req.set_app_info(top.appinfo(os.environ.get(
	    "TOP_API_KEY"), os.environ.get("TOP_SECRET")))

	req.page_no = 1
	req.page_size = 20
	req.fields = "event_id,event_title,start_time,end_time"
	resp = req.getResponse()


def UatmFavoritesItem():
	'''
	can not get the favorate_id
	'''
	req = top.api.TbkUatmFavoritesItemGetRequest("gw.api.taobao.com", 80)
	req.set_app_info(top.appinfo(os.environ.get(
	    "TOP_API_KEY"), os.environ.get("TOP_SECRET")))

	req.platform = 1
	req.page_size = 100
	req.adzone_id = adzone_id_my
	req.unid = "3456"
	req.favorites_id = 126181916
	req.page_no = 2
	req.fields = "num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick,shop_title,zk_final_price_wap,event_start_time,event_end_time,tk_rate,status,type"
	resp = req.getResponse()


def JuTqg():
	req = top.api.TbkJuTqgGetRequest("gw.api.taobao.com", 80)
	req.set_app_info(top.appinfo(os.environ.get(
	    "TOP_API_KEY"), os.environ.get("TOP_SECRET")))
	req.adzone_id = adzone_id_my
	req.fields = "click_url,pic_url,reserve_price,zk_final_price,total_amount,sold_num,title,category_name,start_time,end_time"
	req.start_time = "2016-08-09 09:00:00"
	req.end_time = "2016-08-09 16:00:00"
	req.page_no = 1
	req.page_size = 40
	resp = req.getResponse()


def DgItemCoupon(query=u"手机配件"):
	#p(query)
	#print top.__path__
	#print top.__dict__
	req = top.api.TbkDgItemCouponGetRequest("gw.api.taobao.com", 80)
	req.set_app_info(top.appinfo(os.environ.get("TOP_API_KEY"), os.environ.get("TOP_SECRET")))
	req.adzone_id = adzone_id_my
	req.platform = 1
	#	req.cat="16,18"
	req.page_size = 50
	req.q = query.encode('utf-8')
	req.page_no = 20
	#p(req)
	resp = req.getResponse()
	total_num = resp["tbk_dg_item_coupon_get_response"]["total_results"]
	total_coupon = resp["tbk_dg_item_coupon_get_response"]["results"]["tbk_coupon"]
	return total_coupon

	'''
	database = MySQLdb.connect(host="localhost", user="root", passwd="root", db="ultrax", charset="utf8")
	database.set_character_set('utf8')
	cursor = database.cursor()
	errornum = 0
	for i in total_coupon:
		try:
			resultsql = cursor.execute(insert_2_sql_coupon(obtain_sql_cmd(i)))
		except:
			traceback.print_exc()
			errornum += 1


	p(errornum)
	cursor.close()
	database.commit()
	database.close()
	'''

def obtain_sql_cmd(i):
	count = 0
	keys = []
	for j in i:
		item = uniall(i[j])
		keys.append(item)
	outstr = tuple(keys)
	return outstr


def uniall(inputdata):
	if isinstance(inputdata, str):
		type = chardet.detect(inputdata)['encoding']
		print 'decode', type, 'then encode utf8',
		inputdata = inputdata.decode(type)
		inputdata = inputdata.encode('utf-8')
	elif isinstance(inputdata, unicode):
		inputdata = inputdata.encode('utf-8')
	return inputdata

    # category=db.Column(db.Integer, index=True, unique=True)
    # coupon_click_url=db.Column(db.String(255))
    # coupon_info=db.Column(db.String(255))
    # item_url=db.Column(db.String(255))
    # zk_final_price=db.Column(db.String(255))

    # commission_rate=db.Column(db.String(255))
    # user_type=db.Column(db.Integer)
    # samll_images=db.Column(db.String(255))
    # title=db.Column(db.Float)
    # num_iid=db.Column(db.Integer)

    # seller_id=db.Column(db.Integer)
    # coupon_total_count=db.Column(db.Integer)
    # volumn=db.Column(db.Integer)
    # nick=db.Column(db.String(255))
    # pict_url=db.Column(db.String(255))

    # coupon_remain_count=db.Column(db.Integer)
    # coupon_start_time=db.Column(db.String(255))
    # shop_title=db.Column(db.Integer)
    # item_description=db.Column(db.String(255))
    # coupon_end_time=db.Column(db.String(255))


def insert_2_sql_coupon(sqlvalue):
	# 122684003,
	# https://uland.taobao.com/coupon/edetail?e=Piz5KBh2nE7sbecaumMgZB%2BbUzHBteKZ6PY46DJ9FdPxBHiNgEiquNc1AflyFY%2FBDsJhQnOc4V3zGa4TQrEANJO9mFcJtAqi%2BMUwzxYlSKGg%2B86A%2F1DMg2Ilx8TKraWzydjT%2B0BSJj0sw4gpEhKrLH%2Ftp4YtWGnI0rpOsI2ZoKDnbYfZPG6qkvSs4zOlZ4se&traceId=0ab3201d15037211919518990e,
	# 满10元减5元,
	# http://detail.tmall.com/item.htm?id=37176758682,
	# 14.90, #

	# 5.50,
	# 1,
	# {u'string': [u'http://img3.tbcdn.cn/tfscom/i3/928558228/TB2rDtkbAUOyuJjy1XdXXXlkXXa_!!928558228.jpg', u'http://img3.tbcdn.cn/tfscom/i1/928558228/TB2EAb_bXgkyKJjSspfXXcj1XXa_!!928558228.jpg', u'http://img2.tbcdn.cn/tfscom/i3/928558228/TB2qEQkbkZkyKJjy0FnXXXveFXa_!!928558228.jpg', u'http://img4.tbcdn.cn/tfscom/i4/928558228/TB27XgdblAkyKJjy0FeXXadhpXa_!!928558228.jpg']},
	# 酷改上管包山地车马鞍包前梁包骑行装备单车配件包手机包自行车包,
	# 37176758682,

	# 928558228,
	# 5000,
	# 9093,
	# coolchange运动旗舰店,
	# http://img4.tbcdn.cn/tfscom/i2/928558228/TB1okMrSpXXXXchXpXXXXXXXXXX_!!0-item_pic.jpg,

	# 4185,
	# 2017-08-21,
	# coolchange运动旗舰店,
	# 可触屏设计 大容量 耐磨面料,
	# 2017-08-28

	p(sqlvalue)
	import chardet
	print "START ==========="
	sqlvalue2 = ()
	for i in sqlvalue:
		if isinstance(i, dict):
			i = str(i)
		if isinstance(i, int):
			i = str(i)
		i_tuple = (i,)
		sqlvalue2 += i_tuple
		# print i
		# print type(i)
		# try:
		# 	print chardet.detect(i)['encoding']
		# except:
		# 	print "not str"
#	send ='INSERT IGNORE INTO coupons VALUES(' + sqlvalue + ');'
	print "END  ============"
	for i in sqlvalue2:
		print i
		print type(i)
		try:
			print chardet.detect(i)['encoding']
		except:
			print "not str"

	send = 'INSERT INTO coupons VALUES ("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s");' % sqlvalue2
#	send ='INSERT INTO coupons VALUES ("%s","%s","%s","%s",%f,%f,%d,"%s","%s","%s","%s",%d,%d,"%s","%s","%s","%s","%s","%s","%s");' % (1,2,3,4,5,6,7,8,9,0,1,3,4,5,6,7,8,9,0)
# send ='INSERT INTO coupons VALUES
# ("%s","%s","%s","%s",%f,%f,%d,"%s","%s","%s","%s",%d,%d,"%s","%s","%s","%s","%s","%s","%s");'
# % sqlvalue
	print "[x]"
	print "[x]"
	print "[x]"

	print send
	return send


# START ===========
# 50011972
# <type 'int'>
# not str
# https://uland.taobao.com/coupon/edetail?e=6M%2FFn5ROnaMGQASttHIRqUwQyo7GR9HXZNkLrqb%2FU1yEdvD4wwM%2BYzZ4kHEygmO3Q0Uhq3lAdJxPJ5PBakF2NQBHHMsQlxxbDfqEFBOhTcxCk44G7c7X4Plcu0%2BI9j8qHTsGdui2g1mhrlg9bx%2F132Pfrr0N2WBez8H7duZdp3f7J8FmRkgg%2BK1hbRgwYUOf&traceId=0bb7548415037342933666883e
# <type 'str'>
# ascii
# 满15元减10元
# <type 'str'>
# utf-8
# http://detail.tmall.com/item.htm?id=536475863424
# <type 'str'>
# ascii
# 15.00
# <type 'str'>
# ascii
# 50.30
# <type 'str'>
# ascii
# 1
# <type 'int'>
# not str
# {u'string': [u'http://img2.tbcdn.cn/tfscom/i3/2074849089/TB2i6kOaIr_F1JjSZFvXXcmJVXa_!!2074849089.jpg', u'http://img4.tbcdn.cn/tfscom/i3/2074849089/TB2WoV0d0UnyKJjSZFpXXb9qFXa_!!2074849089.jpg', u'http://img1.tbcdn.cn/tfscom/i3/2074849089/TB2n8oWbSY9F1JjSZFFXXaBKXXa_!!2074849089.jpg', u'http://img1.tbcdn.cn/tfscom/i1/2074849089/TB2yBPtasr_F1JjSZFoXXbVRXXa_!!2074849089.jpg']}
# <type 'dict'>
# not str
# 途涉 F8耳塞通用iPhone6splus苹果5手机线控华为5vivo耳机入耳式
# <type 'str'>
# utf-8
# 536475863424
# <type 'int'>
# not str
# 2074849089
# <type 'int'>
# not str
# 20000
# <type 'int'>
# not str
# 113827
# <type 'int'>
# not str
# 基业数码专营店
# <type 'str'>
# utf-8
# http://img3.tbcdn.cn/tfscom/i3/2074849089/TB16bNnSVXXXXXTXXXXXXXXXXXX_!!0-item_pic.jpg
# <type 'str'>
# ascii
# 8000
# <type 'int'>
# not str
# 2017-08-23
# <type 'str'>
# ascii
# 基业数码专营店
# <type 'str'>
# utf-8
# 苹果安卓 线控通话 立体重低音
# <type 'str'>
# utf-8
# 2017-08-28
# <type 'str'>
# ascii
# END  ============

# def Itemcats():
# 	req=top.api.ItemcatsGetRequest(url,port)
# 	req.set_app_info(top.appinfo(appkey,secret))
# 	req.cids="18957,19562"
# 	now = datetime.datetime.now()
# 	req.datetime=now.strftime(u"%Y-%m-%d %H:%M:%S")
# 	req.fields="cid,parent_cid,name,is_parent"
# 	req.parent_cid=50011999
#     resp= req.getResponse()

def get_all_coupon_today():
	for i in query_words:
		res = DgItemCoupon(i)
		p(res)
		# s(1,10)

def TbkSpreadGetRequest(baseurl):
	import json
	p("TbkSpreadGetRequest")
	req = top.api.TbkSpreadGetRequest(url, port)
	req.set_app_info(top.appinfo(appkey, secret))
	urladdr = {}
	urladdr["url"] = baseurl
	req.requests = json.dumps(urladdr) #baseurl
#	p(req)
#	p(type(req))
	# p(type(req.requests))
	# p(req.requests)
	try:
	    resp = req.getResponse()
	    p(resp)
	    return resp
	except Exception, e:
	    p(e)
	    p("error TbkSpreadGetRequest")

def test_all_function():
	DgItemCoupon()
	JuTqg()
# 	UatmFavoritesItem()
	goods_query()
	TbkItemConvert()
	recommend_goods()
	item_info()
	shops()
	TbkUatmEvent()
	p("every thing is ok")

def enc(j):
	if isinstance(j, unicode):
		j = j.encode('utf-8')
	return j


def clr_clk(intxt):
	return re.sub('\"', '', intxt)

def from_coupons_2_goods():
	get_item = 'SELECT category, title, pict_url, item_url, shop_title, zk_final_price, commission_rate, volumn, seller_id, coupon_remain_count, coupon_info, coupon_start_time, coupon_end_time, coupon_click_url from coupons LIMIT 30;'
	engine = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)
	Session = scoped_session(sessionmaker(bind=engine))

	sess=Session()
	result = sess.execute(get_item)
	print get_item
	max=result.cursor._rows
	count=0
	totalGoods=[]
	p(len(max))
	for i in range(len(max)):
		item = list(max[i])
		goodsData=[]
		# data format ===========
		goodsData.append(int(clr_clk(item[0])))	#id
		goodsData.append(enc(item[1]))	#code
		goodsData.append(enc(item[2]))	#name
		goodsData.append(enc(item[3]))	#img
		goodsData.append(enc(item[4]))	#link
		goodsData.append("dummy")	# shop
		goodsData.append(0.01)	# price
		goodsData.append(0)	#solderpermonth
		goodsData.append(float(clr_clk(item[7])))	#rate
		goodsData.append(float(clr_clk(item[8])))	#earn
		goodsData.append("dummy")	#seller
		goodsData.append("dummy")	#idlinkshort
		goodsData.append("dummy")	#idlink
		goodsData.append(enc(item[10]))	#idcmd
		goodsData.append(int(clr_clk(item[9])))
		goodsData.append(0)	#leftcoupon
		goodsData.append("dummy")	#couponvalue
		goodsData.append(enc(item[13]))	#couponstart
		goodsData.append("dummy")	#couponend
		goodsData.append("dummy")	#couponlink
		goodsData.append("dummy")	#couponcmd
		goodsData.append("dummy")	#couponshortlink
		goodsData.append(0)	#bsellsplan

		totalGoods.append(goodsData)
		p("append goodsData")
		# category
		# title
    # pict_url
    # item_url
    # shop_title
    # zk_final_price
    # ""
    # commission_rate
    # volumn
    # seller_id
    # ""
    # ""
    # ""
    # coupon_remain_count
    # coupon_info
    # coupon_start_time
    # coupon_end_time
    # coupon_click_url
    # ""
    # ""
    # ""
    # ""


#		print goodsData
#		break
		
	cc=0
	for m in totalGoods:
		p(tuple(m))
#		print tuple(m)
		try:
			send ='INSERT INTO goods VALUES (%d,   "%s",  "%s", "%s", "%s",  "%s", %f,   %d,   %f,   %f,  "%s",  "%s", "%s","%s",  %d,   %d,  "%s",  "%s",	"%s","%s", "%s", "%s",  %d );' % tuple(m)
			#s(10,100)
			#time.sleep(100000)
			#print send
			result = sess.execute(send)
		except:
			llist = ["%d",   "%s",  "%s", "%s", "%s",  "%s", "%f",   "%d",   "%f",   "%f",  "%s",  "%s", "%s","%s",  "%d",   "%d",  "%s",  "%s",	"%s","%s", "%s", "%s",  "%d" ]
			cnt =0
			for i in tuple(m):
				print i , type(i), llist[cnt], cnt
				cnt+=1
			print len(llist)
			traceback.print_exc()
			cc+=1
	p("TOTAL INSERT %d, FAIL %d, SUCC %d ;" % (len(totalGoods), cc, (len(totalGoods)-cc)))
#	print len(totalGoods)#
#	print totalGoods
#	print len(max)

if __name__ == '__main__':
	get_all_coupon_today()
	from_coupons_2_goods()
	#test_all_function()
