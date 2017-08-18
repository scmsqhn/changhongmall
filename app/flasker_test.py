#!/usr/bin/env python
#! -- coding=utf-8 --

import os
import flaskr
import unittest
import tempfile

class FlaskrTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, flaskr.app.config['DATABASE'] = tempfile.mkstemp()
        flaskr.app.config['TESTING'] = True
        self.app = flaskr.app.test_client()
        flaskr.init_db()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(flaskr.app.config['DATABASE'])

    def test_home_page(self):
        response = self.client.get(url_for('main.index'))
        self.assertTrue("200" in response.get_data(as_text=True))
        
if __name__ == '__main__':
    unittest.main()