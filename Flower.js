


function logout()
{
    if(confirm("Are you sure you want to log out?"))
    {
    localStorage.removeItem('loggeduser')
    window.location.href = "user.html"
    }
}


    
    


function display()
{
    if(localStorage.getItem("allflowers"))
    {
        var allflowers = JSON.parse(localStorage.getItem("allflowers")) || [];
        console.log(allflowers);
        var temp = "";

        for (var i = 0; i < allflowers.length; i++) {
            temp += '<div class="main">';
                temp += '<div class="box">';
                temp += '<img src="' + allflowers[i].url + '" alt="" width="15%" height="15%">';
                temp += '<div class="container"><span class="name">' + allflowers[i].name + '</span> <span class="price">₹ '+ allflowers[i].price + '</span></div>';
                temp += '<div><button onclick="cart('+i+')">Add to cart</button> <button onclick="buy('+i+')">Buy now</button></div>';
                temp += '</div>';
            temp += '</div>';
        }

        document.getElementById('result').innerHTML = temp;
}
    else{
        alert("Please add some flowers before!")
    }
}




function dflower(){
    var selectedIndex = localStorage.getItem("selectedIndex")

    var allflowers = JSON.parse(localStorage.getItem("allflowers"))


    document.getElementById("name").value = allflowers[selectedIndex].name
    document.getElementById("url").value = allflowers[selectedIndex].url
    document.getElementById("price").value = allflowers[selectedIndex].price
}



function searchflowers(){
    var search = document.getElementById("search").value
    var allflowers = JSON.parse(localStorage.getItem("allflowers"))
    var temp = ""
    for(i = 0; i < allflowers.length; i++){
      var name = allflowers[i].name;
      var n = name.substring(0, search.length)
  
      if(n == search)
      {
        temp += '<div class="main">';
                temp += '<div class="box">';
                temp += '<img src="' + allflowers[i].url + '" alt="" width="15%" height="15%">';
                temp += '<div class="container"><span class="name">' + allflowers[i].name + '</span> <span class="price">₹ '+ allflowers[i].price + '</span></div>';
                temp += '<div><button onclick="cart('+i+')">Add to cart</button> <button onclick="buy('+i+')">Buy now</button></div>';
                temp += '</div>';
            temp += '</div>';
      }
    }
    document.getElementById("result").innerHTML = temp
}

    //document.getElementById("toggle-eye").addEventListener("click", function() {
    //var passwordField = document.getElementById("pass");
    //if (passwordField.type === "password") {
       // passwordField.type = "text";  // Show password
   // } else {
     //   passwordField.type = "password";  // Hide password
   // }
//});



function reg(){
    var mail = document.getElementById("mail").value
    var name = document.getElementById("name").value
    var pass = document.getElementById("pass").value

    var newuser = {
        mail: mail,
        name: name,
        pass: pass,
    }
    if (localStorage.getItem("allusers")) {
        var allusers = JSON.parse(localStorage.getItem("allusers"));
        allusers.push(newuser); 
        localStorage.setItem("allusers", JSON.stringify(allusers));
    } 
    else {
        var allusers = [];
        allusers.push(newuser); 
        localStorage.setItem("allusers", JSON.stringify(allusers));
    }
    alert("Log in successful!")
    window.location.href = "user.html"

}

function login()
{
    var mail = document.getElementById("mail").value
    var pass = document.getElementById("pass").value

    var allusers = JSON.parse(localStorage.getItem("allusers"));

   for(i=0; i< allusers.length; i++){
    if(allusers[i].mail === mail && allusers[i].pass === pass){
        alert("Log in successful!")
        localStorage.setItem('loggeduser', mail);
        window.location.href = "index.html"
    }
      
    else
    {
        Swal.fire({
            position: "middle-center",
            icon: "error",
            title: "Please enter the valid mail or password",
            showConfirmButton: false,
            timer: 1500
          });
   }
    
    }

}

function displaymenu(){
   if(localStorage.getItem('loggeduser')){
    document.getElementById("login").style.display = "none"
    document.getElementById("cart").style.display = ""
    document.getElementById("profile").style.display = ""
    document.getElementById("logout").style.display = ""
   } 
   else{
    document.getElementById("login").style.display = ""
    document.getElementById("cart").style.display = "none"
    document.getElementById("profile").style.display = "none"
    document.getElementById("logout").style.display = "none"
   }
}

