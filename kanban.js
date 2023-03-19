const todoColumn = document.querySelector('#todo-column');
const doingColumn = document.querySelector('#doing-column');
const doneColumn = document.querySelector('#done-column');
const repoColumn = document.querySelector('#repo-column');

// Function to add a new card to a column
function addCard(cardTitle, column) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = cardTitle;
  card.title = 'Doubleclick to delete card';
  card.draggable = true;
    card.ondragstart = function(event) {
    event.dataTransfer.setData('text/plain', event.target.innerText);
    event.target.setAttribute('dragging', '');
  };
  column.appendChild(card);

  card.addEventListener('dblclick', () => {
    card.remove();
  });
}



const columns = document.querySelectorAll('.column');

for (const column of columns) {
  column.ondragover = function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  column.ondrop = function(event) {
    event.preventDefault();
    const card = document.querySelector('.card[dragging]');
    card.removeAttribute('dragging');
    event.target.closest('.column').appendChild(card);
  };
}




// Function to save the data to the server
function saveData() {
  const todoCards = todoColumn.querySelectorAll('.card');
  const doingCards = doingColumn.querySelectorAll('.card');
  const doneCards = doneColumn.querySelectorAll('.card');
  const repoCards = repoColumn.querySelectorAll('.card');

  const todoData = [];
  const doingData = [];
  const doneData = [];
  const repoData = [];

  for (const card of todoCards) {
    todoData.push(card.innerText);
  }
  for (const card of doingCards) {
    doingData.push(card.innerText);
 }
  for (const card of doneCards) {
    doneData.push(card.innerText);
  }
  
  for (const card of repoCards) {
    repoData.push(card.innerText);
  }

  const data = {
    todo: todoData,
    doing: doingData,
    done: doneData,
    repo: repoData
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'save-data.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}

// Function to load the data from the server
function loadData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'get-data.php', true);
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const data = JSON.parse(this.responseText);
      const todoData = data.todo;
      const doingData = data.doing;
      const doneData = data.done;
      const repoData = data.repo;

      for (const cardTitle of todoData) {
        addCard(cardTitle, todoColumn);
      }
      for (const cardTitle of doingData) {
        addCard(cardTitle, doingColumn);
      }
      for (const cardTitle of doneData) {
        addCard(cardTitle, doneColumn);
      }
            for (const cardTitle of repoData) {
        addCard(cardTitle, repoColumn);
      }
    }
  };
  xhr.send();
}

// Add event listener to add card button
const addCardButton = document.querySelector('#add-card-button');
addCardButton.addEventListener('click', function() {
  const cardTitle = document.querySelector('#card-title').value;
  const columnSelect = document.querySelector('#column-select');
  const selectedColumn = columnSelect.options[columnSelect.selectedIndex].value;

  let column;
  if (selectedColumn === 'todo') {
    column = todoColumn;
  } else if (selectedColumn === 'doing') {
    column = doingColumn;
  } else if (selectedColumn === 'done') {
    column = doneColumn;
  } else if (selectedColumn === 'repo') {
    column = repoColumn;
  }


  addCard(cardTitle, column);
});



// Load the data when the page loads
loadData();

// Save the data every 5 seconds
setInterval(saveData, 5000);

