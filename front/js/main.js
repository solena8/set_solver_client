import { CardManager } from "./cardManager.js";
import { UIManager } from "./uiManager.js";
import { EventHandlers } from "./eventHandlers.js";

const cardManager = new CardManager();
const uiManager = new UIManager(cardManager);
const eventHandlers = new EventHandlers(cardManager, uiManager);

document.addEventListener("DOMContentLoaded", () => {
  uiManager.generateAllCards(); 
});

window.showImage = () => uiManager.showImage();
window.resetEverything = () => uiManager.resetEverything();
window.findSet = () => eventHandlers.handleFindSet();
