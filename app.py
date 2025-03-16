import streamlit as st
import pandas as pd
import pickle

# Load the trained model
with open("REIT_gbr_model.sav", "rb") as file:
    model = pickle.load(file)

# Streamlit UI
st.title("🏡 Real Estate Price Prediction App")

# User Inputs (Modify based on the model's expected features)
beds = st.number_input("Number of Bedrooms", min_value=0, max_value=10, value=3)
baths = st.number_input("Number of Bathrooms", min_value=0, max_value=10, value=2)
sqft = st.number_input("Total Floor Area (sqft)", min_value=100, max_value=10000, value=1500)
lot_size = st.number_input("Total Lot Size (sqft)", min_value=0, max_value=50000, value=2000)
property_tax = st.number_input("Annual Property Tax ($)", min_value=0, max_value=50000, value=3000)
insurance = st.number_input("Annual Insurance Cost ($)", min_value=0, max_value=20000, value=1500)
tx_year = st.number_input("Transaction Year", min_value=2000, max_value=2024, value=2024)

# Create input DataFrame with only the correct features
input_data = pd.DataFrame({
    'sqft': [sqft],
    'lot_size': [lot_size],
    'property_tax': [property_tax],
    'insurance': [insurance],
    'beds': [beds],
    'baths': [baths],
    'tx_year': [tx_year]
})

# Prediction
if st.button("Predict Price"):
    try:
        prediction = model.predict(input_data)[0]
        st.success(f"🏠 Predicted Transaction Price: **${prediction:,.2f}**")
    except ValueError as e:
        st.error(f"Feature mismatch error: {e}")
