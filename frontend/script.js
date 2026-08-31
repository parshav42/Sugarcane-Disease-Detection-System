const imageInput = document.getElementById("imageInput");
const detectBtn = document.getElementById("detectBtn");

const previewContainer =
    document.getElementById("previewContainer");

const previewImage =
    document.getElementById("previewImage");

const loading =
    document.getElementById("loading");

const result =
    document.getElementById("result");

const diseaseName =
    document.getElementById("diseaseName");

const confidenceText =
    document.getElementById("confidenceText");

const confidenceBar =
    document.getElementById("confidenceBar");

const resetBtn =
    document.getElementById("resetBtn");


let selectedFile = null;


imageInput.addEventListener("change", function () {

    selectedFile = imageInput.files[0];

    if (!selectedFile) {
        return;
    }

    const imageURL =
        URL.createObjectURL(selectedFile);

    previewImage.src = imageURL;

    previewContainer.classList.remove("hidden");

});


detectBtn.addEventListener("click", async function () {

    if (!selectedFile) {

        alert("Please choose a sugarcane leaf image.");

        return;
    }


    const formData = new FormData();

    formData.append("file", selectedFile);


    loading.classList.remove("hidden");

    result.classList.add("hidden");

    detectBtn.disabled = true;


    try {

        const response = await fetch(
            "https://sugarcane-disease-detection-system.onrender.com/upload",
            {
                method: "POST",
                body: formData
            }
        );


        if (!response.ok) {

            throw new Error(
                "Prediction request failed."
            );

        }


        const data = await response.json();


        const disease =
            data.disease;

        const confidence =
            Number(data.confidence);


        diseaseName.textContent =
            disease;


        confidenceText.textContent =
            confidence.toFixed(2) + "%";


        confidenceBar.style.width =
            confidence + "%";


        result.classList.remove("hidden");

    }

    catch (error) {

        console.error(error);

        alert(
            "Could not connect to the AI server."
        );

    }

    finally {

        loading.classList.add("hidden");

        detectBtn.disabled = false;

    }

});


resetBtn.addEventListener("click", function () {

    selectedFile = null;

    imageInput.value = "";

    previewImage.src = "";

    previewContainer.classList.add("hidden");

    result.classList.add("hidden");

    confidenceBar.style.width = "0%";

});