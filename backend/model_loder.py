import torch 
import joblib
import sklearn
# from torchvision import transforms
# # from pathlib import Path
# from PIL import Image


# def model():
#     model = torch.load('model/sugarcaneacc75.pth')

#     model = model.eval()

#     return model
loaded_model = torch.load(
    "model/sugarcaneacc79.pth",
    weights_only=False,
    map_location=torch.device("cpu")
)

loaded_model.eval()
# 1. Load model

model2 = joblib.load('model/crop_recommendation.pkl') 
model3 = joblib.load('model/crop_recommendation_name.pkl')


def model(img):
   



    # manuly = transforms.Compose([

    # transforms.Resize((224,224)),
    # transforms.ToTensor(),
    # transforms.Normalize(mean=[0.485, 0.456, 0.406],std=[0.229, 0.224, 0.225])
    # ])

    # img = Image.open(img)

    # img = manuly(img)

    # img = img.unsqueeze(0)

    with torch.no_grad():
        output = loaded_model(img)

    return output



def model1(data):

    output = model2.predict([data])
    output = model3.inverse_transform([output])

    return output[0]
    
# 2. model.eval()

# 3. Load one test image









# 4. Apply your training transforms

    
    # print(output.shape)
    # probabilities = torch.softmax(output, dim=1)
    # predicted_class = torch.argmax(probabilities, dim=1)
    # confidence = torch.max(probabilities)
    # print("Class index:", predicted_class.item())
    # print("Confidence:", confidence.item())

# 5. Run inference
# 6. Print prediction

