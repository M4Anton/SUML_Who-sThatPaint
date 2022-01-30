from flask import Blueprint, request, render_template, flash, redirect, url_for
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from os.path import abspath, dirname
import numpy as np
from werkzeug.utils import secure_filename
from .models import Image
from flask_login import current_user
from . import db


ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}
DIR = dirname(abspath(__file__))
UPLOAD_FOLDER = f"{DIR}/files"
model_path = f"{DIR}/model.h5"
model = load_model(model_path)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def predict_author(file):
    # transform image to model-acceptable array
    img = image.load_img(file, target_size=(240, 240))
    img_tensor = image.img_to_array(img)
    img_tensor = np.expand_dims(img_tensor, axis=0)

    classes = ["Albrecht Durer", "Alphonse Mucha", "Andy Warchol", "Caravaggio", "Claude Monet", "Donatello", "Edvard Munch", "Frida Kahlo", "Gustav Klimt", "Henryk Siemiradzki", "Hieronymus Bosch", "Leonardo da Vinci",
               "Michelangelo", "Pablo Picasso", "Piet Mondrian", "Rafael Santi", "Rene Magritte", "Roy Lichtenstein", "Salvador Dali", "Stanislaw Wyspianski", "Wassily Kandinsky", "William Turner", "Zdzislaw Beksinski"]
    list_i = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
              12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    prediction = model.predict(img_tensor)

    # sort predictions desc
    for i in range(len(classes)):
        for j in range(len(classes)):
            if(prediction[0][list_i[i]] > prediction[0][list_i[j]]):
                temp = list_i[i]
                list_i[i] = list_i[j]
                list_i[j] = temp

    dict_prediction = []
    for i in range(3):
        dict_prediction.append(
            {classes[list_i[i]]: round(prediction[0][list_i[i]]*100, 2)})
    return dict_prediction


views = Blueprint('views', __name__)


@views.route('/', methods=["POST", "GET"])
def home():
    if request.method == "POST":
        if 'File' not in request.files:
            return {
                "status": "error",
                "data": "There was no file in the request"
            }
        file = request.files['File']
        if file.filename == '':
            return {
                "status": "error",
                "data": "You haven't selected a file",
            }
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            path = f"{UPLOAD_FOLDER}/{filename}"
            file.save(path)
            pred = predict_author(path)
            new_image = Image(notes=request.form.get('notes'), file=path, user_id=current_user.id, pred=str(pred))
            db.session.add(new_image)
            db.session.commit()
        user_images = []
        for image in current_user.images:
            user_images.append({"notes": image.notes, "file": image.file, "date": image.date, "pred": image.pred})
        return {
            "status": "success",
            "data": pred,
            "new_user_data": {"username": current_user.username, "email": current_user.email, "images": user_images, "id": current_user.id}
        }
    else:
        return render_template("home.html", img_path=["static", "start_image.jpg"])


@views.route('/files/<filename>')
def files(filename=''):
    from flask import send_from_directory
    return send_from_directory(UPLOAD_FOLDER, filename)
