// Define the base directory where images are located
let baseDirectory = "set_images/";

// Array to keep track of downloaded images
let downloadedImages = [];

// Define the order of form navigation
const formGroups = ["selected-number", "selected-shape", "selected-color", "selected-filling"];
let currentGroupIndex = 0;

// Initialize keyboard navigation when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Select first radio button of first group
    const firstRadio = document.querySelector(`input[name="${formGroups[0]}"]`);
    if (firstRadio) {
        firstRadio.checked = true;
        firstRadio.focus();
    }

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyboardNavigation);
});

// Handle keyboard navigation through radio buttons
function handleKeyboardNavigation(e) {
    const currentGroup = formGroups[currentGroupIndex];
    const radioButtons = document.getElementsByName(currentGroup);
    let currentRadio = Array.from(radioButtons).findIndex(radio => radio.checked);

    switch(e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
            e.preventDefault();
            if (currentRadio < radioButtons.length - 1) {
                radioButtons[currentRadio + 1].checked = true;
                radioButtons[currentRadio + 1].focus();
            }
            break;

        case 'ArrowUp':
        case 'ArrowLeft':
            e.preventDefault();
            if (currentRadio > 0) {
                radioButtons[currentRadio - 1].checked = true;
                radioButtons[currentRadio - 1].focus();
            }
            break;

        case 'Enter':
            e.preventDefault();
            if (currentGroupIndex < formGroups.length - 1) {
                // Move to next group
                currentGroupIndex++;
                const nextRadio = document.querySelector(`input[name="${formGroups[currentGroupIndex]}"]`);
                if (nextRadio) {
                    nextRadio.checked = true;
                    nextRadio.focus();
                }
            } else {
                // If all groups are selected, show the image
                showImage();
                // Reset to first group
                currentGroupIndex = 0;
                const firstRadio = document.querySelector(`input[name="${formGroups[0]}"]`);
                if (firstRadio) {
                    firstRadio.checked = true;
                    firstRadio.focus();
                }
            }
            break;
    }
}

// Function to display the selected image
function showImage() {
    // Check maximum number of cards
    if (downloadedImages.length >= 15) {
        alert("You can only download up to 15 cards.");
        return;
    }

    // Get selected values
    const values = formGroups.map(group => getSelectedValue(group));
    if (values.includes("")) {
        alert("Please select values for all attributes.");
        return;
    }

    // Generate image ID
    const imageId = values.join("");

    // Check for duplicate
    if (downloadedImages.includes(imageId)) {
        alert("This image has already been downloaded.");
        return;
    }

    // Create and load image
    const img = new Image();
    img.src = baseDirectory + imageId + ".PNG";
    img.alt = "Set card " + imageId;
    img.className = "set-card-images";

    img.onload = function() {
        const container = document.getElementById("imageContainer");
        
        // Add image
        container.appendChild(img);

        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.className = "delete-button";
        deleteButton.onclick = () => {
            container.removeChild(img);
            container.removeChild(deleteButton);
            downloadedImages.splice(downloadedImages.indexOf(imageId), 1);
        };
        container.appendChild(deleteButton);

        // Track downloaded image
        downloadedImages.push(imageId);
    };

    img.onerror = () => {
        console.error("Error loading image:", img.src);
        alert("Error loading image: " + img.src);
    };
}

// Get selected radio button value
function getSelectedValue(groupName) {
    const radio = document.querySelector(`input[name="${groupName}"]:checked`);
    return radio ? radio.value : "";
}

// Reset form and select first radio button of first group
function resetForm() {
    currentGroupIndex = 0;
    formGroups.forEach(groupName => {
        const firstRadio = document.querySelector(`input[name="${groupName}"]`);
        if (firstRadio) {
            firstRadio.checked = true;
        }
    });
    // Focus on first group's first radio
    const firstGroupRadio = document.querySelector(`input[name="${formGroups[0]}"]`);
    if (firstGroupRadio) {
        firstGroupRadio.focus();
    }
}

function findSet() {
  if (downloadedImages.length < 3) {
      alert("Please select at least 3 cards to find a set.");
      return;
  }

  const formatCards = downloadedImages.join(",");
  const apiUrl = `http://127.0.0.1:8000/cards/${formatCards}`;

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          console.log("data:",data);
  
          // Handle the response directly
          showFoundSetImages(data);
      })
      .catch(error => {
          console.error("Error:", error);
          alert("Error occurred while finding set");
      });
}


function showFoundSetImages(data) {
  const divImages = document.getElementById("resultImages");
  divImages.innerHTML = "";
  
  // Check if data is null, undefined, or empty array
  if (!data || data === null || (Array.isArray(data) && data.length === 0)) {
      alert("No valid set found in these cards!");
      return;
  }
  
  // Create images only if we have valid data
  data.forEach(cardId => {
      const img = new Image();
      img.src = baseDirectory + cardId + ".PNG";
      img.alt = "Set card " + cardId;
      img.className = "set-card-images";
      divImages.appendChild(img);
  });
}





// Reset everything and focus on first radio button
function resetEverything() {
    document.getElementById("resultImages").innerHTML = "";
    document.getElementById("imageContainer").innerHTML = "";
    downloadedImages = [];
    resetForm();
}
