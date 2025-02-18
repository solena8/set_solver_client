import { CONSTANTS } from './constants.js';

export class CardManager {
  constructor() {
      this.downloadedImages = [];
  }

  canAddCard(imageId) {
      if (this.downloadedImages.length >= CONSTANTS.maxCards) {
          alert("Vous ne pouvez sélectionner que 15 cartes !");
          return false;
      }

      if (this.downloadedImages.includes(imageId)) {
          alert("Cette carte est déjà sélectionnée !");
          return false;
      }

      return true;
  }

  addCard(imageId) {
      if (this.canAddCard(imageId)) {
          this.downloadedImages.push(imageId);
          return true;
      }
      return false;
  }

  removeCard(imageId) {
      this.downloadedImages = this.downloadedImages.filter(id => id !== imageId);
  }

  reset() {
      this.downloadedImages = [];
  }
}
