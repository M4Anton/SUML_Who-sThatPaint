from flask import Blueprint, request, render_template, flash, redirect, url_for

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        return "<p>POST ON LOGIN</p>"
    else:
        return "<p>Login</p>"

@auth.route('/logout')
def logout():
    return "<p>LOGGED OUT</p>"

@auth.route('/sign_up', methods=['POST', 'GET'])
def sign_up():
    if request.method == 'POST':
        return "<p>POST ON SIGN UP</p>"
    else:
        return "<p>SIGN UP</p>"