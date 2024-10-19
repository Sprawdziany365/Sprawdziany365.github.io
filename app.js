let listProductHTML = document.querySelector('.productList');
let body = document.querySelector('body');
let div = document.querySelector('div');

let products = [];
let cart = [];

function addDataToHTML() {
    // remove datas default from HTML
    // add new datas
    if (products.length > 0) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('product');               //let discount = product.oldprice-product.price;   //console.log(discount);
            
            newProduct.innerHTML =
            `
                <img src="${product.image}" class="product" alt="">
                <h2>${product.name}</h2>
                <h3>${product.tier}</h3>
                <p class="opis">${product.desc}</p>
                <div class="price">${product.price}zł</div>
            `;
                
                
            
            listProductHTML.appendChild(newProduct);
        });
    }
}


function initApp() {
    // get data product
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data; 
            addDataToHTML();   
        });
}
initApp();



