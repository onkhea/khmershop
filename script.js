// JavaScript code for handling edit form submission

const editForm = document.getElementById('edit-form');

// Function to handle form submission (edit item)
async function editItem(event) {
  event.preventDefault();

  const formData = new FormData(editForm);
  const editedItem = {
    name: formData.get('edit-name'),
    description: formData.get('edit-description'),
    price: formData.get('edit-price'),
    quantity: formData.get('edit-quantity'),
    image: formData.get('edit-image')
  };

  // Assuming you have an API endpoint for updating items
  const itemId = ''; // Set the ID of the item being edited
  const apiUrl = `http://localhost:3400/api/items/${itemId}`;

  try {
    await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedItem)
    });
    alert('Item updated successfully!');
    // Optionally, you can redirect the user or update the UI
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while updating the item. Please try again.');
  }
}

// Event listener for form submission
editForm.addEventListener('submit', editItem);
