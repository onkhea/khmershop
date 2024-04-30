const apiUrl = "http://localhost:3400/api/items";
const dropdown = document.getElementById("item-dropdown");
const form = document.getElementById("item-form");
const itemCardsContainer = document.getElementById("item-cards");

async function fetchItems() {
  try {
    const response = await fetch(apiUrl);
    const items = await response.json();

    itemCardsContainer.innerHTML = "";
    items.forEach((item) => {
      const card = `
        <div class="card">
          <h3>${item.name}</h3>
          <p class="showcase-badge angle black">Sale</p>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8E8mnf2PWpmU0LKzypVqH3x1-ISIvLuWQrA&usqp=CAU" alt="${item.name}" style="max-width: 100%;">
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Price:</strong> ${item.price} $</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <button class="edit-item-button" onclick="addItem(${item.id})">order</button>
          <button class="add-item-button" onclick="addItem()">detail</button>
          <button onclick="deleteItem(${item.id})">add to cart</button>
        </div>
      `;
      itemCardsContainer.innerHTML += card;

      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;
      dropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayItem(itemId) {
  if (!itemId) return;
  try {
    const response = await fetch(`${apiUrl}/${itemId}`);
    const item = await response.json();

    const itemDetails = `
      Name: ${item.name}
      Description: ${item.description}
      Price: ${item.price}
      Quantity: ${item.quantity}
    `;
    alert(itemDetails);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addItem() {
  // Your add item logic here
  document.getElementById('add-item-modal').style.display = 'block';
}

async function deleteItem(id) {
  if (confirm("Are you sure you want to delete this item?")) {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      fetchItems();
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

function editItem(itemId) {
  const editForm = document.getElementById('add-item-form');
  const editName = document.getElementById('edit-name');
  const editDescription = document.getElementById('edit-description');
  const editPrice = document.getElementById('edit-price');
  const editQuantity = document.getElementById('edit-quantity');
  const editImage = document.getElementById('edit-image');

  // Fetch item details based on itemId
  fetch(`${apiUrl}/${itemId}`)
    .then(response => response.json())
    .then(data => {
      // Populate the form fields with item details
      editName.value = data.name;
      editDescription.value = data.description;
      editPrice.value = data.price;
      editQuantity.value = data.quantity;
      editImage.value = data.image;

      // Display the modal
      document.getElementById('add-item-modal').style.display = 'block';
    })
    .catch(error => console.error("Error:", error));
}

const modal = document.getElementById('add-item-modal');
const closeButton = document.getElementsByClassName('close')[0];
const addItemForm = document.getElementById('add-item-form');

closeButton.onclick = function() {
  modal.style.display = 'none';
}

addItemForm.onsubmit = function(event) {
  event.preventDefault();
  // Add your code here to handle form submission (e.g., sending data to server)
  modal.style.display = 'none'; // Close the modal after form submission
}
// JavaScript code to interact with the header
const searchInput = document.getElementById("searchInput");
const settingsButton = document.getElementById("settingsButton");
const menuButton = document.getElementById("menuButton");

// Add event listeners
searchInput.addEventListener("input", handleSearch);
settingsButton.addEventListener("click", openSettings);
menuButton.addEventListener("click", openMenu);

// Function to handle search input
function handleSearch(event) {
  const searchText = event.target.value.trim();
  // Your search functionality here
}

// Function to open settings
function openSettings() {
  // Your settings functionality here
}

// Function to open menu
function openMenu() {
  // Your menu functionality here
}

// JavaScript code for other functionalities...
function openNewPage() {
    window.open("index1.html", "_self");
  }
fetchItems();
form.addEventListener("submit", addItem);