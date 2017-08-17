#! coding=utf-8
class GlobalVar: 

    whoosh_instance=None
    
def set_whoosh(ws): 
       
    GlobalVar.whoosh_instance = ws
    print "[x] set ", GlobalVar.whoosh_instance
        
def get_whoosh():
    print "[x] get ", GlobalVar.whoosh_instance
		   
    return GlobalVar.whoosh_instance
       
