

# Commented out IPython magic to ensure Python compatibility.
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from mpl_toolkits.mplot3d import Axes3D
# %matplotlib inline

df = pd.read_csv("real_estate_data.csv")
print ("Shape of dataframe: ",df.shape)

df = df.reset_index() #as there will be
df.head(5)


df.isnull().any()



# Select only numerical features for correlation analysis
numerical_df = df.select_dtypes(include=np.number)

# Calculate the correlation matrix
corr_matrix = numerical_df.corr()

# Proceed with the rest of your code for heatmap visualization
cmap = sns.diverging_palette(250, 10, as_cmap=True)
mask = np.zeros_like(corr_matrix, dtype=bool)
mask[np.triu_indices_from(mask)] = True
fig, ax = plt.subplots(figsize=(10, 10))
sns.heatmap(
    corr_matrix,
    cmap=cmap,
    mask=mask,
    square=True,
    cbar_kws={"shrink": 0.5},
    vmin=-1.0,
    vmax=1.0,
)
sns.set_style(style="white")

df.groupby(by='tx_year').mean(numeric_only=True)


# add in house age
df["House Age"] = df.tx_year - df.year_built
# add in price/sqft
df["PriceSqft"] = df.tx_price / df.sqft
# add monthly fixed expenses
df["Expenses"] = df.property_tax + df.insurance

fig, ax = plt.subplots(figsize=(10,10))
ax2 = ax.twinx()
ax.plot(df.PriceSqft.groupby(by=df.tx_year).mean().index,df.PriceSqft.groupby(by=df.tx_year).mean().values)
ax2.plot(df.tx_price.groupby(by=df.tx_year).mean().index,df.tx_price.groupby(by=df.tx_year).mean().values,'r')
ax.set_xlabel('Year')
ax.set_ylabel("Mean price / sqft")
ax.set_title("Mean Housing Prices and Housing Prices per sq.ft from 1993 - 2016 ")
ax2.set_ylabel("Mean Housing price")
ax.legend(['Housing Prices/Sqft'],loc=1)
ax2.legend(['Mean Housing price'],loc=2)

fig, ax = plt.subplots(figsize=(10,10))
ax2 = ax.twinx()
ax.plot(df.PriceSqft.groupby(by=df.tx_year).mean().index,df.PriceSqft.groupby(by=df.tx_year).mean().values)
ax2.plot(df.tx_year.groupby(by=df.tx_year).count().index,df.tx_year.groupby(by=df.tx_year).count().values,'m')
ax.set_title('Housing Prices/Sqft and No. of Transactions from 1993 - 2016 ')
ax.set_xlabel('Year')
ax.set_ylabel("Mean price / sqft")
ax2.set_ylabel("No. of Transactions")
ax.legend(['Housing Prices/Sqft'],loc=1)
ax2.legend(['No. of Transactions'],loc=2)

plt.plot(df.sqft.groupby(by=df.tx_year).mean().index,df.sqft.groupby(by=df.tx_year).mean().values,'g')
plt.title('Size of houses')
plt.ylabel('Sq. Ft')
plt.xlabel('Year')

byyear = df.select_dtypes(include=np.number).groupby(by=df.tx_year).mean() # Select only numerical features before calculating mean
x = byyear.index
n = []
v = []

for i in range(len(byyear.columns)): # Iterate through numerical columns only
    n.append(byyear.iloc[:, i].name)
    v.append(byyear.iloc[:, i].values)

w = 8
h = 3
fig, ax = plt.subplots(h,w,figsize=(20,5))
plt.tight_layout()

for i in range(w):
    ax[0,i].plot(x,v[i])
    ax[1,i].plot(x,v[i+8])
    ax[2,i].plot(x,v[i+16])
    ax[0,i].set_title(n[i])
    ax[1,i].set_title(n[i+8])
    ax[2,i].set_title(n[i+16])


