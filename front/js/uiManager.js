import { CONSTANTS } from "./constants.js";

export class UIManager {
  constructor(cardManager) {
    this.cardManager = cardManager;
    this.initializeContainers();
  }

  initializeContainers() {
    this.allImagesContainer = document.getElementById("allImages");
    this.resultImagesContainer = document.getElementById("resultImages");
  }

  createCardWithDeleteButton(imageId) {
    const container = document.createElement("div");
    container.classList.add("image-container");

    const img = document.createElement("img");
    img.src = `${CONSTANTS.baseDirectory}${imageId}.PNG`;
    img.alt = `Carte ${imageId}`;
    img.classList.add("selected-card");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = () => {
      container.remove();
      this.cardManager.removeCard(imageId);
    };

    container.appendChild(img);
    container.appendChild(deleteButton);
    return container;
  }

  generateAllCards() {
    CONSTANTS.numbers.forEach((number) => {
      CONSTANTS.shapes.forEach((shape) => {
        CONSTANTS.colors.forEach((color) => {
          CONSTANTS.fillings.forEach((filling) => {
            this.createCardButton(`${number}${shape}${color}${filling}`);
          });
        });
      });
    });
  }

  handleCardClick(imageId, button) {
    if (this.cardManager.canAddCard(imageId)) {
      this.addToResult(imageId);
      this.cardManager.addCard(imageId);
      // Ajouter la classe à l'image cliquée
      button.querySelector(".card-image").classList.add("card-selected");
    }
  }

  createCardButton(imageId) {
    const button = document.createElement("button");
    button.classList.add("image-button");

    const img = document.createElement("img");
    img.src = `${CONSTANTS.baseDirectory}${imageId}.PNG`;
    img.alt = `Carte ${imageId}`;
    img.classList.add("card-image");

    button.appendChild(img);
    button.addEventListener("click", () =>
      this.handleCardClick(imageId, button)
    );
    this.allImagesContainer.appendChild(button);
  }

  addToResult(imageId) {
    const cardElement = this.createCardWithDeleteButton(imageId);
    this.resultImagesContainer.appendChild(cardElement);
  }

  showFoundSetImages(data) {
    const foundSetContainer = document.getElementById("foundSetContainer");
    foundSetContainer.innerHTML = "";

    if (!data || data === null || (Array.isArray(data) && data.length === 0)) {
      alert("Aucun set valide trouvé dans ces cartes !");
      return;
    }

    const setContainer = document.createElement("div");
    setContainer.classList.add("found-set-container");

    const setTitle = document.createElement("h3");
    setTitle.textContent = "Set trouvé :";
    setContainer.appendChild(setTitle);

    const setCardsContainer = document.createElement("div");
    setCardsContainer.classList.add("set-cards");

    data.forEach((cardId) => {
      const container = document.createElement("div");
      container.classList.add("image-container");

      const img = new Image();
      img.src = `${CONSTANTS.baseDirectory}${cardId}.PNG`;
      img.alt = `Set card ${cardId}`;
      img.classList.add("selected-card");

      container.appendChild(img);
      setCardsContainer.appendChild(container);
    });

    setContainer.appendChild(setCardsContainer);
    foundSetContainer.appendChild(setContainer);
  }

  resetEverything() {
    this.resultImagesContainer.innerHTML = "";
    const foundSetContainer = document.getElementById("foundSetContainer");
    foundSetContainer.innerHTML = "";
    document.querySelectorAll(".card-selected").forEach((img) => {
      img.classList.remove("card-selected");
    });
    this.cardManager.reset();
  }
}
