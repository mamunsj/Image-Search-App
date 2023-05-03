const accesKey = "6HTxrR1xR1NHor2hQvRrfV4dSj6laPPVbEGMxMrvVR4";
const form = document.querySelector("form");
const searchInput = document.querySelector("#search-img");
const imagesContainer = document.querySelector(".imagesContainer");
const showMoreBtn = document.querySelector("#show-more-btn");
const showless = document.getElementById("show-more-btn2");
let inputData = "";
let page = 1;

async function searchImage() {
  inputData = searchInput.value;
  console.log(inputData);
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesKey}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  if (page === 1) {
    imagesContainer.innerHTML = "";
  }

  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("image");
    const img = document.createElement("img");
    img.src = result.urls.small;
    img.alt = result.alt_description;
    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    imgLink.textContent = result.alt_description;

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(imgLink);
    imagesContainer.appendChild(imageWrapper);
  });
  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  searchImage();
  page = 1;
});

showMoreBtn.addEventListener("click", function () {
  searchImage();
});
