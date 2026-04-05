let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.filter(item => !item.name.toLowerCase());
localStorage.setItem("cart", JSON.stringify(cart));

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    renderCart();
}

function renderCart() {
    let cartList = document.getElementById("cart-list");
    if (!cartList) return;

    cartList.innerHTML = "";

    if(cart.length === 0){
        cartList.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `${item.name} - Php ${item.price}`;
        cartList.appendChild(div);
    });
}

const clearButton = document.createElement("button");
clearButton.innerText = "Clear Cart";
clearButton.style.marginTop = "20px";
clearButton.onclick = () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
};
document.body.appendChild(clearButton);

renderCart();