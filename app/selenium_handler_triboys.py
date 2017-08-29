#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2017-08-24 19:22:11
# @Author  : qin_hai_ning (haining.qin@changhong.com)
# @Link    : https://www.triboys.com/
# @Version : $Id$

import os
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains #引入ActionChains鼠标操作类
from selenium.webdriver.common.keys import Keys #引入keys类操作
import time
from selenium import webdriver

def s(int):
    time.sleep(int)

browser = webdriver.Firefox()
print "browser = webdriver.Chrome() 2 "
browser.get('https://www.triboys.com')

while True:
	browser.find_element_by_id('search-input').send_keys(u'dido')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
	browser.find_element_by_id('search-input').send_keys(u'S06')
	browser.send_keys(Keys.ENTER)
	s(10)
