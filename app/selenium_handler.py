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

print "browser = webdriver.Firefox()"
# this path should be available
#browser = webdriver.Chrome()
browser = webdriver.Firefox()

#browser = webdriver.Chrome(r"/root/anaconda3/envs/tf27/lib/python2.7/site-packages/selenium/webdriver/chromedriver")
print "browser = webdriver.Chrome() 2 "

browser.get('http://cd.58.com')

#print '现在将浏览器最大化'
#browser.maximize_window()
#<div id="commonTopbar_login"><a href="https://passport.58.com/login/?path=http%3A//cd.58.com/%3Fpts%3D1503591196676" target="_self" tongji_tag="pc_topbar_log_login">登录</a><span class="gap">|</span><a href="https://passport.58.com/reg/" target="_self" tongji_tag="pc_topbar_log_reg">注册</a></div>
print "点击登陆按钮"
browser.find_element_by_id('commonTopbar_login').click() # this is open login | register

browser.find_element_by_link_text(u"登录").click()

print "输入用户名"
tmp =  browser.find_element_by_id('usernameUser').text
if tmp==u'':
	browser.find_element_by_id('pwdLogin').click()

browser.find_element_by_id('usernameUser').send_keys(u'13678028750')
browser.find_element_by_id('passwordUserText').send_keys(u'Anan3333')
browser.find_element_by_id('btnSubmitUser').click()
'''
login lost here for msg modify
'''

#x = browser.find_element_by_id('commonTopbar_tomy58')
#ActionChains(browser).move_to_element(x).perform()

browser.find_element_by_id('commonTopbar_tomy58').click()





send_keys(u'13678028750')
time.sleep(3)

print "输入密码"
browser.find_element_by_id('passwordUserText').send_keys(u'Anan3333')
time.sleep(3)

print "输入密码"
browser.find_element_by_id('btnSubmitUser').click()
time.sleep(3)

s(10000)
browser.find_element_by_id('kw1').send_keys(u'杨彦星')
print browser.find_element_by_id('kw1').get_attribute('type')
print browser.find_element_by_id('kw1').size #打印输入框的大小
browser.find_element_by_id('su1').click()
time.sleep(3)

print '现在我将设置浏览器为宽480，高800显示'
browser.set_window_size(480,800)
browser.get('http://m.mail.10086.cn')
time.sleep(3)

print '现在我将回到刚才的页面'
browser.maximize_window()
browser.back()
time.sleep(3)

print '现在我将回到之前的页面'
browser.forward()
time.sleep(5)
print '现在我将打开杨彦星的网站进行json搜索'
browser.get('http://static.yangyanxing.com')
browser.find_element_by_xpath(".//*[@id='ls']").send_keys(u'json')
browser.find_element_by_xpath(".//*[@id='header']/div[1]/div/form/input[2]").click()
time.sleep(5)
browser.quit()

browser = webdriver.Chrome()

print '以下将以登录人人网来进行上面的综合应用'
browser.get('http://www.renren.com/SysHome.do')
browser.find_element_by_id('email').clear()#这个是以id选择元素
browser.find_element_by_id('email').send_keys('email')
browser.find_element_by_id('email').send_keys(Keys.BACK_SPACE)
time.sleep(2)
browser.find_element_by_id('email').send_keys('m')
s(2)
browser.find_element_by_id('email').send_keys(Keys.CONTROL,'a')
s(2)
browser.find_element_by_id('email').send_keys(Keys.CONTROL,'x')#剪切掉里面的内容
s(2)
browser.find_element_by_id('email').send_keys(Keys.CONTROL,'v') #重新输入进去
s(2)
browser.find_element_by_name('password').clear()#这个是以name选择元素
browser.find_element_by_name('password').send_keys('password')
#browser.find_element_by_xpath(".//*[@id='login']").click()#这个是以xpath选择元素
browser.find_element_by_xpath(".//*[@id='login']").send_keys(Keys.ENTER) #这里通过点击Enter键来登录
browser.maximize_window()
article = browser.find_element_by_link_text(u'周碧华：社科院出现内鬼意味着什么？')
ActionChains(browser).move_to_element(article).perform()#将鼠标移动到这里，但是这里不好用
ActionChains(browser).context_click(article).perform()
time.sleep(5)

browser.quit()

'''
# 店铺签到https://www.v2ex.com/t/321539
    def shop_check_in(self):
        urls = [
                'https://nongfutechan.taobao.com/ugo.htm?spm=a217e.7759359.15285.1.4xE9Il&signin=true#ugo-jinbi',
                'https://shop136560499.taobao.com/ugo.htm?spm=a217e.7759359.15285.2.muhVBy&signin=true#ugo-jinbi',
                'https://shop33473134.taobao.com/ugo.htm?spm=a217e.7759359.15285.3.yW2N4E&signin=true#ugo-jinbi'
                ]
        for url in urls:
            self.driver.get(url)
            time.sleep(5)
            print("page_source\t%s" % self.driver.page_source)
            self.driver.find_element_by_xpath('//a[@href="#" and @class="now-take J_NowSignIn" and text()="立即签到"]').click()

'''