function cart(index){
    
    if(localStorage.getItem('loggeduser')){
        var allflowers = JSON.parse(localStorage.getItem("allflowers"))
        var mail = localStorage.getItem('loggeduser')

        var flag = 0

        if(localStorage.getItem('allcart'))
        {
            var cartArray = JSON.parse(localStorage.getItem('allcart'))
            for(let i=0; i<cartArray.length; i++)
            {
                if(cartArray[i].name == allflowers[index].name && cartArray[i].mail == mail)
                {
                    flag = 1;
                    break;
                }
            }
        }
        

        if(flag == 1)
        {
            alert("This flower is already added")
        }
        else{
            var cart = {
                mail : mail,
                name: allflowers[index].name, 
                price: allflowers[index].price,
                url: allflowers[index].url,
                quantity : 1
            }
    
            if(localStorage.getItem('allcart')){
                var cartArray = JSON.parse(localStorage.getItem('allcart'))
                cartArray.push(cart)
                localStorage.setItem("allcart", JSON.stringify(cartArray));
            }
            else{
                var cartArray = []
                cartArray.push(cart)
                localStorage.setItem("allcart", JSON.stringify(cartArray))
            }

            alert("Flower Added")
            window.location.href = ""
        }
        

    
    }
}

function cartdisplay(){
    var mail = localStorage.getItem('loggeduser')
    var cartArray = JSON.parse(localStorage.getItem('allcart'))
   
    var temp = ""
    var total = 0

   
    
    for(let i=0;i<cartArray.length;i++){
        console.log(222, cartArray[i].mail + " " + mail)
      if(cartArray[i].mail === mail){
        
        
        total += parseInt(cartArray[i].price) * parseInt(cartArray[i].quantity)
        temp += `
          <div class="cart-item">
              <img src="${cartArray[i].url}" alt="Item 1" class="cart-item-img">
              <div class="cart-item-details">
                  <h3>${cartArray[i].name}</h3>
              </div>
              <div class="cart-item-price">₹ ${cartArray[i].price}</div>
              <div class="cart-item-quantity">
                  <button class="edit" onclick = "reducequantity(${i})">-</button>
                  <label for="quantity1">${cartArray[i].quantity}</label>
                  <button class="edit" onclick = "addquantity(${i})">+</button>
              </div>
              <div class="cart-item-price">₹ ${cartArray[i].price * cartArray[i].quantity}</div>
              <div><button class="cart-item-remove" onclick = "remove(${i})">Remove</button></div>
          </div>
        `;
      }
    }
    document.getElementById('cartResult').innerHTML = temp
    document.getElementById('total').innerHTML = "₹ "+ total
  }
  
  function addquantity(index){
    var mail = localStorage.getItem('loggeduser')
    var cartArray = JSON.parse(localStorage.getItem('allcart'))
    var total = 0
    for(let i=0;i<cartArray.length;i++){
      if(cartArray[i].mail === mail  && i === index){
        cartArray[i].quantity++
      }
    }
    localStorage.setItem('allcart', JSON.stringify(cartArray))
  
    window.location.href = ""
  }

  function reducequantity(index){
    var mail = localStorage.getItem('loggeduser')
    var cartArray = JSON.parse(localStorage.getItem('allcart'))
    var total = 0
    for(let i=0;i<cartArray.length;i++){
      if(cartArray[i].mail === mail  && i === index){
        if(cartArray[i].quantity > 1)
        cartArray[i].quantity--
        else{
            alert("Quantity can't be less than one")
        }
      }
    }
    localStorage.setItem('allcart', JSON.stringify(cartArray))
  
    
  }

  function remove(index){
    var mail = localStorage.getItem('loggeduser')
    var cartArray = JSON.parse(localStorage.getItem('allcart'))
    var total = 0
    for(let i=0;i<cartArray.length;i++){
      if(cartArray[i].mail === mail  && i === index){
        cartArray.splice(i, 1)
      }
    }
    localStorage.setItem('allcart', JSON.stringify(cartArray))
  
    window.location.href = ""
  }

  function checkout(){
    var email = localStorage.getItem('loggeduser')
    var cartArray = JSON.parse(localStorage.getItem('allcart'))
    var total = 0
    for(let i=0;i<cartArray.length;i++){
      if(cartArray[i].mail === email){
        total += parseInt(cartArray[i].price) * parseInt(cartArray[i].quantity)
      }
    }
  
       var options = {
            "key": "rzp_test_ND81BEh4gRO77Q", // Enter the Key ID generated from the Dashboard
            "amount": total*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Pushpa", //your business name
            "description": "Payment for your flowers",
            "image": "https://freshflowersonflorida.co.za/cdn/shop/files/IMG_7345.heic?v=1720025306&width=2943",
            "handler": function (response){
              Swal.fire({
                title: "Order placed successfully! your order id is "+response.razorpay_payment_id,
                text: "Total amount: Rs. "+total,
                icon: "success",
                draggable: true
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "index.html"
                }
              });
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
   
  }

