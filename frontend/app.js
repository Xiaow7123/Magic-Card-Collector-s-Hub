// this file is the frontend of the application, it is responsible for handling the user interface and sending requests to the backend
const BASE_URL = window.location.hostname.includes('localhost') 
  ? 'http://localhost:3000' 
  : 'https://magic-card-collector-s-hub.vercel.app';

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addCardForm');
    
    const cardsTable = document.getElementById('cardsTable').getElementsByTagName('tbody')[0];
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('cardName').value;
      const rarity = document.getElementById('cardRarity').value;
      const type = document.getElementById('cardType').value;
  
      const cardData = { name, rarity, type };
  
      fetch(`${BASE_URL}/api/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardData)
      })
      .then(response => response.json())
      .then(newCard => {
        addCardToTable(newCard);
        form.reset(); // Reset form after successful submission
      })
      .catch(error => console.error('Error adding card:', error));
    });
  
    function addCardToTable(card) {
      const row = cardsTable.insertRow();
      row.insertCell(0).textContent = card.name;
      row.insertCell(1).textContent = card.rarity;
      row.insertCell(2).textContent = card.type;
      
      const deleteCell = row.insertCell(3);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteCard(card._id, row));
      deleteCell.appendChild(deleteButton);
    }
  
    function deleteCard(id, row) {
      fetch(`${BASE_URL}/api/delete/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          row.remove();
        } else {
          console.error('Failed to delete card');
        }
      })
      .catch(error => console.error('Error deleting card:', error));
    }
  
    // Load existing cards from the server
    function loadCards() {
      fetch(`${BASE_URL}/api/list`)
      .then(response => response.json())
      .then(cards => cards.forEach(card => addCardToTable(card)))
      .catch(error => console.error('Error loading cards:', error));
    }
  
    loadCards();
  });
  