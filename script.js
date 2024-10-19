let list = document.querySelector('.productList');
let filter = document.querySelector('.filtry');
let listProducts = [];
let productFilter = [];

let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

let standard = 10;
let max = 15;
let premium = 35;

let checkout = document.querySelector('.checkOut');
let closesum = document.querySelector('.closeSummary');

let openspis = document.querySelector('.spis');
let closespis = document.querySelector('.spisx');

let openinfo = document.querySelector('.infoOp');
let closeinfo = document.querySelector('.infox');

let opencontact = document.querySelector('.contactop');
let closecontant = document.querySelector('.contactx');



// Funkcja do pobrania danych z pliku JSON
async function fetchProducts() {
    try {
        const response = await fetch('products.json'); // Zakładamy, że plik jest w tej samej lokalizacji co skrypt
        if (!response.ok) {
            throw new Error('Błąd podczas ładowania produktów');
        }
        listProducts = await response.json();
        productFilter = listProducts;
        showProduct(productFilter);  // Wyświetl produkty po załadowaniu danych
    } catch (error) {
        console.error('Błąd:', error);
    }
}
// Uruchomienie pobierania danych po załadowaniu strony
fetchProducts();



// Obsługa filtrów
filter.addEventListener('submit', function(event) {
    event.preventDefault();
    let valueFilter = event.target.elements;
    productFilter = listProducts.filter(item => {
        // Sprawdzanie nazwy
        if(valueFilter.name.value != ''){
            if (
                !item.name.includes(valueFilter.name.value) && 
                !item.klasa.includes(valueFilter.name.value) &&
                !item.wydawnictwo.includes(valueFilter.name.value) &&
                !item.przedmiot.includes(valueFilter.name.value)
              ) {
                return false;
              }
              
        }

        // Sprawdzenie wydawnictwa
        if (valueFilter.wydawnictwo.value !== '') {
            if (item.wydawnictwo !== valueFilter.wydawnictwo.value) {
                return false;
            }
        }

        // Sprawdzanie przedmiotu
        if (valueFilter.przedmiot.value !== '') {
            if (item.przedmiot !== valueFilter.przedmiot.value) {
                return false;
            }
        }

        // Sprawdzanie klasy
        if (valueFilter.klasa.value !== '') {
            if (item.klasa !== valueFilter.klasa.value) {
                return false;
            }
        }
        return true;
    });
    showProduct(productFilter);  // Aktualizacja wyświetlanych produktów po filtrowaniu
});




// Funkcja do wyświetlania produktów
function showProduct(productFilter) {
    list.innerHTML = '';
    productFilter.forEach(product => {
        let newItem = document.createElement('div');
        newItem.dataset.id = product.id;
        newItem.classList.add('product');

        let prodprice = 0;
        if (product.tier=="Standard"){
            prodprice = standard;
        }
        else if(product.tier=="Max"){
            prodprice = max;
        }
        else if(product.tier=="Premium"){
            prodprice = premium;
        }
        else{
            prodprice = "Wystąpił błąd przeglądarki."
        }


        newItem.innerHTML = 
        `
            <img src="${product.image}" class="product" alt="">
            <h2>${product.name}</h2>
            <h3>Pakiet ${product.tier}</h3>
            <p class="opis">${product.desc}</p>
            <div class="tags">
                <div class="tag">${product.wydawnictwo}</div>
                <div class="tag">${product.przedmiot}</div>
                <div class="tag">Klasa ${product.klasa}</div>
            </div>
            <div class="bottom">
                <div class="price">
                    ${prodprice}    zł
                </div>
                <button class="add-to-cart">
                    Dodaj do koszyka
                </button>
            </div>
            

        `;


        // Dodanie elementu do listy produktów
        list.appendChild(newItem);
    });
}




iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

checkout.addEventListener('click', () => {
    body.classList.toggle('showSummary');
    body.classList.toggle('showCart');
})

closesum.addEventListener('click', () => {
    body.classList.toggle('showSummary');
})

openspis.addEventListener('click', () =>{
    body.classList.toggle('showSpis')
})

closespis.addEventListener('click', () =>{
    body.classList.toggle('showSpis')
})

openinfo.addEventListener('click', () =>{
    body.classList.toggle('showInfo')
})

closeinfo.addEventListener('click', () =>{
    body.classList.toggle('showInfo')
})

opencontact.addEventListener('click', () =>{
    body.classList.toggle('showContact')
})

closecontant.addEventListener('click', () =>{
    body.classList.toggle('showContact')
})


//koszyk

list.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('add-to-cart')){
        let id_product = positionClick.parentElement.parentElement.dataset.id;
        addToCart(id_product)
    }
})




const addToCart = (id_product) => {
    let positionThisProductInCart = cart.findIndex((value) => value.id_product == id_product);
    if(cart.length <= 0){
        cart = [{
            id_product: id_product,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            id_product: id_product,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    console.log(cart)
    addCartToHTML();
}



const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity=0;
        cart.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.id_product;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.id_product);
            let info = listProducts[positionProduct];

            

            let prodprice = 0;
            if (info.tier=="Standard"){
                prodprice = standard;
            }
            else if(info.tier=="Max"){
                prodprice = max;
            }
            else if(info.tier=="Premium"){
                prodprice = premium;
            }
            else{
                prodprice = "Wystąpił błąd przeglądarki."
            }

            newCart.innerHTML = `
                <img src="${info.image}" class="product" alt="">
                <div class="info">
                    <div class="info-name">${info.name}</div>
                    <div class="info-tier">${info.tier}</div>
                    <div class="info-price">
                        ${prodprice}zł 
                            <img src="media/x_mark.png" alt="delete" class="delete"/>
                    </div>
                    
                </div>
                
            `;
            //console.log(newCart);
            //console.log(info.tier);
            listCartHTML.appendChild(newCart);
        })
    iconCartSpan.innerText = totalQuantity;
}



listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('delete')){
        let id_product = positionClick.parentElement.parentElement.parentElement.dataset.id;
        changeQuantityCart(id_product, 'minus')
    }
})


const changeQuantityCart = (id_product, type) => {
    let positionItemInCart = cart.findIndex((value) => value.id_product == id_product);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
}










const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();
