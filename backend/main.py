import pickle
import pandas as pd  # Ensure pandas is imported correctly
from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from PropertyVariables import PropertyPrice



# Load the fraud detection model
fraud_model = joblib.load('fraud_detection_model.pkl')

# Load the second model (Real Estate Price Prediction)
with open("REIT_gbr_model.sav", "rb") as file:
    reit_model = pickle.load(file)
# 2. Load the model from disk
#fileName = 'property_price_prediction_model.sav'
#loaded_model = joblib.load(fileName)

#PropertyPricePredictionApp = FastAPI()
app = FastAPI()


# 3. Index route, opens automatically on http://127.0.0.1:8000
#@PropertyPricePredictionApp.get('/predict_price')
#def index():
    #return {'message': 'Hello!!! Welcome to the Property Price Prediction Model'}


# 4. Expose the prediction functionality, make a prediction from the passed
#    JSON data and return the predicted price with the confidence (http://127.0.0.1:8000/predictprice)
#@PropertyPricePredictionApp.post('/predict_price')
#def price_prediction(data: PropertyPrice):
    #data = data.dict()
    #print(data)

    #data_df = pd.DataFrame([data])
    #print(data_df.head())

    #predicted_value = loaded_model.predict(data_df)
    #print(str(predicted_value))
    #return str(predicted_value)



# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins, or specify your Next.js URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Transaction Fraud Detection Model
class TransactionData(BaseModel):
    TX_AMOUNT: float
    TX_TIME_SECONDS: int
    TX_TIME_DAYS: int

# Real Estate Prediction Model
class REITInput(BaseModel):
    sqft: float
    lot_size: float
    property_tax: float
    insurance: float
    beds: int
    baths: int
    tx_year: int

# Fraud detection endpoint
@app.post("/predict")
def predict(data: TransactionData):
    features = np.array([[data.TX_AMOUNT, data.TX_TIME_SECONDS, data.TX_TIME_DAYS]])
    prediction = fraud_model.predict(features)  # Use correct model
    return {"fraud_prediction": int(prediction[0])}

# Real estate endpoint (FIXED)
@app.post("/predict_price")
def predict_price(data: REITInput):
    # Create DataFrame with proper column names
    input_df = pd.DataFrame([{
        'sqft': data.sqft,
        'lot_size': data.lot_size,
        'property_tax': data.property_tax,
        'insurance': data.insurance,
        'beds': data.beds,
        'baths': data.baths,
        'tx_year': data.tx_year
    }])
    
    prediction = reit_model.predict(input_df)[0]  # Use DataFrame input
    return {"price_prediction": round(prediction, 2)}

# Add this block to prevent issues with multiprocessing on Windows
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
