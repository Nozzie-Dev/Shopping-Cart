//Declare empty cart array
let cart = [];

// Send items to cart array
function addToCart(price, description, quantityId) {
    const quantity = document.getElementById(quantityId).value;
    const item = {
        name: description,
        quantity: parseInt(quantity),
        price: price
    };
    cart.push(item);
    updateCartDisplay();
}

// Empty cart array, deleting all items displayed in cart
function clearCart() {
    cart = [];
    updateCartDisplay();
}

// Create items in cart
function updateCartDisplay() {
    const cartContents = document.getElementById('cartContents');
    cartContents.innerHTML = '';
    let totalCost = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        // Item details
        const itemDetails = document.createElement('div');
        itemDetails.className = 'row d-flex justify-content-between align-items-center';

        // Item name
        const itemName = document.createElement('div');
        itemName.className = 'col';
        itemName.textContent = item.name;
        itemDetails.appendChild(itemName);

        // Item quantity
        const itemQuantity = document.createElement('div');
        itemQuantity.className = 'col';
        itemQuantity.textContent = item.quantity;
        itemDetails.appendChild(itemQuantity);

        // Item price
        const itemPrice = document.createElement('div');
        itemPrice.className = 'col';
        itemPrice.textContent = item.price * item.quantity;
        itemDetails.appendChild(itemPrice);

        // Cart manipulation icons from font awesome
        const actionIcons = document.createElement('div');
        actionIcons.className = 'col';
        actionIcons.innerHTML = `
            <i class="fas fa-edit mr-3" onclick="editCartItem(${index})"></i>
            <i class="fas fa-trash" onclick="deleteCartItem(${index})"></i>
        `;
        itemDetails.appendChild(actionIcons);

        li.appendChild(itemDetails);
        cartContents.appendChild(li);

        totalCost += item.price * item.quantity;
        totalItems += item.quantity;
    });

    document.getElementById('totalCost').textContent = totalCost.toFixed(2);
    document.getElementById('itemCount').textContent = totalItems;
}

// Update individual item in cart
function editCartItem(index) {
    const item = cart[index];
    const newQuantity = prompt(`Edit quantity for ${item.name}:`, item.quantity);
    if (newQuantity !== null && !isNaN(newQuantity) && newQuantity > 0) {
        cart[index].quantity = parseInt(newQuantity);
        updateCartDisplay();
    }
}

// Delete individual item in cart
function deleteCartItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Quantity manipulation in products
document.addEventListener('DOMContentLoaded', () => {
    const buttons = [
        {decrement: 'decrement1', increment: 'increment1', quantity: 'quantity1'},
        {decrement: 'decrement2', increment: 'increment2', quantity: 'quantity2'},
        {decrement: 'decrement3', increment: 'increment3', quantity: 'quantity3'}
    ];

    buttons.forEach(button => {
        const decrementButton = document.getElementById(button.decrement);
        const incrementButton = document.getElementById(button.increment);
        const quantityInput = document.getElementById(button.quantity);

        decrementButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        incrementButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    });
});
