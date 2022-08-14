import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)
model = pickle.load(open('rfModel.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict_html',methods=['POST'])
def predict_html():
    
    features = [int(x) for x in request.form.values()]
    print(features)
    print(type(features))
    finalFeatures = [np.array(features)]
    print(finalFeatures)
    print(type(finalFeatures))
    prediction = model.predict(finalFeatures)
    
    output = round(prediction[0])
    if output == 1:
        result="You Have Heart Disease"
    else:
        result="You Do Not Have Heart Disease"

    return render_template('index.html', prediction_text='Prediction is: {}'.format(result))

@app.route('/predict_api',methods=['POST'])
def predict_api():

    data = request.get_json(force=True)
    prediction = model.predict([np.array(list(data.values()))])

    output = prediction
    output=output.item()
    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)
