import {menuArray} from '/data.js'
import { v4 as uuidv3} from 'https://jspm.dev/uuid';

const menuPage = document.getElementById('menu-page')

let totalPrice = 0

render()

document.addEventListener('click', function(e){
    if(e.target.id){
        addMealItem(e.target.id)
    } 
    if(e.target.id === "order-btn" ){
        completeOrder()
    }
    if(e.target.dataset.remove) {
        removeOrder(e.target.id)
     }
})


// removes the corresponding order when the remove button is clicked
function removeOrder(itemId){
    const orderSection = document.getElementById('order-section')
    const totalAmount = document.getElementById('total-amount')
    const specificItem = document.getElementById(itemId)
    
    menuArray.forEach(function(menuItem){
        if(menuItem.id === Number(itemId)){
            totalPrice -= menuItem.price
        }
        totalAmount.innerText = `$${totalPrice}`
        specificItem.parentElement.parentElement.style.display = 'none'
    })
    if (totalPrice === 0){
        orderSection.style.display ='none'
    }   
}

//when '+' button is clicked, Takes event id, which is the meal name 
// and adds it to the html & renders it to the page.
function addMealItem(itemId){
    let orderHtmlFeed = ''
    let priceHtml = ''
    const orderSection = document.getElementById('order-section')
    const details = document.getElementById('details')
    const finalPrice = document.getElementById('final-price')
    
    orderSection.style.display ='block'
    orderSection.classList.remove('hidden')//unhides lower portion of page where selected meal shows
    
    //iterates through menuArray,as menuItem for each item within array
    //and checks if itemId argument from target event listener = menuItem in menuArray
    //if it is, add it to and update total price 
    //& add it to HtmlFeed in order-section, where your selected meals show
    menuArray.forEach(function(menuItem){    
        if (itemId === menuItem.name){
            totalPrice += menuItem.price
            orderHtmlFeed += `
            <div class="order-info">
                <div class="ordered-items">
                    <h2>${menuItem.name}</h2>
                    <button class="remove-btn" id="${menuItem.id}" data-remove="${uuidv3()}">remove</button>
                </div>
                <h4 class="ordered-price">$${menuItem.price}</h4>
            </div>
            `
        }          
    })
    
    priceHtml +=`
        <h2>Total Price</h2>
        <h4 class="ordered-price" id="total-amount">$${totalPrice}</h4>
    `
    finalPrice.innerHTML = priceHtml
    details.innerHTML += orderHtmlFeed
}

//complete the order to reveal payment modal where you make payment
function completeOrder(){
    const paymentModal = document.getElementById("payment-modal")
    const paymentForm = document.getElementById('payment-form')
    
    paymentModal.classList.remove("hidden")
    
    paymentForm.addEventListener('submit', function(e){
        e.preventDefault()
        pay()
    })
}

//submits payment in modal & displays order-success message
function pay(){
    const paymentModal = document.getElementById("payment-modal")
    const orderSuccessMsg = document.getElementById('order-success-msg')
    const orderSection = document.getElementById('order-section')
     
    orderSection.classList.add('hidden') 
    paymentModal.classList.add('hidden')
    orderSuccessMsg.classList.remove('hidden') 
    
}

//This function creates the html elements for the page and returns the htmlFeed, 
//which will be rendered by render() function to display on screen
function getHtmlFeed(){
    
    let htmlFeed =''
    // iterate through menuArray and create each meal item html elemtns
    menuArray.forEach(function(item){
        htmlFeed+= 
        `
        <div class="main-section">
            <div class="menu-options">
                <div class="item-image"> ${item.emoji} </div>
                <div class="item-info">
                    <h2 id=10> ${item.name} </h2>
                    <p>${item.ingredients}</p>
                    <h4 id="item-price">$${item.price}</h4> 
                </div>
                <button class="add-btn" id="${item.name}" data-meal="${uuidv3()}"> + </button>
            </div>
        </div>
        
        `      
    })  
    //Additional html elements outside of menuArray (other elements on page outside the loop) 
    htmlFeed += `
        <p class="order-msg hidden" id="order-success-msg">
        Thank you! Your order is on its way!
        </p>
        
        <div class="your-order hidden" id="order-section">
            <h2> Your Order </h2>
            <div class="order-details" id="details">        
            
            </div>
    
            <div class="order-totals" id="final-price">    
               
            </div>
            <button class="btn complete-order-btn" id="order-btn"> Complete Order </button>     
        </div>    
        
        <div class="modal hidden" id="payment-modal">
            <h4> Enter Card Details </h4>
            <form id="payment-form">
                <input type="text" placeholder="Enter your name" id="name-input" required>
                <input type="number" placeholder="Enter card number" id="card-input" required>
                <input type="number" placeholder="Enter CCV" id="ccv-input" required>
                <button type="submit" class="btn" id="pay-btn"> Pay </button>
            </form>
        </div>
    `
    return htmlFeed //return the htmlFeed (contqains html elements), when function is invoked
}


//this function renders the html unto the screen
function render(){
    document.getElementById("menu-page").innerHTML = getHtmlFeed()
}

