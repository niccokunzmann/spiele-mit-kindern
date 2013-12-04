try:
    import SimpleHTTPServer as http_server
except ImportError:
    import http.server as http_server
import socket
from pprint import pprint
import urlparse
import sys
import os

try:
    __file__
except NameError:
    __file__ = os.path.join(os.getcwd(), 'server.py')
baseDir = os.path.dirname(__file__)
sys.path.insert(0, os.path.join(baseDir, 'python'))

import githubInterface

class MyRequestHandler(http_server.SimpleHTTPRequestHandler):
    extensions_map = http_server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        '.md': 'text/plain',
        })

    def do_POST(self):
        pprint(dict(self.headers))
        length = self.headers.getheader('content-length')
        if length:
            content = self.rfile.read(int(length))
            # print 'content:', content
            params = urlparse.parse_qs(content) # urllib.urlencode
            pprint(params)
            comment = params.get('comment', [''])[0]
            sourceCode = params.get('sourceCode', [''])[0]
        return self.do_GET()

print('Url: http://localhost:8000/')
print('andere IPs: ')
print(socket.gethostbyname_ex(socket.gethostname()))

http_server.test(MyRequestHandler)
