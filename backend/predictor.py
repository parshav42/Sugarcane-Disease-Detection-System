import json
from pathlib import Path

from backend.model_loder import model
import torch
from torchvision import transforms
from PIL import Image


class_names = {
    0: "BrownRust",
    1: "Dried Leaves",
    2: "HealthyLeaves",
    3: "mites",
    4: "ReadSpot",
    5: "YellowLeaf",
    6: "mawa"
}

detail_path = Path(__file__).resolve().parents[2] / "crop.json"
if not detail_path.exists():
    detail_path = Path(__file__).resolve().parents[1] / "crop.json"

with detail_path.open(encoding="utf-8") as detail_file:
    disease_details = json.load(detail_file)

disease_key_aliases = {
    "BrownRust": "RedSpot",
    "Dried Leaves": "DriedLeaves",
    "HealthyLeaves": "HealthyLeaves",
    "mites": "Mites",
    "ReadSpot": "RedSpot",
    "YellowLeaf": "YellowLeaf",
    "mawa": "mawa"
}



manuly = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


def predict(img):
    print("PREDICTOR IMG TYPE:", type(img))

    img = Image.open(img)

    img = manuly(img)

    img = img.unsqueeze(0)

    with torch.no_grad():
        p = model(img)

    pro = torch.softmax(p, dim=1)

    con = torch.max(pro)

    preclss = torch.argmax(pro, dim=1)

    clas = preclss.item()

    confi = con.item() * 100
    predicted_disease = class_names[clas]
    is_confident = confi > 80
    disease_key = disease_key_aliases.get(predicted_disease, predicted_disease)

    return {
        "disease": predicted_disease if is_confident else "Disease not found",
        "confidence": confi,
        "is_confident": is_confident,
        "details": disease_details.get(disease_key, {}) if is_confident else {}
    }
