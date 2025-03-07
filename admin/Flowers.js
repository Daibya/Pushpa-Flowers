
function login()
{
    var mail = document.getElementById("mail").value
    var pass = document.getElementById("pass").value

    if( mail == "Admin@gmail.com" && pass == "Admin@123")
    {
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

function logout()
{
    if(confirm("Are you sure you want to log out?"))
    {
    window.location.href = "Admin.html"
    }
}

function adding() {
    // Get values from input fields
    var name = document.getElementById("name").value;
    var url = document.getElementById("url").value;
    var price = document.getElementById("price").value;

    // Create a new flower object
    var newflower = {
        name: name,
        url: url,
        price: price
    };

    // Check if there are existing flowers in localStorage
    if (localStorage.getItem("allflowers")) {
        var allflowers = JSON.parse(localStorage.getItem("allflowers"));
        allflowers.push(newflower); // Add the new flower
        localStorage.setItem("allflowers", JSON.stringify(allflowers));
    } else {
        var allflowers = [];
        allflowers.push(newflower); // Add the new flower
        localStorage.setItem("allflowers", JSON.stringify(allflowers));
    }
    alert("Flower added succesfully!")
    window.location.href = ""
    
    

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
                temp += '<div><button onclick="edit('+i+')">Edit</button> <button onclick="del('+i+')">Delete</button></div>';
                temp += '</div>';
            temp += '</div>';
        }

        document.getElementById('result').innerHTML = temp;
}
    else{
        alert("Please add some flowers before!")
    }
}

function del(i){
    var allflowers = JSON.parse(localStorage.getItem("allflowers"))
    if(confirm("Are you sure you want to delete?"))
    {
        allflowers.splice(i, 1)
        localStorage.setItem ("allflowers", JSON.stringify(allflowers))
        alert("Flower deleted successfully")
    }
    display()
}
function edit(i){
    localStorage.setItem("selectedIndex", i)
    window.location.href = "Uflower.html"
}
function dflower(){
    var selectedIndex = localStorage.getItem("selectedIndex")

    var allflowers = JSON.parse(localStorage.getItem("allflowers"))


    document.getElementById("name").value = allflowers[selectedIndex].name
    document.getElementById("url").value = allflowers[selectedIndex].url
    document.getElementById("price").value = allflowers[selectedIndex].price
}

function update(){
    var name = document.getElementById("name").value
    var url = document.getElementById("url").value
    var price = document.getElementById("price").value

    var selectedIndex = localStorage.getItem("selectedIndex") 

    var allflowers = JSON.parse(localStorage.getItem("allflowers"))

    allflowers[selectedIndex].name = name
    allflowers[selectedIndex].url = url
    allflowers[selectedIndex].price = price

    localStorage.setItem ("allflowers", JSON.stringify(allflowers))

    alert("Flower edited successfully!")
    window.location.href = "Flower.html"
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
                temp += '<div><button onclick="edit('+i+')">Edit</button> <button onclick="del('+i+')">Delete</button></div>';
                temp += '</div>';
            temp += '</div>';
      }
    }
    document.getElementById("result").innerHTML = temp
}