let shop = document.getElementById('Pizzas');
var basket = []
const increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    update(selectedItem);
};

const decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if (!search || search.item === 0) {
        return;
    } else {
        if(search.item===0){
            
        }
        search.item -= 1;
    }

    update(selectedItem);
};

const update = (id) => {
    let search = basket.find((x) => x.id === id);
    
    if (search) {
        let elem =  document.getElementById(id);
        elem.querySelector(".quant").innerHTML = search.item;
    }
    calculation()
};

let calculation = () => {
    let cartIcon = document.querySelector('.total-items')
     cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}
let sub = (id1,id2) => {
    let add = document.getElementById(id1);
    let add2 = document.getElementById(id2);
    add.style.display = 'none';
    add2.style.display = 'flex';
}

let stack_items = [];
function generateCart(id){
    let search = stack_items.find((x) => x.id === id);
    if(search){
        var search2 = basket.find((x) => x.id == id);
        var quantity = search2.item; 
        var total_price = quantity * search.priceReal;
        search.quantity = Number(quantity);
        search.total_price = total_price;
    }else{
        var search2 = basket.find((x)=>x.id==id)
        var quantity = search2.item;
        var elem = document.getElementById(id);
        var price = elem.querySelector('.price').textContent;
        var priceReal = Number(price.slice(4,));
        var total_price= quantity*priceReal;
        var img = elem.getElementsByTagName('img')[0];
        var imgSrc = img.getAttribute('src');
        var name = elem.querySelector('.name').textContent;
        
        

        stack_items.push(
            {id, imgSrc, name, priceReal, total_price,quantity})
    }
    updateCart()
}
function updateCart(){
    var main_cart = document.getElementById('main-cart');
    main_cart.innerHTML = ``;
    if(stack_items.length===0){
        main_cart.innerHTML = 
        `<p>Your cart is empty</p>`
    }else{
    stack_items.forEach((x)=>{
    if(x.quantity===0){
        return;
     }else{
    main_cart.innerHTML += `
        <div class = cart-item>
        <p>${x.name}</p>
        <img src="${x.imgSrc}"/>
        <p>Total Price: ${x.quantity} X ${x.priceReal}= Rs.${x.total_price}</p>
        </div>
            `
    }})
    let ordergot = document.getElementById('order-btn')
    if(ordernow){
        return;
    }else{
        var ordernow = document.createElement('a');
        ordernow.id = 'order-btn';
        ordernow.textContent = 'Order Now!'
        ordernow.setAttribute('href', 'order.html')
        main_cart.appendChild(ordernow);
    }
}
}







