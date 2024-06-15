import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
  getDatabase,
  ref as dbRef,
  set,
  push,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUXbpad1YMDEJ5gNUg9jCzDXuiY4mFeZ0",
  authDomain: "carswap-77314.firebaseapp.com",
  databaseURL: "https://carswap-77314-default-rtdb.firebaseio.com",
  projectId: "carswap-77314",
  storageBucket: "carswap-77314.appspot.com",
  messagingSenderId: "142942062618",
  appId: "1:142942062618:web:a4640695de4f70f5cf69a3",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

const makeInput = document.getElementById("make");
const colorInput = document.getElementById("color");
const modelInput = document.getElementById("model");
const yearInput = document.getElementById("year");
const priceInput = document.getElementById("price");
const mileageInput = document.getElementById("mileage");
const carListingForm = document.getElementById("car-listing-form");

let imageUrl = "";

const uploadButton = document.getElementById("uploadButton");
uploadButton.addEventListener("click", (e) => {
  e.preventDefault();
  uploadImage();
});

function uploadImage() {
  const file = document.getElementById("imageUpload").files[0];

  if (file) {
    const storageRef = ref(storage, "images/" + file.name);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Image uploaded successfully!");
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url);
            imageUrl = url;
            displayImage(url);
          })
          .catch((error) => {
            console.error("Error getting download URL", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  } else {
    alert("Please select an image to upload.");
  }
}

function displayImage(url) {
  const imageContainer = document.getElementById("imageContainer");
  const img = document.createElement("img");
  img.src = url;
  imageContainer.innerHTML = "";
  imageContainer.appendChild(img);
}

carListingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!imageUrl) {
    alert("Please upload an image before submitting the form.");
    return;
  }

  const dmake = makeInput.value;
  const dcolor = colorInput.value;
  const dmodel = modelInput.value;
  const dyear = yearInput.value;
  const dprice = priceInput.value;
  const dmileage = mileageInput.value;

  const carObject = {
    color: dcolor,
    image: imageUrl,
    make: dmake,
    milage: dmileage,
    model: dmodel,
    price: dprice,
    year: dyear,
  };

  addCarToList(carObject);
});

function addCarToList(carObject) {
  const newCarRef = push(dbRef(database, "carListing"));
  set(newCarRef, carObject)
    .then(() => {
      console.log("Car list data saved to the new node: ", newCarRef);
    })
    .catch((error) => {
      console.log("error : ", error);
    });
}
