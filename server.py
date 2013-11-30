try:
    import SimpleHTTPServer as http_server
except ImportError:
    import http.server as http_server
import socket

class MyRequestHandler(http_server.SimpleHTTPRequestHandler):
    extensions_map = http_server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        '.md': 'text/html',
        })

print('Url: http://localhost:8000/')
print('andere IPs: ')
print(socket.gethostbyname_ex(socket.gethostname()))

http_server.test(MyRequestHandler)
