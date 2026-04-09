/**
 * The 3 pillars of JavaScript:
 * 1. Handling Events: Event listeners(onclick, onsubmit, input, onchange, onkeyup, etc.)
 * 2. DOM(Document Object Model: It's a representation of HTML elements as objects in Javascript) Manipulation:
 * 3. Communicating with the server
 */

document.addEventListener("DOMContentLoaded", function(){
  const frm = document.querySelector("#frm-product")
  handleSubmit(frm)
  getProducts()

})

function getProducts(){
  fetch("http://localhost:3001/products", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})
  .then((response) => response.json())
  .then((data) => displayProducts(data));
}

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
                    <a href="#" class="btn btn-sm btn-danger">Delete Product</a>
                </div>
            </div>
        `;
  });
}

function handleSubmit(frm){
  frm.addEventListener("submit", (event)=> {
    event.preventDefault();

    const product = {
      name: event.target.name.value,
      price: event.target.price.value,
      quantity: event.target.qty.value,
      imageUrl: event.target.imageUrl.value,
      category: event.target.category.value,
      brand: event.target.brand.value
    }
    createProduct(product)

  })
}

function createProduct(product){
fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(product)
    })
}


