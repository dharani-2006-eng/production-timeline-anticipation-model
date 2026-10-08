# Production Timeline Anticipation Model 
 
A machine learning project that predicts production delay risk and estimates processing time using manufacturing and production-related data. 
 
## Objective 
 
The main objective of this project is to help anticipate production timelines by: 
 
- Predicting whether a production process is likely to be delayed. 
- Estimating the expected processing time. 
 
## Technologies Used 
 
- Python 
- Pandas 
- Scikit-learn 
- Random Forest 
- Matplotlib 
- Seaborn 
 
## Machine Learning Models 
 
### 1. Random Forest Classifier 
 
Used to predict production delay. 
 
- `0` → Low delay risk 
- `1` → Delay detected 
 
### 2. Random Forest Regressor 
 
Used to predict the processing time in minutes. 
 
## Input Features 
 
The model uses the following production-related features: 
 
- Machine ID 
- Operation Type 
- Material Used 
- Energy Consumption 
- Machine Availability 
- Planned Time 
 
## Data Preprocessing 
 
The project includes: 
 
- Handling missing values 
- Converting date columns 
- Feature engineering 
- Creating delay and planned-time features 
- Encoding categorical variables 
- Splitting data into training and testing sets 
 
## Model Evaluation 
 
The models are evaluated using: 
 
### Classification 
 
- Accuracy 
- Precision 
- Recall 
- F1 Score 
- Confusion Matrix 
 
### Regression 
 
- Mean Absolute Error (MAE) 
- R² Score 
 
## Output 
 
For new production details, the system provides: 
 
- Predicted processing time 
- Delay risk 
- Important factors identified by the Random Forest model 
 
## Project Workflow 
 
```text 
Production Data 
      ↓ 
Data Preprocessing 
      ↓ 
Feature Engineering 
      ↓ 
Train/Test Split 
      ↓ 
Random Forest Models 
      ↓ 
Model Evaluation 
      ↓ 
New Production Input 
      ↓ 
Delay Risk + Processing Time 
kept only this in reed me . next?
## Dataset

The dataset used for model development is not included in this repository.
The model was developed using manufacturing and production-related data.
