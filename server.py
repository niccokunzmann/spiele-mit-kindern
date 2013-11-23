try:
    import SimpleHTTPServer as http_server
except ImportError:
    import http.server as http_server
    
print('Url: http://localhost:8000/')

http_server.test(http_server.SimpleHTTPRequestHandler)
