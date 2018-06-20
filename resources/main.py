"""
This is the server side for GreenPath
"""

from bottle import route, run, get, template, static_file, request, response, debug
import json

@get("/")
def index():
    return template("index.html")


@route('/js/<filename:re:.*\.js>', method='GET')
def javascripts(filename):
    return static_file(filename, root='js')


@route('/css/<filename:re:.*\.css>', method='GET')
def stylesheets(filename):
    return static_file(filename, root='css')


@route('/images/<filename:re:.*\.(jpg|png|gif|ico)>', method='GET')
def images(filename):
    return static_file(filename, root='images')


def main():
    import os
    run(host="localhost", port=7000)


if __name__ == '__main__':
    main()
