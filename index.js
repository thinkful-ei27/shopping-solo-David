'use strict';

const STORE = {
  items: [
  {
    id: 1,
    name: "apples",
    checked: false,
    createdAt: Date.now() - 10000000
  },
  {
    id: 2,
    name: "oranges",
    checked: false,
    createdAt: Date.now() - 10000000
  },
  {
    id: 3,
    name: "milk",
    checked: true,
    createdAt: Date.now() - 10000000
  },
  {
    id: 4,
    name: "bread",
    checked: false,
    createdAt: Date.now() - 10000000
  }
  ],
  checkFilter: false,
  filterFor: ''
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}

function filterBySearchVal() {
  return STORE.items.filter(item =>  item.name.includes(STORE.filterFor));
}

function filterOutCheckedItems() {
    return  STORE.items.filter( (item) => item.checked === false);
}

function filterBySearchValAndCheck() {
  return  STORE.items.filter( (item) => item.checked === false && item.name.includes(STORE.filterFor));
}

function handleCheckSelect() {
  $('.js-shoppinglist-check-toggle').on('click',( event => {
    let switchVal = $('.js-shoppinglist-check-toggle').prop('checked');
    if (switchVal) {
      STORE['checkFilter'] = true;
    } else {
      STORE['checkFilter'] = false;
    } 
    console.log('checkSwitch ' + switchVal)
    renderShoppingList();
  }));
}

function checkSwitch(bool) {
  if (bool) {
    STORE['checkFilter'] = true;
  } else {
    STORE['checkFilter'] = false;
  }
}

function renderShoppingList() {
  console.log('renderShoppingList ran');
  let shoppingListItemsString = "";
  if (STORE.checkFilter && STORE.filterFor === '') {
  shoppingListItemsString = generateShoppingItemsString(filterOutCheckedItems());
  } else if (STORE.checkFilter === false && STORE.filterFor === '') {
  shoppingListItemsString = generateShoppingItemsString(STORE.items);
  } else if (STORE.checkFilter && STORE.filterFor !== '') {
  shoppingListItemsString = generateShoppingItemsString(filterBySearchValAndCheck());
  } else if (STORE.checkFilter === false && STORE.filterFor !== '') {
  shoppingListItemsString = generateShoppingItemsString(filterBySearchVal());
  } else {
    console.log('Something is going ****COMPLETELY WRONG****');
  }
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  if (itemName !== '') STORE.items.push({name: itemName, checked: false});
}

function filterShoppingList(itemName) {
  if (itemName !== '') STORE.filterFor = itemName;
}

function handleSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    const filterFor = $('.js-search-box').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    filterShoppingList(filterFor);
    renderShoppingList();
  });
}


function handleSearchSumbit() {
  
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('handleItemCheckClicked ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.shopping-item-delete`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE.items.splice(itemIndex, 1);
    renderShoppingList();
  });
  console.log('handleDeleteItemClicked ran')
}

function handleShoppingList() {
  renderShoppingList();
  handleCheckSelect()
  handleSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);