from flask import Blueprint, request, render_template, flash, redirect, url_for
from .models import User, Image
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
            form = request.get_json()
            username = form['username']
            password = form['password']
            
            if "@" in username:
                user = User.query.filter_by(email=username).first()
            else:
                user = User.query.filter_by(username=username).first()
            if user:
                if check_password_hash(user.password, password):
                    login_user(user, remember=True)
                    return {
                        "status": "success",
                        "data": {"username": user.username, "email": user.email, "images": user.images, "id": user.id }
                    }
            else:
                return {
                    "status": "error",
                    "data": "Wrong credentials",
                }
    else:
        return render_template('base.html')

@auth.route('/logout')

def logout():
    return {
        "status": "ok"
    }


@auth.route('/sign_up', methods=['POST', 'GET'])
def sign_up():
    if request.method == 'POST':
        form = request.get_json()
        username = form['username']
        password = form['password']
        email = form['email']

        user = User.query.filter_by(username=username).first()
        if user:
            return {
                "status": "error",
                "data": { "username": "This username is taken!"}
            }
        else:
            user = User.query.filter_by(email=email).first()
            if user: 
                return {
                    "status": "error",
                    "data": { "email": "This email is taken!"}
                }

        new_user = User(username=username, email=email, password=generate_password_hash(password, method="sha256"))
        db.session.add(new_user)
        db.session.commit()

        return {
            "status": "success",
            "data": new_user
        }
    else:
        return render_template('base.html')

@auth.route('/expose')
def expose():
    return render_template('base.html') 