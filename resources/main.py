"""
This is the server side for GreenPath
"""

from bottle import route, run, get, template, static_file, request, response, debug
import json
from src.user import User


@get("/")
def index():
    return template("index.html")


@route("/newroute", method='POST')
def handle_route_request():
    user_preferences = request.POST.get('userPreferences')
    user = User(user_preferences)
    return json.dumps(user.process_user_setting(user_preferences))  # returns to js


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
    run(host="localhost", port=7000)


if __name__ == '__main__':
    main()
