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
const recommendBtn = document.getElementById("recommendBtn");
const cropResult = document.getElementById("cropResult");
const cropName = document.getElementById("cropName");

recommendBtn.addEventListener("click", async function () {

    const data = {
        N: Number(document.getElementById("N").value),
        P: Number(document.getElementById("P").value),
        K: Number(document.getElementById("K").value),
        temperature: Number(document.getElementById("temperature").value),
        humidity: Number(document.getElementById("humidity").value),
        ph: Number(document.getElementById("ph").value),
        rainfall: Number(document.getElementById("rainfall").value)
    };

    try {

        const response = await fetch(
            "https://sugarcane-disease-detection-system.onrender.com/crop",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error("Crop recommendation failed");
        }

        const crop = await response.json();

        cropName.textContent = crop;

        cropResult.classList.remove("hidden");

    } catch (error) {

        console.error(error);

        alert("Could not connect to the AI server.");

    }

});
const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        return;
    }

    locationBtn.textContent = "Getting weather...";

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            console.log("Location:", lat, lon);

            try {

                const url =
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Weather API failed");
                }

                const weather = await response.json();

                console.log("Weather:", weather);

                // Fill boxes
                document.getElementById("temperature").value =
                    weather.current.temperature_2m;

                document.getElementById("humidity").value =
                    weather.current.relative_humidity_2m;

                document.getElementById("rainfall").value =
                    weather.current.precipitation;

                locationBtn.textContent = "📍 Weather Loaded";

            } catch (error) {

                console.error(error);
                alert("Weather data could not be loaded.");

                locationBtn.textContent = "📍 Use My Location";
            }
        },

        (error) => {

            console.error(error);

            alert(
                "Location permission is required. Please allow location access."
            );

            locationBtn.textContent = "📍 Use My Location";
        }
    );

});
// =============================
// CROP POPUP OPEN / CLOSE
// =============================

const cropToggle = document.getElementById("cropToggle");
const cropPanel = document.getElementById("cropPanel");
const cropClose = document.getElementById("cropClose");


cropToggle.addEventListener("click", function () {

    cropPanel.classList.toggle("open");

});


cropClose.addEventListener("click", function () {

    cropPanel.classList.remove("open");

});