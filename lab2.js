let clientSection= document.querySelector(".client");
let productSection= document.querySelector(".products");
let cartSection= document.querySelector(".cart");

let username; //name of the user
let clientRestrictions; //restrictions specified by the user
let clientPreference;// user preference
let clientCart=[];  

let filteredItems=[]; //result of the filtering items by restrictions and preferences

//All items
let items=[
    {
        name:"Chicken",
        restrictions:["none"],
        preferences:["organic","non-organic","all"],
        price:400,
    },
    {
        name:"Brocolli",
        restrictions:["vegetarian","none"],
        preferences:["organic","all"],
        price:150,
    },
    {
        name:"Mushroom",
        restrictions:["vegetarian","none"],
        preferences:["organic","all"],
        price:75,
    },
    {
        name:"Potato",
        restrictions:["none"],
        preferences:["non-organic","all"],
        price:200,
    },
    {
        name:"Almond Milk",
        restrictions:["vegetarian","gluten-free","none"],
        preferences:["non-organic","all"],
        price:100,
    }

];

//sort items by price
items.sort((a,b)=>a.price-b.price);


//this function help changing the main display depending on the sscetion we want to access
function changeSection(sectionName){
    if(sectionName=="client"){
        clientSection.style.display="block";
        productSection.style.display="none";
        cartSection.style.display="none";
    }else if(sectionName=="products"){
        clientSection.style.display="none";
        productSection.style.display="block";
        cartSection.style.display="none";
    }else{
        clientSection.style.display="none";
        productSection.style.display="none";
        cartSection.style.display="block";
    }
}


//retrieve the users informations, restrictions and preferences
function updateClientSection(){
    username=document.querySelector(".client input[name='username']").value; 

    let restrictionChecked=document.querySelectorAll(".client input[type='checkbox']:checked"); //select all the input where the box is checked
    if(restrictionChecked.length>0){
        clientRestrictions= Array.from(restrictionChecked).map(checkbox=>checkbox.value); //convert those elements in an array if at least a box was checkeed
    }else{
        clientRestrictions=["none"]; //set restriction to none if no boxes was checked
    }

    let preferenceChecked=document.querySelector(".client select[name='preference'] option:checked"); //select the option chosen by the user
    if(preferenceChecked){
        clientPreference= preferenceChecked.value; //retrieve the value associated to the option
    }

    //Make sure to put these functions in these orders otherwise, the cart won't update items properly when you update client preferncs
    updateProductSection();
    updateCartSection()
}


//render a new display depending on the user's preferences and restrictions
function updateProductSection(){
    //add items that match user's preferences and restrictions to an array
    for(let i=0;i<items.length;i++){
        let containCommonRestrictions=clientRestrictions.some(restriction=>items[i].restrictions.includes(restriction));
        if(containCommonRestrictions && items[i].preferences.includes(clientPreference) ){
            filteredItems.push(items[i]);
        }
    }

    const form=document.querySelector(".products form");
    const breakline=document.createElement("br");

    form.innerHTML="";
    

    //create labels, checkboxes and a submit button to add to the form
    for(let i=0;i<filteredItems.length;i++){

        //create an inpput
        const inputCheckbox=document.createElement("input");
        inputCheckbox.type="checkbox";
        inputCheckbox.name=filteredItems[i].name;
        inputCheckbox.value=filteredItems[i].name;

        // Create label for the checkbox
        const label = document.createElement("label");
        label.appendChild(inputCheckbox);
        label.appendChild(document.createTextNode(filteredItems[i].name + " - " + filteredItems[i].price +" $"));

        //add a breakline for a nicer display
        const breakline=document.createElement("br");
        form.appendChild(label);
        form.appendChild(breakline);
    }

    //create and add a subnit button
    const submitBtn=document.createElement("input");
    submitBtn.type="button";
    submitBtn.value="Add items to card";

    submitBtn.addEventListener("click",updateCartSection);
    form.appendChild(breakline);
    form.appendChild(submitBtn);


    //empty the list 
    filteredItems=[];
}


// create the cart based on what was selected in the product section
function updateCartSection(){

    //update the username and set the total to 0
    document.querySelector(".cart p").innerHTML="User:  "+ username;
    document.querySelector(".cart span").innerHTML="0";
    const ul=document.querySelector(".cart ul");
    ul.innerHTML=""
    let total=0
    let obj;

    ul.innerHTML="";

    let itemsChecked=document.querySelectorAll(".products input[type='checkbox']:checked");//select all input check by the customer
    if(itemsChecked.length>0){
        let cart= Array.from(itemsChecked).map(item=>item.value); //extract the values associated with those inputs
        for(let i=0;i<cart.length;i++){
            obj=transformIntoObject(cart[i]);//transform each item's name to the matching object
            clientCart.push(obj);// push the item(as an object now) to the customer's cart
            //console.log(obj.name);
        }
    }
     //calculate the user total and render every item on the display
     for(let i=0;i<clientCart.length;i++){  
        const li=document.createElement("li");
        li.appendChild(document.createTextNode(clientCart[i].name));
        ul.appendChild(li);
        total+=clientCart[i].price;
    }
    document.querySelector(".cart span").innerHTML=total;
}


//transform a string into an object
function transformIntoObject(name){
    for(let i=0; i<items.length;i++){
        if(name==items[i].name){
            return items[i];
        }
    }
}

