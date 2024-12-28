import {menuArray} from "/data.js"


const mainPage = document.getElementById("main")
const orderDetails = document.getElementById("section-holder")
const paymentForm = document.getElementById("payment-form")
const completeBtn = document.getElementById("comple-btn")

mainPage.innerHTML = generateMenuHtml()
let orders = []
let name =""

paymentForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    const payFormData = new FormData(paymentForm)
    name = payFormData.get("name")
    console.log(name)
    paymentForm.style.display = "none"
    document.getElementById("thanks-msg").textContent = `Thanks, ${name}! Your order is on its way!`
    document.getElementById("thanks-you").style.display = "flex"
    document.querySelector("footer").style.display = "none"

})

completeBtn.addEventListener("click", function(){
    paymentForm.style.display = "flex"
})


document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        const itemToAdd = menuArray.find(function(item){
            return item.id == e.target.dataset.add
        })
        if (!orders.some(orderItem => orderItem.id === itemToAdd.id)) {
            orders.push(itemToAdd)
        }
        console.log(orders)
        handleaddorder()
        }
        else if (e.target.dataset.remove){
        orders = orders.filter(function(item){
            return item.id != e.target.dataset.remove
        })
        handleaddorder()
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

function handleaddorder() {
    let orderHtml = ""
    orders.forEach(function(orderItem){
        orderHtml += 
        `
        <ul>
        <div class="order-details">
            <div class="order-summary">
                <li><h2>${orderItem.name}</h2><li>
                <button  id="remove-btn" data-remove="${orderItem.id}">remove</button>
                </div>
            <li><p>$${orderItem.price}</p></li>
            </ul>
        `
    })
    document.getElementById("price").textContent = "$" + orders.reduce(function(total, currentTotal) {
        return total + currentTotal.price
    }, 0) 
    orderDetails.innerHTML = orderHtml
    document.querySelector("footer").style.display = "block"
}
