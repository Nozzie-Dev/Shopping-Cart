// Declare empty cart array
let cart = [];

// Send items to cart array
function addToCart(price, description, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    if (isNaN(quantity) || quantity <= 0) {
        console.log('Invalid quantity:', quantity);
        return;
    }
    
    // Check if item already exists in the cart
    const inCart = cart.findIndex(item => item.name === description);

    if (inCart !== -1) {
        // If item exists, update the quantity
        cart[inCart].quantity += quantity;
        console.log('Updated item quantity:', cart[inCart]);
    } else {
        // If item does not exist, add it to the cart
        const item = {
            name: description,
            quantity: quantity,
            price: price
        };
        cart.push(item);
        console.log('Item added to cart:', item);
    }
    
    console.log('Current cart:', cart);
    updateCartDisplay();
    updateShopButton();
}

// Empty cart array, deleting all items displayed in cart
function clearCart() {
    cart = [];
    console.log('Cart cleared');
    updateCartDisplay();
    updateShopButton();
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

        // Item quantity with increment/decrement buttons
        const itemQuantity = document.createElement('div');
        itemQuantity.className = 'col';
        itemQuantity.innerHTML = `
            <button onclick="decrementCartItem(${index})" class="btn btn-sm btn-secondary">-</button>
            <span id="cartItemQuantity${index}">${item.quantity}</span>
            <button onclick="incrementCartItem(${index})" class="btn btn-sm btn-secondary">+</button>
        `;
        itemDetails.appendChild(itemQuantity);

        // Item price
        const itemPrice = document.createElement('div');
        itemPrice.className = 'col';
        itemPrice.textContent = `R${(item.price).toFixed(2)}`;
        itemDetails.appendChild(itemPrice);

        // Cart manipulation icons from font awesome
        const actionIcons = document.createElement('div');
        actionIcons.className = 'col';
        actionIcons.innerHTML = `
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
    console.log('Cart display updated');
    console.log('Total cost:', totalCost);
    console.log('Total items:', totalItems);
    updateShopButton();
}

// Increase item quantity in cart
function incrementCartItem(index) {
    cart[index].quantity += 1;
    console.log('Incremented item quantity:', cart[index]);
    updateCartDisplay();
    updateShopButton();
}

// Decrease item quantity in cart
function decrementCartItem(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        console.log('Decremented item quantity:', cart[index]);
        updateCartDisplay();
        updateShopButton();
    }
}

// Delete individual item in cart
function deleteCartItem(index) {
    console.log('Deleting item:', cart[index]);
    cart.splice(index, 1);
    updateCartDisplay();
    updateShopButton();
}

// Quantity manipulation in products
document.addEventListener('DOMContentLoaded', () => {
    const buttons = [
        {decrement: 'decrement1', increment: 'increment1', quantity: 'quantity1'},
        {decrement: 'decrement2', increment: 'increment2', quantity: 'quantity2'},
        {decrement: 'decrement3', increment: 'increment3', quantity: 'quantity3'},
        {decrement: 'decrement4', increment: 'increment4', quantity: 'quantity4'},
        {decrement: 'decrement5', increment: 'increment5', quantity: 'quantity5'},
        {decrement: 'decrement6', increment: 'increment6', quantity: 'quantity6'},
        {decrement: 'decrement7', increment: 'increment7', quantity: 'quantity7'},
        {decrement: 'decrement8', increment: 'increment8', quantity: 'quantity8'}
    ];

    buttons.forEach(button => {
        const decrementButton = document.getElementById(button.decrement);
        const incrementButton = document.getElementById(button.increment);
        const quantityInput = document.getElementById(button.quantity);

        decrementButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                console.log(`Decremented ${button.quantity} to ${quantityInput.value}`);
            }
        });

        incrementButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
            console.log(`Incremented ${button.quantity} to ${quantityInput.value}`);
        });
    });
});

//cart as an overlay handling
function toggleCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.style.display = cartOverlay.style.display === 'none' || cartOverlay.style.display === '' ? 'block' : 'none';
    console.log('Cart overlay toggled. New display:', cartOverlay.style.display);
    updateShopButton();
}

function updateShopButton() {
    const cartContents = document.getElementById('cartContents');
    const shopButton = document.getElementById('shopButton');
    if (cartContents.children.length === 0) {
        shopButton.innerText = 'Start Shopping';
    } else {
        shopButton.innerText = 'Continue Shopping';
    }
    console.log('Shop button updated:', shopButton.innerText);
}

function startShopping() {
    toggleCart();
    window.location.href = '#products';
    console.log('Started shopping. Redirected to #products');
}
