#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2017-08-21 17:03:43
# @Author  : qin_hai_ning (haining.qin@changhong.com)
# @Link    : https://www.triboys.com/
# @Version : $Id$

import os
import time
import datetime
import json
import traceback


def p(i):
	print "[x] ", str(i)
	print "\r\n"

def sav_log(intxt):	
	print intxt
	try:
		logtxt = open('/var/www/chmall/log/tmplog.txt','a+')
		formattxt = obtain_log_txt_json(intxt)
		logtxt.write(formattxt)
		logtxt.write("\r\n")
		print "sav_log"		
	except Exception as e:
		traceback.print_exc()
		raise
	else:
		pass
	finally:
		pass

def sav_2_file(intxt, filepath):
	p("sav_2_file")
	try:
		logtxt = open(filepath,'a+')
		formattxt = obtain_log_txt_json_2(intxt)
		logtxt.write(formattxt)
		logtxt.write("\r\n")
		print "sav_log"		
	except Exception as e:
		traceback.print_exc()
		raise
	else:
		pass
	finally:
		pass


def obtain_log_txt(intxt):
	title = "[x] "
	dummy = " "
	now = datetime.datetime.now()
	otherStyleTime = now.strftime(u"%Y-%m-%d %H:%M:%S")
	otherStyleTime = otherStyleTime.decode('utf-8')
	output = str(title) + str(dummy) + str(otherStyleTime) + str(dummy) + str(intxt) + str(dummy) + '\r\n'
	return output
 		


def obtain_log_txt_json(intxt):

	now = datetime.datetime.now()
	otherStyleTime = now.strftime(u"%Y-%m-%d %H:%M:%S")
	otherStyleTime = otherStyleTime.decode('utf-8')
	print intxt
	injson = json.loads(intxt)
	for i in injson:
		print i 
	print injson
	injson["time"] = otherStyleTime
	output = json.dumps(injson)
	return output

def obtain_log_txt_json_2(injson):
	now = datetime.datetime.now()
	otherStyleTime = now.strftime(u"%Y-%m-%d %H:%M:%S")
	otherStyleTime = otherStyleTime.decode('utf-8')
	injson["time"] = otherStyleTime
	output = json.dumps(injson)
	print output
	return output
