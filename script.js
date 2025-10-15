const container = document.getElementById("container");
let animalsData = [];
const url = "https://extinct-api.herokuapp.com/api/v1/animal/20";
console.log("Fetching data from:", url);

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log("Data fetched successfully:", data);
    animalsData = data.data;
    showAnimals(animalsData);
  })
  .catch((error) => console.error("Error fetching data:", error));

const showAnimals = (animals) => {
  console.log("Displaying animals:", animals[0].binomialName);
  container.innerHTML += `
             <div class="card">
              <h2>${animals[0].binomialName}</h2>
              <h3>${animals[0].commonName}</h3>
              <p>Year Extinct: ${animals[0].lastRecord}</p>
              <p>Location: ${animals[0].location}</p>
              <p>Details: ${animals[0].shortDesc}</p>
              <img src="${animals[0].imageSrc}" alt="${animals[0].commonName}" />
            </div>
          `;

  animals.map((animal) => {
    container.innerHTML += `
        <div class="card">
         <h2>${animal.binomialName}</h2>
         <h3>${animal.commonName}</h3>
         <p>Year Extinct: ${animal.lastRecord}</p>
         <p>Location: ${animal.location}</p>
         <p>Details: ${animal.shortDesc}</p>
         <img src="${animal.imageSrc}" alt="${animals[0].commonName}" />
       </div>
     `;
  });
};
