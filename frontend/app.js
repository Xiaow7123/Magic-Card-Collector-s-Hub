// this file is the frontend of the application, it is responsible for handling the user interface and sending requests to the backend
const BASE_URL = 'http://localhost:3000/cards';
import webpack from 'webpack';

// This function is called when the DOM is fully loaded
// It adds an event listener to the form submission, which sends a POST request to the backend to add a new card
// It also adds an event listener to the delete button of each card, which sends a DELETE request to the backend to delete the card
document.addEventListener('DOMContentLoaded', function() {
  const cardsTable = document.getElementById('cardsTable');
  if (!cardsTable) {
    console.error('Element with id "cardsTable" not found.');
    return;
  }

  const form = document.getElementById('addCardForm');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting normally

      const cardData = {
        name: document.getElementById('cardName').value,
        rarity: document.getElementById('cardRarity').value,
        type: document.getElementById('cardType').value
      };

      fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      })
      .then(response => response.ok ? response.json() : Promise.reject('Failed to add card'))
      .then(data => {
        console.log('Success:', data);
        addCardToTable(data);
        document.getElementById('cardName').value = '';
        document.getElementById('cardRarity').value = '';
        document.getElementById('cardType').value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  }
});

// This function adds a new row to the table with the card data
// It also adds a delete button to the row, which sends a DELETE request to the backend to delete the card
// If the request is successful, it removes the row from the table
// If the request fails, it logs an error message
function addCardToTable(card) {
  const table = document.getElementById('cardsTable');
  const row = table.insertRow();
  row.insertCell(0).textContent = card.name;
  row.insertCell(1).textContent = card.rarity;
  row.insertCell(2).textContent = card.type;
  const actionCell = row.insertCell(3);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() { deleteCard(card._id, row); };
  actionCell.appendChild(deleteButton);
}

// This function sends a DELETE request to the backend to delete a card
// If the request is successful, it removes the row from the table
// If the request fails, it logs an error message
function deleteCard(cardId, row) {
  fetch(`${BASE_URL}/${cardId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      row.remove();
      console.log('Card deleted successfully');
    } else {
      console.error('Failed to delete card');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

