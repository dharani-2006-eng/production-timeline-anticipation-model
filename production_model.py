# Import libraries
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    mean_absolute_error,
    r2_score,
    confusion_matrix
)

# Load dataset
df = pd.read_csv("data/production_data.csv")
df = df.dropna()

# Convert date columns
for col in ['Scheduled_Start', 'Scheduled_End', 'Actual_Start', 'Actual_End']:
    df[col] = pd.to_datetime(df[col])

# Feature engineering
df['Delay_Time'] = (
    (df['Actual_End'] - df['Scheduled_End']).dt.total_seconds() / 60
)

df['Delay'] = (df['Delay_Time'] > 5).astype(int)

df['Planned_Time'] = (
    (df['Scheduled_End'] - df['Scheduled_Start']).dt.total_seconds() / 60
)

# Encode categorical variables
df['Machine_ID'] = df['Machine_ID'].astype('category').cat.codes
df['Operation_Type'] = df['Operation_Type'].astype('category').cat.codes

# Select important features
features = [
    'Machine_ID',
    'Operation_Type',
    'Material_Used',
    'Energy_Consumption',
    'Machine_Availability',
    'Planned_Time'
]

# Define inputs and targets
X = df[features]
y_delay = df['Delay']
y_time = df['Processing_Time']

# Show class distribution
print("\n--- CLASS DISTRIBUTION ---")
print(df['Delay'].value_counts())

# Split dataset
X_train, X_test, y_delay_train, y_delay_test, y_time_train, y_time_test = train_test_split(
    X,
    y_delay,
    y_time,
    test_size=0.2,
    random_state=42
)

# Create models
delay_model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42,
    class_weight='balanced'
)

time_model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# Train models
delay_model.fit(X_train, y_delay_train)
time_model.fit(X_train, y_time_train)

# Perform cross validation
print("\n--- CROSS VALIDATION ---")
print(
    "Delay CV F1:",
    cross_val_score(
        delay_model,
        X,
        y_delay,
        cv=5,
        scoring='f1'
    ).mean()
)

print(
    "Time CV R²:",
    cross_val_score(
        time_model,
        X,
        y_time,
        cv=5,
        scoring='r2'
    ).mean()
)

# Make predictions
y_pred_delay = delay_model.predict(X_test)
y_pred_time = time_model.predict(X_test)

# Evaluate model performance
print("\n--- MODEL EVALUATION ---")
print("Accuracy:", accuracy_score(y_delay_test, y_pred_delay))
print("Precision:", precision_score(y_delay_test, y_pred_delay))
print("Recall:", recall_score(y_delay_test, y_pred_delay))
print("F1 Score:", f1_score(y_delay_test, y_pred_delay))
print("MAE:", mean_absolute_error(y_time_test, y_pred_time))
print("R² Score:", r2_score(y_time_test, y_pred_time))

# Plot confusion matrix
cm = confusion_matrix(y_delay_test, y_pred_delay)

plt.figure(figsize=(5, 4))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')

plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()

# Plot feature importance
feat_imp = pd.Series(
    delay_model.feature_importances_,
    index=features
).sort_values()

plt.figure(figsize=(6, 4))
feat_imp.plot(kind='barh')

plt.title("Feature Importance")
plt.show()

# Take user input
print("\nEnter production details:\n")

try:
    machine_id = int(input("Machine ID (0-10): "))
    operation_type = int(input("Operation Type (0-2): "))
    material = float(input("Material Used (kg): "))
    energy = float(input("Energy Consumption: "))
    availability = float(input("Machine Availability (0-100): "))
    planned_time = float(input("Planned Time (minutes): "))

    # Validate inputs
    if machine_id < 0 or machine_id > 10:
        raise ValueError("Invalid Machine ID")

    if operation_type < 0 or operation_type > 2:
        raise ValueError("Invalid Operation Type")

    if material < 0 or energy < 0:
        raise ValueError("Values cannot be negative")

    if availability < 0 or availability > 100:
        raise ValueError("Invalid Availability")

    if planned_time <= 0:
        raise ValueError("Invalid Planned Time")

except ValueError as e:
    print(f"\nInvalid Input: {e}")
    exit()

# Create input dataframe
user_df = pd.DataFrame(
    [[
        machine_id,
        operation_type,
        material,
        energy,
        availability,
        planned_time
    ]],
    columns=features
)

# Predict results
delay = delay_model.predict(user_df)[0]
time = time_model.predict(user_df)[0]

# Define reason mapping
reason_map = {
    'Machine_Availability': "Low machine availability",
    'Energy_Consumption': "High energy consumption",
    'Material_Used': "Excess material usage",
    'Planned_Time': "Poor planning time",
    'Machine_ID': "Machine performance issue",
    'Operation_Type': "Complex operation type"
}

# Find top contributing features
importance = delay_model.feature_importances_

top_features = [
    features[i]
    for i in importance.argsort()[-2:]
]

reason = ", ".join(
    [reason_map.get(f, f) for f in top_features]
)

# Display output
print("\n--- RESULT ---")
print(f"Processing Time: {time:.2f} minutes")

if delay:
    print("Delay Risk: HIGH")
    print(f"Reason: {reason}")
else:
    print("Delay Risk: LOW")
    print("Safe Schedule")
