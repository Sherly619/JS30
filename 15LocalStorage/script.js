const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

const items = JSON.parse(localStorage.getItem('items')) || [];

function addTask(e) {
  e.preventDefault();
  const inputValue = this.querySelector('[name=item]').value;
  const item = {
    inputValue,
    done: false
  }
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items))
  this.reset();
  showTask();
}

function showTask() {
  itemsList.innerHTML = items.map((item, index) => {
    return `
    <li>
      <input type="checkbox" data-index=${index} id="item${index}" ${item.done ? 'checked' : ''}>
      <label for="item${index}">${item.inputValue}</label>
    </li>
    `;
  }).join('');

}
function toggleDone(e) {
  if (e.target.localName === 'input') {
    const input = e.target
    items[input.dataset.index].done = input.checked;
    localStorage.setItem('items', JSON.stringify(items))
  }
}

addItems.addEventListener('submit', addTask);
itemsList.addEventListener('click', toggleDone)
showTask();
