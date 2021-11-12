$(document).ready(function () {


});


function cartCounter(){
	let arrayOfProducts;
	if (localStorage.getItem('products') == undefined){
		arrayOfProducts = [];
		$('.badge').text(`0`);
	} else {
		arrayOfProducts = JSON.parse(localStorage.getItem('products'));
		let cartCount = arrayOfProducts.length;
		$('.badge').text(`${cartCount}`);
	}
}

function load(){
	
	let searchParams = new URLSearchParams(window.location.search)

	if(searchParams.has('id')){

		let id = searchParams.get('id');

		let dataProduct = "";

		$.get('./js/products.json', function(data){

			for (let i = 0; i < data.length; i++){

				console.log("for", data[i]);

				if(data[i].id == id){

					console.log("if");
					dataProduct += `<section class="card col-12 col-md-6 col-lg-4 detailP">`;
					dataProduct += `<img class="cardImg" src="./picture/${data[i].url}">`;
					dataProduct += `<div class="cardInfo">`;
					dataProduct += `<h5>${data[i].name}</h5>`
					dataProduct += `<div class="price">`
					dataProduct += `<h6>${data[i].price} €</h6>`
					dataProduct += `<p>${data[i].description}</p>`
					dataProduct += `<button id=${data[i].id} onclick="updateKosik(${data[i].id})" class="btn btn-danger product-info m-1">Pridat do kosika</button>`
					dataProduct += `</div></div></section>`

					$('#products').html(dataProduct);

					break;

				}

			}

		});

		return;

	}

    $.get('./js/products.json', function(data){
		console.log("sme v load get", data);
		let dataProduct = "";
		for (let key in data){
			console.log("sme v load", key, data[key]);
			dataProduct += `<section class="card col-12 col-md-6 col-lg-4" data-id="${key}">`;
			dataProduct += `<img class="cardImg" src="./picture/${data[key].url}">`;
			dataProduct += `<div class="cardInfo">`;
			dataProduct += `<h5>${data[key].name}</h5>`
			dataProduct += `<div class="price">`
			dataProduct += `<h6>${data[key].price} €</h6>`
			dataProduct += `<a href="products2.html?id=${data[key].id}" class="btn btn-secondary product-info">Detail</a>`
			dataProduct += `<button id=${data[key].id} onclick="updateKosik(${data[key].id})" class="btn btn-danger product-info m-1">Pridat do kosika</button>`
			dataProduct += `</div></div></section>`
		}
		$('#products').html(dataProduct);
	});
}

function updateKosik(id){
	let kosik = localStorage.getItem(id);

	if(kosik == undefined){
		kosik = 0;
	} else {
		kosik = parseInt(kosik);
	}

	kosik++;

	localStorage.setItem(id, kosik);
}

function displayTotalPrice() {
	let products;

	if (localStorage.getItem('products') === null) {
		products = [];
	} else {
		products = JSON.parse(localStorage.getItem('products'));
		let totalPrice = 0;
		for (let i = 0; i < products.length; i++) {
			totalPrice += Number(products[i].quantity) * Number(products[i].finalPrice);
		}
	}
};

function displayFinalPrice() {
	let subtotal = Number($("#sub-total").text());
	let finalprice = subtotal + 5.50;
}