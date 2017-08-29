#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2017-08-24 15:31:29
# @Author  : qin_hai_ning (haining.qin@changhong.com)
# @Link    : https://www.triboys.com/
# @Version : $Id$

import os,sys
import webbrowser
#import GenericBrowser
from webbrowser import GenericBrowser
class web_browser_tools(object):
	"""docstring for we
	"""

	def __init__(self, arg=None):
		super(object, self).__init__(object)
		self.arg = arg

	def init_webbrow(self):
		# register webbrowser
#		webbrowser.register("w3m")
		webbrowser.register('w3m', GenericBrowser('w3m'))
		return webbrowser

	def get_url(sefl, url):
#		url = 'http://www.baidu.com'
		webbrowser.open(url)
		webbrowser.get()

	def get_baidu_url(self):
		url = 'http://www.baidu.com'
		webbrowser.open(url, new=0, autoraise=False)
		webbrowser.get()

	def get_cd58_url(self):
		url = 'http://cd.58.com'
		webbrowser.open(url, new=0, autoraise=True)
		webbrowser.get()

if __name__=="__main__":
	wbt = web_browser_tools()
	brow = wbt.init_webbrow()
	prt = wbt.get_cd58_url()
	print prt