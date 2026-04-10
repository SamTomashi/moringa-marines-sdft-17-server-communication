
document.addEventListener("DOMContentLoaded", async function(){
  const frm = document.querySelector("#frm-product")
  handleSubmit(frm)
  const products = await getProducts()

  displayProducts(products)
  populateProducts(products)

  handleProductChange()

  handleSubmitUpdatedProduct()

})

function populateProductForm(product){
  const frmUpdate = document.querySelector("#frm-update-product")
  frmUpdate.name.value = product.name
   frmUpdate.price.value = product.price
    frmUpdate.imageUrl.value = product.imageUrl
}


function handleProductChange(){
    const productSelectBox = document.querySelector("#productSelectBox")
    productSelectBox.addEventListener("change", async function(event){
      const product = await getProduct(event.target.value)
      populateProductForm(product)
    })

}
 

function populateProducts(products){
    const productSelectBox = document.querySelector("#productSelectBox")

    products.forEach((product)=> {
      productSelectBox.innerHTML += `
              <option value="${product.id}">${product.name}</option>
  `
    })
}

function getProduct(id){
  return fetch(`http://localhost:3003/products/${id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})
  .then((response) => response.json())
}

function getProducts(){
  return fetch("http://localhost:3003/products", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})
  .then((response) => response.json())
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
                    <p class="card-text">${product.price} Ksh</p>
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
fetch("http://localhost:3003/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(product)
    })
}

function handleSubmitUpdatedProduct(){
  const frm = document.querySelector("#frm-update-product")
  frm.addEventListener("submit", function(event){
    event.preventDefault()
    const id = event.target.products.value //
    updateProduct(id)
    
  })
}


function updateProduct(id){
  fetch(`http://localhost:3003/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: event.target.name.value,
        price: event.target.price.value,
        imageUrl: event.target.imageUrl.value
      })
    })

}

