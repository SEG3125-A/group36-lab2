let clientSection= document.querySelector(".client");
let productSection= document.querySelector(".products");
let cartSection= document.querySelector(".cart");

let username;
let clientRestrictions;
let clientPreference;
let clientCart=[];

let filteredItems=[];
let items=[
    {
        name:"Chicken",
        restrictions:["none"],
        preferences:["organic","non-organic","all"],
        price:200,
    },
    {
        name:"Brocolli",
        restrictions:["vegetarian","none"],
        preferences:["organic","all"],
        price:200,
    },
    {
        name:"Mushroom",
        restrictions:["vegetarian","none"],
        preferences:["organic","all"],
        price:200,
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
        price:200,
    }

];

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

function updateClientSection(){
    username=document.querySelector(".client input[name='username']").value;

    let restrictionChecked=document.querySelectorAll(".client input[type='checkbox']:checked");
    if(restrictionChecked.length>0){
        clientRestrictions= Array.from(restrictionChecked).map(checkbox=>checkbox.value); 
    }else{
        clientRestrictions=["none"];
    }

    let preferenceChecked=document.querySelector(".client select[name='preference'] option:checked");
    if(preferenceChecked){
        clientPreference= preferenceChecked.value; 
    }
    updateCartSection()
    updateProductSection();
}

function updateProductSection(){
    for(let i=0;i<items.length;i++){
        let containCommonRestrictions=clientRestrictions.some(restriction=>items[i].restrictions.includes(restriction));
        if(containCommonRestrictions && items[i].preferences.includes(clientPreference) ){
            filteredItems.push(items[i]);
        }
    }
    const form=document.querySelector(".products form");
    const breakline=document.createElement("br");

    form.innerHTML="";
    
    for(let i=0;i<filteredItems.length;i++){
        const inputCheckbox=document.createElement("input");
        inputCheckbox.type="checkbox";
        inputCheckbox.name=filteredItems[i].name;
        inputCheckbox.value=filteredItems[i].name;

        // Create label for the checkbox
        const label = document.createElement("label");
        label.appendChild(inputCheckbox);
        label.appendChild(document.createTextNode(filteredItems[i].name));

        const breakline=document.createElement("br");
        form.appendChild(label);
        form.appendChild(breakline);
    }

    const submitBtn=document.createElement("input");
    submitBtn.type="button";
    submitBtn.value="Add items to card";

    submitBtn.addEventListener("click",updateCartSection);
    form.appendChild(breakline);
    form.appendChild(submitBtn);

    filteredItems=[];
}


function updateCartSection(){
    document.querySelector(".cart p").innerHTML="User:  "+ username;
    document.querySelector(".cart span").innerHTML="0";
    const ul=document.querySelector(".cart ul");
    ul.innerHTML=""
    let total=0
    let obj;

    ul.innerHTML=""
    let itemsChecked=document.querySelectorAll(".products input[type='checkbox']:checked");
    if(itemsChecked.length>0){
        let cart= Array.from(itemsChecked).map(item=>item.value); 
        for(let i=0;i<cart.length;i++){
            obj=transformIntoObject(cart[i]);
            clientCart.push(obj);
            console.log(obj.name);
        }

        for(let i=0;i<clientCart.length;i++){
            const li=document.createElement("li");
            li.appendChild(document.createTextNode(clientCart[i].name));
            ul.appendChild(li);
            total+=clientCart[i].price;
        }
    }
    document.querySelector(".cart span").innerHTML=total;
}

function transformIntoObject(name){
    for(let i=0; i<items.length;i++){
        if(name==items[i].name){
            return items[i];
        }
    }
}

