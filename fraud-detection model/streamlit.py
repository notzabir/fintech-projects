import streamlit as st
import numpy as np
import joblib

# Load trained model
model = joblib.load("fraud_detection_model.pkl")

# Set the page title and favicon
st.set_page_config(
  page_title="Transaction Fraud Detection",
  page_icon="💳"
)

st.title("Transaction Fraud Detection System")
st.write("Enter transaction details to predict if it's a fraud.")

# Input fields
tx_amount = st.number_input("Transaction Amount", min_value=0.0, format="%.2f")
tx_time_seconds = st.number_input("Transaction Time (Seconds)", min_value=0, help="Total seconds since the first recorded transaction.")
tx_time_days = st.number_input("Transaction Time (Days)", min_value=0, help="Number of days since the first recorded transaction.")

# Predict button
if st.button("Check Fraud"):
    input_data = np.array([[tx_amount, tx_time_seconds, tx_time_days]])
    
    try:
        prediction = model.predict(input_data)[0]  # Make prediction
        if prediction == 1:
            st.error("Fraud Detected!", icon="⚠️")
        else:
            st.success("Transaction is Legitimate.", icon="✅")
    except Exception as e:
        st.warning(f"Prediction failed: {e}")
