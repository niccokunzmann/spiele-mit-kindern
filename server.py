try:
    import SimpleHTTPServer as http_server
except ImportError:
    import http.server as http_server
import socket

print('Url: http://localhost:8000/')
print('andere IPs: ')
print(socket.gethostbyname_ex(socket.gethostname()))

http_server.test(http_server.SimpleHTTPRequestHandler)
