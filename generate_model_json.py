import os
import joblib
import json
import numpy as np

# Bazna putanja (folder gde je skripta)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, 'model', 'random_forest_dijabetes.pkl')
scaler_path = os.path.join(BASE_DIR, 'model', 'scaler.pkl')
output_path = os.path.join(BASE_DIR, 'model', 'model.json')

# Učitavanje modela i skalera
rf = joblib.load(model_path)
scaler = joblib.load(scaler_path)

# Ispis tipa i atributa modela
print(f"Tip modela: {type(rf)}")
print("Dostupni atributi modela:")
for attr in dir(rf):
    print(" -", attr)

# Funkcija za serijalizaciju stabla
def serialize_tree(tree):
    tree_ = tree.tree_
    nodes = []
    thresholds = []
    features = []

    for i in range(tree_.node_count):
        node = {
            "left_child": int(tree_.children_left[i]),
            "right_child": int(tree_.children_right[i])
        }
        nodes.append(node)
        thresholds.append(float(tree_.threshold[i]))
        features.append(int(tree_.feature[i]))

    values = tree_.value.squeeze(axis=1).tolist()  # [n_nodes, n_classes]

    return {
        "nodes": nodes,
        "thresholds": thresholds,
        "features": features,
        "values": values
    }

# Provera da li model ima 'estimators_' atribut
if hasattr(rf, 'estimators_'):
    print("\nModel ima atribut 'estimators_', nastavljam sa serijalizacijom stabala...")
    trees_json = [serialize_tree(estimator) for estimator in rf.estimators_]

    model_json = {
        "n_classes": int(rf.n_classes_),
        "scaler": {
            "mean": scaler.mean_.tolist(),
            "scale": scaler.scale_.tolist()
        },
        "trees": trees_json
    }

    with open(output_path, 'w') as f:
        json.dump(model_json, f)
    print(f"model.json je uspešno generisan u {output_path}")

else:
    print("\n⚠️ Model NEMA atribut 'estimators_'. Nemoguće generisati JSON.")
