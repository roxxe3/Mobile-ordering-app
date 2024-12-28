import {menuArray} from "/data.js"


const mainPage = document.getElementById("main")
const orderDetails = document.getElementById("section-holder")
mainPage.innerHTML = generateMenuHtml()
let orders = []

document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        orders.push(e.target.dataset.add)
        handleaddorder(e.target.dataset.add)
    }
});


function generateMenuHtml(){
    let menuHtml = ""
    menuArray.forEach(function(element){

    menuHtml += `
    <div class="hero" id="hero">
    <p id="food-ico" src="images/pizza graphic.png">${element.emoji}</p>
                <div class="detail-btn">
                    <div class="item-detail">
                        <h3 class="item-name">${element.name}</h3>
                        <p class="item-ingredients">${element.ingredients.join(",")}</p>
                        <P class="item-price">$${element.price}</P>
                    </div>
                    <div class="add-btn-div">
                        <button data-add="${element.id}" class="add-btn">+</button>
                    </div>
                </div>
            </div>
        `
    })
return menuHtml

}

function handleaddorder(orderId) {
    let orderHtml = ""
    const orderItem = menuArray.filter(function(item){
        return item.id == orderId
    })[0]
    orderHtml += 
    `
        <div class="order-details">
        <div class="order-summary">
            <h2>${orderItem.name}</h2>
            <button  id="remove-btn">remove</button>
            </div>
        <p>$${orderItem.price}</p>
    `
    orderDetails.innerHTML = orderHtml
    document.querySelector("footer").style.display = "block"
}
