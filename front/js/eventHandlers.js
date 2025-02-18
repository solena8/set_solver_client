
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
    document.getElementById("imageContainer").innerHTML = "";
    this.cardManager.reset();
  }

  async handleFindSet() {
    if (this.cardManager.downloadedImages.length < 3) {
      alert("Veuillez sélectionner au moins 3 cartes.");
      return;
    }

    try {
      const formatCards = this.cardManager.downloadedImages.join(",");
      const response = await fetch(
        `http://127.0.0.1:8000/cards/${formatCards}`
      );

      if (!response.ok) {
        throw new Error("Erreur réseau");
      }

      const data = await response.json();
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
