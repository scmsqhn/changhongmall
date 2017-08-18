# coding=utf8

import whoosh
from whoosh.index import create_in
from whoosh.fields import *
from whoosh.qparser import QueryParser
import traceback
import os

class WhooshSearch(object):

    def __init__(self):
        self.schema = Schema(title = TEXT(stored = True), path = ID(stored=True), content = TEXT)
        self.insert_index(label="indexer")

    def insert_index(self, label="indexer"):
        if not os.path.exists(label):
            os.mkdir(label)
        self.ix = create_in(label, self.schema)

    def add_path_2_index(self, index = "indexer", datalist=[]):
        ix = self.ix
        self.index_add_path(ix, datalist)

    def get_index(self, label="indexer"):
        ix = self.ix
        return ix

    def index_add_path(self, index="indexer", datalist=[]):
        ix = self.ix
        writer = ix.writer()
        f = open("recordindex.txt", "a+")
        for i in datalist:
            title = i["title"]
            content = i["content"]
            path = i["path"]
            #pass # print "[x]", type(path), path
            pass # print "[x]", type(content), content
            #pass # print "[x]", type(title), title
            writer.add_document(title=title, path=path, content=content)
            f.write(str(type(title)))
            f.write(str(type(content)))
            f.write(str(type(path)))
            f.write(path.encode("utf8"))
            f.write(content.encode('utf8'))
            f.write(path.encode("utf8"))
        writer.commit()
        f.close()

    def insert_demo_data(self):
        ix = self.ix
        writer = ix.writer()
        writer.add_document(title=u"1", content=u"one", path=u"/a")
        writer.add_document(title=u"2", content=u"two", path=u"/b")
        writer.add_document(title=u"3", content=u"thr", path=u"/v")
        writer.add_document(title=u"4", content=u"for", path=u"/d")
        writer.commit()

    def data_format(self, title, content, path):
      data = {}
      data["title"] = title
      data["content"] = content
      data["path"] = path
      return data


    def search(self, index="indexer", searchfrom="", searchwhat="", results=None):
        try:
            ix = self.ix
            searcher = ix.searcher()
            pass # print searchfrom, type(searchfrom)
            pass # print searchwhat, type(searchwhat)
            query =QueryParser(searchfrom, ix.schema).parse(searchwhat)
            #ok query =QueryParser(u"content", ix.schema).parse(u"one")
            #query =QueryParser(u"content", ix.schema).parse(u"qin")
            res = searcher.search(query)
            results = res
        except:
            traceback.trace_back

        finally:
            searcher.close
            return results











if "__name__" == "__main__":
  try:
    woshsearch = WhooshSearch()
    woshsearch.insert_index()
    dlst = []
    d1 = woshsearch.data_format(u"si chuan", u"chengdu mianyang", u"1 2 3")
    d2 = woshsearch.data_format(u"bei jing", u"tongzhou dayi", u"4 5 6")
    d3 = woshsearch.data_format(u"shang hai", u"hongkou huangpu", u"7 8 9")
    d4 = woshsearch.data_format(u"shen zhen", u"qianhai meilin", u"10 11 12")
    dlst.append(d1)
    dlst.append(d2)
    dlst.append(d3)
    dlst.append(d4)
    woshsearch.add_path_2_index("indexer", dlst)
    woshsearch.insert_demo_data()
    pass # print woshsearch
    pass # print sys.argv[1],   sys.argv[2]
    results = woshsearch.search("indexer", sys.argv[1], sys.argv[2])
    #results = woshsearch.search("indexer", "title", u"name")
  except:
    traceback.trace_back




