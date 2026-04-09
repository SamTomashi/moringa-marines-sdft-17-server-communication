/**
 * The 3 pillars of JavaScript:
 * 1. Handling Events: Event listeners(onclick, onsubmit, input, onchange, onkeyup, etc.)
 * 2. DOM(Document Object Model: It's a representation of HTML elements as objects in Javascript) Manipulation:
 * 3. Communicating with the server
 */

fetch("http://localhost:3001/products")
  .then((response) => response.json())
  .then((data) => displayProducts(data));

function displayProducts(data) {
  const container = document.querySelector("#products");

  data.forEach((product, index) => {
    container.innerHTML += `
            <div class="card col-3 p-0 m-1">
                <img src="${product.imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.category}</p>
                    <p class="card-text">${product.brand}</p>
                    <a href="#" class="btn btn-sm btn-primary">Buy</a>
                </div>
            </div>
        `;
  });
}
