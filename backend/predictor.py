from backend.model_loder import model
import torch
from torchvision import transforms
from PIL import Image


class_names = {
    0: "Healthy",
    1: "Mosaic",
    2: "Red Rot",
    3: "Rust",
    4: "Yellow"
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

    return {
        "disease": class_names[clas],
        "confidence": confi
    }
