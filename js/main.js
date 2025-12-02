(() => {

  // variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector("#loader");
  const materialImages = {
    "Precision-Crafted Polymers": "plastic.png",
    "Luxurious Silicone Harmony": "silicone.png",
    "Rubberized Cables": "cable.png",
    "Enhanced Comfort Sensors": "sensor.png",
    "Artistic Mesh Guard": "mesh.png"
  };

  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        console.log(infoBoxes);

        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadInfoBoxes();
  function loadMaterialInfo() {

    // shows the loader
    loader.classList.remove("hidden");

    // clears any previous content
    materialList.innerHTML = "";

    // this is the api url https://swiftpixel.com/earbud/api/materials
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materials => {
        console.log(materials);

        materials.forEach(material => {
          // clones the template li with img, h3 and p inside
          const clone = materialTemplate.content.cloneNode(true);

          // sets the material image (bonus)
          const materialImg = clone.querySelector(".material-image");
          if (materialImg && materialImages[material.heading]) {
            materialImg.src = `images/${materialImages[material.heading]}`;
            materialImg.alt = material.heading;
          }

          // populates the clone template text
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          // appends the template to the list
          materialList.appendChild(clone);
        });

        // hides the loader when done
        loader.classList.add("hidden");
      })
      .catch(error => {
        console.log(error);

        // hides the loader if something went wrong
        loader.classList.add("hidden");

        // shows a user-friendly error message in the DOM
        materialList.innerHTML = `
          <li class="error-message">
            Data failed to load. Please check your connection or try again later.
          </li>
        `;
      });
  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event listeners
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();