df2 = df.iloc[:,[0,4,6,22,23,1]]  #select all the numerical data with highest correlation
df2.head(5)

fig, ax = plt.subplots(3,2,figsize=(20,20))

ax[0,0].boxplot(df2.iloc[:,1])
ax[0,0].set_title(df2.iloc[:,1].to_frame().columns.values)

ax[0,1].boxplot(df2.iloc[:,2])
ax[0,1].set_title(df2.iloc[:,2].to_frame().columns.values)

ax[1,0].boxplot(df2.iloc[:,3])
ax[1,0].set_title(df2.iloc[:,3].to_frame().columns.values)

ax[1,1].boxplot(df2.iloc[:,4])
ax[1,1].set_title(df2.iloc[:,4].to_frame().columns.values)

ax[2,0].boxplot(df2.iloc[:,5])
ax[2,0].set_title(df2.iloc[:,5].to_frame().columns.values)

lot_sizeoutlier = df2[df2['lot_size']>600000]
lot_sizeoutlier

propertytaxoutlier = df2[df2['property_tax']>3000]
propertytaxoutlier

insuranceoutlier = df2[df2['insurance']>1200]
insuranceoutlier

sqftoutlier = df2[df2['sqft']>8000]
sqftoutlier

#Remove out-lier
df2 = df2.drop(df2.index[[102,1019,1877]])

#Train-test-split
X3 = df2.drop(['tx_price'],axis=1)
y = df2.tx_price
X_train, X_test, y_train, y_test = train_test_split(X3, y, test_size=0.2, random_state=0)

X_train.head(5)

df4=df.loc[:,['index','tx_price','beds','baths','tx_year']]
X_train = pd.merge(X_train,df4,how='inner',on='index')
y_train = X_train.tx_price
X_train = X_train.drop(['tx_price','index'], axis=1)
X_test = pd.merge(X_test,df4,how='inner',on='index')
y_test = X_test.tx_price
X_test = X_test.drop(['tx_price','index'],axis=1)

print(X_train.shape)
print(y_train.shape)
print(X_test.shape)
print(y_test.shape)



from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

mae_rf =[]

for i in np.arange(5,40,2):
    model = RandomForestRegressor(max_depth=i, random_state=0)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mae_rf.append(mean_absolute_error(y_test, y_pred))

plt.plot(np.arange(5,40,2),mae_rf)
print("MAE for Random Forest Regressor Model is: ",min(mae_rf))

model_rf = RandomForestRegressor(max_depth=23, random_state=0)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
print(mean_absolute_error(y_test, y_pred))

from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_val_score
mae_gbr = []
locx = []
locy = []
for i in range(1,10):
    for j in np.arange(0.05,0.51,0.05):
        gbr_model = GradientBoostingRegressor(learning_rate=j, max_depth=i)
        scores = cross_val_score(gbr_model, X_train, y_train, cv=5, scoring="neg_median_absolute_error")
        cv_mae = abs(sum(scores)/len(scores))
        mae_gbr.append(cv_mae)
        locx.append(i)
        locy.append(j)

#model = GradientBoostingRegressor(learning_rate=j, max_depth=i)
#y_pred = model.predict(X_test)

print ("MAE for Gradient Boosting Regressor Model is: ",min(mae_gbr),"\nat max depth of",locx[(mae_gbr.index(min(mae_gbr)))],"and learning rate of :",locy[(mae_gbr.index(min(mae_gbr)))])
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(locx, locy, mae_gbr)

from sklearn.metrics import mean_absolute_error

gbr_model = GradientBoostingRegressor(learning_rate=0.1, max_depth=5).fit(X_train, y_train)
y_pred = gbr_model.predict(X_test)
gbr_mae_scores = mean_absolute_error(y_test, y_pred)
print(gbr_mae_scores)



import pickle
pickle.dump(model, open('REIT_gbr_model.sav', 'wb'))
