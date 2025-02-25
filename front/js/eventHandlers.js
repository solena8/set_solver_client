import { ApiService } from "./api.js";

export class EventHandlers {
  constructor(cardManager, uiManager) {
    this.cardManager = cardManager;
    this.uiManager = uiManager;
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document
      .querySelector('button[onclick="resetEverything()"]')
      .addEventListener("click", () => this.handleReset());
  }

  handleReset() {
    document.getElementById("resultImages").innerHTML = "";
    this.cardManager.reset();
  }

  async handleFindSet() {
    if (this.cardManager.downloadedImages.length < 3) {
      alert("Veuillez sélectionner au moins 3 cartes.");
      return;
    }

    try {
      const formatCards = this.cardManager.downloadedImages.join(",");
      const data = await ApiService.findSet(formatCards);
      this.uiManager.showFoundSetImages(data);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la recherche d'un set");
    }
  }

  handleCardClick(imageId) {
    if (this.cardManager.canAddCard(imageId)) {
      this.uiManager.addToResult(imageId);
    }
  }
}