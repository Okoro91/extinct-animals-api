const container = document.getElementById("container");
const loadMoreBtn = document.getElementById("load-more-btn");
const img = "./img/animal.jpeg";
let startingIndex = 0;
let endingIndex = 8;
let animalsData = [];
const url = "https://extinct-api.herokuapp.com/api/v1/animal/200";
console.log("Fetching data from:", url);

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log("Data fetched successfully:", data);
    animalsData = data.data;
    showAnimals(animalsData.slice(startingIndex, endingIndex));
  })
  .catch((error) => console.error("Error fetching data:", error));

const loadMoreAnimals = () => {
  startingIndex += 8;
  endingIndex += 8;
  const nextAnimals = animalsData.slice(startingIndex, endingIndex);
  showAnimals(nextAnimals);
  if (endingIndex >= animalsData.length) {
    loadMoreBtn.style.display = "none";
  }
};

const showAnimals = (animals) => {
  animals.map((animal) => {
    container.innerHTML += `
        <div class="card">
        <img src="${
          animal.imageSrc === "false" ? img : animal.imageSrc
        }" alt="${animal.commonName}" />
         <h2>${animal.binomialName}</h2>
         <h3>${animal.commonName}</h3>
         <p>Year Extinct: ${animal.lastRecord}</p>
         <p>Location: ${animal.location}</p>
         <p>Details: ${
           animal.shortDesc.length === 100
             ? animal.shortDesc
             : animal.shortDesc.slice(0, 100) + "..."
         }</p>
         
       </div>
     `;
  });
};

loadMoreBtn.addEventListener("click", loadMoreAnimals);
