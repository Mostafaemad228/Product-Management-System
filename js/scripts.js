// calling data 
let title = document.querySelector('[name="title"]');
let category = document.querySelector('[name="category"]');
let count = document.querySelector('[name="count"]');
let price = document.querySelector('[name="price"]');
let taxes = document.querySelector('[name="taxes"]');
let ads = document.querySelector('[name="ads"]');
let discount = document.querySelector('[name="discount"]');
let total = document.querySelector('.total');
let submit = document.querySelector('#submit');
let deleteAll = document.querySelector('.deleteAll');
let search = document.querySelector('[name="search"]');

let mood = "Add"
let counter;

//  * Get TotalPrice Function
function getTotalPrice() {

    // condition to cheack if there is a price or not
    if (price.value !== "") {
        // i added (+) before the name to convert it from String to Number
        let totalprice = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.textContent = totalprice
        total.style.background = "#71b135"
    }
    else {
        total.textContent = " ";
        total.style.background = "#ff2525"
        total.style.color = "#fff"

    }
}




//  * Creat Product proccess
let ProductsData;
if (localStorage.product != null) {
    ProductsData = JSON.parse(localStorage.product)
}
else {
    ProductsData = [];
}




submit.onclick = function () {

    let newProduct = {
        title: title.value.toLowerCase(),
        category: category.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        count: count.value,
        ads: ads.value,
        total: total.textContent,
    }
    // simple validation process
    if (title.value != "" && price.value != "" && category.value != "" && count.value <= 100) {
        // creat or update moode process
        if (mood === "Add") {
            //  * if mood is Add creat a new product
            //  * count of data proccess
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    ProductsData.push(newProduct);
                }

            }
            else {
                ProductsData.push(newProduct);
            }
        }
        // * if mood is Update make the update process in the product 
        else {

            ProductsData[counter] = newProduct;
            mood = "Add"
            count.style.display = 'block';
            submit.innerHTML = 'Add New Prpduct'

        }

        clearData();

    }


    localStorage.setItem('product', JSON.stringify(ProductsData))

    showData();
}




// * clear data Function
function clearData() {
    title.value = ""
    category.value = ""
    price.value = ""
    taxes.value = ""
    discount.value = ""
    count.value = ""
    ads.value = ""
    total.textContent = ""
}



// * Show Data function
function showData() {

    let template = '';
    for (let i = 0; i < ProductsData.length; i++) {

        template += `
            <tr>
            <td scope="row" >${i + 1}</td>
            <td>${ProductsData[i].title}</td>
            <td>${ProductsData[i].category}</td>
                <td>${ProductsData[i].price}</td>
                <td>${ProductsData[i].taxes}</td>
                <td>${ProductsData[i].discount}</td>
                <td>${ProductsData[i].ads}</td>
                <td>${ProductsData[i].total}</td>
                <th id="Update"> <button onclick="UpdateData( ${i} )" class="btn btn-success"> update </button></th>
                <th id="Delete" onclick="deleteData( ${i} )" ><button class=" btn btn-danger deleteBtn"> delete </button></th>

            </tr>`

    }

    document.querySelector('.Tbody').innerHTML = template;

    if (ProductsData.length > 0) {
        deleteAll.innerHTML = `  <button onclick="deleteAllData()"  class="btn btn-primary col-lg-12 delbtn "   > delete All (${ProductsData.length}) </button> `
    }
    else {
        deleteAll.innerHTML = ""
    }

    getTotalPrice()

}
showData();


//  * Delete Function 
function deleteData(i) {
    ProductsData.splice(i, 1);
    localStorage.product = JSON.stringify(ProductsData)
    showData();
};

//  * Delete All function 
function deleteAllData() {
    ProductsData.splice(0);
    localStorage.clear();
    showData();

    console.log("all Data has been Deleted");
}


//  * Update function
function UpdateData(i) {
    title.value = ProductsData[i].title;
    category.value = ProductsData[i].category;
    price.value = ProductsData[i].price;
    taxes.value = ProductsData[i].taxes;
    ads.value = ProductsData[i].ads;
    discount.value = ProductsData[i].discount;
    getTotalPrice();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = "Update";
    counter = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}


// * search Mood Function
let MoodSearch = 'title'
function searchMood(id) {

    if (id == 'titleSearch') {
        MoodSearch = 'title'
    }

    else {
        MoodSearch = 'category'
    }
    search.focus();
    search.value = ""
    search.placeholder = `Search By ${MoodSearch}`
    showData()

}

// * Search proccess 
function searchInData(val) {
    let table = '';
    for (let i = 0; i < ProductsData.length; i++) {
        if (MoodSearch == 'title') {

            if (ProductsData[i].title.includes(val.toLowerCase())) {
                table += `
                    <tr>
                    <td scope="row" >${i + 1}</td>
                    <td>${ProductsData[i].title}</td>
                    <td>${ProductsData[i].category}</td>
                        <td>${ProductsData[i].price}</td>
                        <td>${ProductsData[i].taxes}</td>
                        <td>${ProductsData[i].discount}</td>
                        <td>${ProductsData[i].ads}</td>
                        <td>${ProductsData[i].total}</td>
                        <th id="Update"> <button onclick="UpdateData( ${i} )" class="btn btn-success"> update </button></th>
                        <th id="Delete" onclick="deleteData( ${i} )" ><button class=" btn btn-danger "> delete </button></th>

                    </tr>`;
            }
        }

        else {
            if (ProductsData[i].category.includes(val.toLowerCase())) {
                table += `
                        <tr>
                        <td scope="row" >${i + 1}</td>
                        <td>${ProductsData[i].title}</td>
                        <td>${ProductsData[i].category}</td>
                            <td>${ProductsData[i].price}</td>
                            <td>${ProductsData[i].taxes}</td>
                            <td>${ProductsData[i].discount}</td>
                            <td>${ProductsData[i].ads}</td>
                            <td>${ProductsData[i].total}</td>
                            <th id="Update"> <button onclick="UpdateData( ${i} )" class="btn btn-success"> update </button></th>
                            <th id="Delete" onclick="deleteData( ${i} )" ><button class=" btn btn-danger "> delete </button></th>

                        </tr>`;
            }
        }

    }


    document.querySelector('.Tbody').innerHTML = table;

}







