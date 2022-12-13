#!/usr/bin/env python3

import sys
import os
from urllib.parse import urlparse
from shlex import quote
from http.server import BaseHTTPRequestHandler, HTTPServer

# Server
class html(BaseHTTPRequestHandler):


    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(bytes("ok", "utf8"))


    def do_POST(self):
        if self.path != '/':
            self.send_error(404)
            return

        clen = int(self.headers.get('Content-Length') or "0")
        body = self.rfile.read(clen).decode('utf-8')

        if len(body) == 0:
            self.send_error(400)
            return

        cmd = "xdg-open {}".format(quote(body))
        argv = ["/bin/sh", "-c", cmd]

        pid = os.fork()

        if pid == 0:
            os.execv(argv[0], argv)
        else:
            os.waitpid(pid, 0)

        self.send_response(200)
        self.end_headers()
        self.wfile.write(bytes("ok", "utf8"))

# Run server
with HTTPServer(('', int(sys.argv[1]) if len(sys.argv) > 1 else 8783), html) as server:
    server.serve_forever()
