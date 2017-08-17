#!/usr/bin/env python
#! -- coding=utf-8 --


"""
Function: put the data from the taobao which is in the xls, push to the db 'goods'
"""

import xlrd
import MySQLdb
import time
import traceback
import sys
import time
reload(sys)
sys.setdefaultencoding('utf-8')
reload(sys)
import chardet

current = time.time()
# Open the workbook and define the worksheet
book = xlrd.open_workbook("STANDBY.xls")

sheet = book.sheet_by_name("Page1")

database = MySQLdb.connect (host="localhost", user = "root", passwd = "root", db = "ultrax" ,charset="utf8")
database.set_character_set('utf8')
cursor = database.cursor()

'''
TABLE COLUMN
id,name,img,link,shop,price,sellmon,rate,earn,seller,idlinkshort,idlink,idcmd,couponsnum,leftcoupon,percoupon,couponstart,couponend,couponlink,couponcmd,couponshortlink,bsellsplan
'''
for r in range(1, sheet.nrows):
      c1 = sheet.cell(r,0).value
      c2 = sheet.cell(r,1).value
      c3 = sheet.cell(r,2).value
      c4 = sheet.cell(r,3).value
      c5 = sheet.cell(r,4).value
      c6 = sheet.cell(r,5).value
      c7 = sheet.cell(r,6).value
      c8 = sheet.cell(r,7).value
      c9 = sheet.cell(r,8).value
      c10= sheet.cell(r,9).value
      c11= sheet.cell(r,10).value
      c12= sheet.cell(r,11).value
      c13= sheet.cell(r,12).value
      c14= sheet.cell(r,13).value
      c15= sheet.cell(r,14).value
      c16= sheet.cell(r,15).value
      c17= sheet.cell(r,16).value
      c18= sheet.cell(r,17).value
      c19= sheet.cell(r,18).value
      c20= sheet.cell(r,19).value
      c21= sheet.cell(r,20).value
      c22= sheet.cell(r,21).value
      if c22==u'\u5426':
          c22=-1
      else:
          c22=0

      values=[0,c1,c2,c3,c4,c5,float(c6),int(c7),float(c8),float(c9),c10,c11,c12,c13,int(c14),int(c15),c16,c17,c18,c19,c20,c21,c22]
      '''
      values[1]=int(values[1])
      values[6]=float(values[6])
      values[7]=int(values[7])
      values[8]=float(values[8])
      values[9]=float(values[9])
      values[14]=int(values[14])
      values[15]=int(values[15])
      '''
      for i in range(len(values)):
          try:
             pass
             #print chardet.detect(values[i])['encoding']
             #print type(values[i])
             #print values[i].encode('utf-8')
          except:
             traceback.print_exc()
             pass
          #print type(i)
          if isinstance(values[i],str):
              type=chardet.detect(values[i])['encoding']
              print 'decode', type, 'then encode utf8', 
              values[i]=values[i].decode(type)
          elif isinstance(values[i],unicode): 
              values[i]=values[i]#.encode('utf8')
#              print chardet.detect(values[i]),values[i]
#          print type(i)
      '''
      '''
      #print type(float(c6))
      tpvalues=tuple(values)
      for i in tpvalues:
          try:
              print chardet.detect(i),i
          except:
              pass
      try:
        for i in list(tpvalues):
            if isinstance(i,str):
                pass
                #print chardet.detect(i)
        send ='INSERT IGNORE INTO goods VALUES (%d,%s,"%s","%s","%s","%s",\
        %f,%d,%f,%f,"%s","%s","%s","%s",%d,%d,"%s","%s","%s","%s","%s","%s",%d);' % tpvalues
        cursor.execute(send)
        print send.encode('utf-8')
      except:
        traceback.print_exc()


#test ='SELECT name FROM goods'

#result=cursor.execute(send)
#print result.__dict__

cursor.close()

database.commit()

database.close()

print ""
print "Done! "
print ""
columns = str(sheet.ncols)
rows = str(sheet.nrows)
print u"我刚导入了 ".encode('utf-8'), columns , u" 列 and ".encode('utf-8'), rows , u" 行数据到MySQL!".encode('utf-8')
