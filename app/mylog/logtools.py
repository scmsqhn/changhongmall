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

def sav_log(intxt):	
	print intxt
	with open('/var/www/chmall/log/tmplog.txt','a+') as logtxt:
		formattxt = obtain_log_txt_json(intxt)
		logtxt.write(formattxt)
		logtxt.write("\r\n")
		print "sav_log"

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
	print injson
	injson["time"] = otherStyleTime
	output = json.dumps(injson)
	return output
