// Load start location and end location
fetch("./assets/data/list-start-location.json")
	.then(function (response) {
		if (!response.ok) {
			throw new Error("HTTP error, status = " + response.status);
		}
		return response.json();
	})
	.then(function (data) {
		let html = "";
		for (let i in data) {
			html += `
				<option value="${i}">${data[i]}</option>
			`;
		}

		const startLocation = document.getElementById("start-location");
		startLocation.innerHTML = html;

		startLocation.getElementsByTagName("option")[0].textContent = "--Tất cả--";
	});

fetch("./assets/data/list-end-location.json")
	.then(function (response) {
		if (!response.ok) {
			throw new Error("HTTP error, status = " + response.status);
		}
		return response.json();
	})
	.then(function (data) {
		let html = "";
		for (let i in data) {
			html += `
				<option value="${i}">${data[i]}</option>
			`;
		}

		document.getElementById("end-location").innerHTML = html;
	});

const startLocation = document.getElementById("start-location");

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load tours
let favoriteList = [];
fetch("./assets/data/favorite-destination.json")
	.then(function (response) {
		if (!response.ok) {
			throw new Error("HTTP error, status = " + response.status);
		}
		return response.json();
	})
	.then(function (data) {
		for (let location of data) {
			favoriteList.push(location.name);
		}

		let randomFavorite = [];
		while (randomFavorite.length < 4) {
			let numberRandom = getRndInteger(0, 7);
			if (!randomFavorite.includes(numberRandom)) {
				randomFavorite.push(numberRandom);
			}
		}
		let html = "";
		for (let i = 0; i < randomFavorite.length; i++) {
			html += `
			<div class="item">
				<div class="item__thumb">
					<a href="tour-results.html?location=${data[randomFavorite[i]].id}">
						<img
							src="./assets/image/favorite-destination/${data[randomFavorite[i]].thumb}"
							alt="" />
					</a>
				</div>
				<div class="item__name"><a href="tour-results.html?location=${
					data[randomFavorite[i]].id
				}">
				${data[randomFavorite[i]].name}
				</a></div>
			</div>
			`;
		}
		document.querySelector(".favorite-location .list").innerHTML = html;
	});

function loadListTour(listTour) {
	let listResult = document.querySelector(".list-results");
	let htmlList = "";
	for (let i = 0; i < listTour.length; i++) {
		let type = {
			icon: "",
			title: "",
		};
		if (listTour[i].type == "save") {
			type.icon = "savings";
			type.title = "Tiết kiệm";
		} else if (listTour[i].type == "standard") {
			type.icon = "paid";
			type.title = "Tiêu chuẩn";
		} else if (listTour[i].type == "luxury") {
			type.icon = "diamond";
			type.title = "Cao cấp";
		} else if (listTour[i].type == "goodPrice") {
			type.icon = "monetization_on";
			type.title = "Giá tốt";
		}

		let htmlPrice = "";
		if (listTour[i].discount == "0") {
			htmlPrice = `
				<div class="info__new-price">
					<span class="price">${listTour[i].priceTicket.adult}đ</span>
				</div>
				`;
		} else {
			let newPrice =
				(Number(listTour[i].priceTicket.adult.split(".").join("")) *
					(100 - Number(listTour[i].discount))) /
				100;
			newPrice = Intl.NumberFormat().format(newPrice);
			htmlPrice = `
				<div class="info__old-price">
					Giá <span>${listTour[i].priceTicket.adult}đ</span>
				</div>
				<div class="info__new-price">
					<span class="price">${newPrice}đ</span>
					<span class="discount">${listTour[i].discount}% giảm giá</span>
				</div>
				`;
		}
		htmlList += `
		<div class="col">
			<div class="result-item">
				<div class="thumb">
					<a href="tour_detail.html?id=${listTour[i].id}">
						<img src="./assets/image/tours/${listTour[i].image[0]}" alt="" />
					</a>
					<span class="material-icons-sharp favorite-icon">
						favorite_border
					</span>
					<span class="material-icons-sharp favorite-icon-yes">
						favorite
					</span>
					<div class="rate">
						<span class="material-icons-sharp rate__icon"> star </span>
						<span class="rate__point">${listTour[i].ratePoint}</span>
					</div>
					<div class="type">
						<span class="material-icons-sharp">${type.icon}</span>
						${type.title}
					</div>
				</div>
				<div class="info">
					<span class="info__date">${listTour[i].dateStart} - ${
			listTour[i].time.split("-")[0]
		} ngày </span>
					<div class="info__name">
						<a href="tour_detail.html?id=${listTour[i].id}">
							${listTour[i].name}
						</a>
					</div>
					<div class="info__code">
						Mã tour: 
							<span class="material-icons-sharp ticket-icon">
								confirmation_number
							</span>
							<span>${listTour[i].code}</span>
					</div>
					<div class="info__start">Nơi khởi hành: ${listTour[i].startLocation}</div>
					${htmlPrice}

					<div class="info__remaining-seats">
						Số chỗ còn lại: <span>${listTour[i].leftSlot}</span>
					</div>
				</div>
			</div>
		</div>
			`;
	}
	listResult.innerHTML = htmlList;
	document.querySelector(".number span").textContent = listTour.length;

	const favoriteIcon = document.querySelectorAll(".favorite-icon");
	const favoriteIconYes = document.querySelectorAll(".favorite-icon-yes");

	for (let i = 0; i < favoriteIcon.length; i++) {
		favoriteIcon[i].onclick = function () {
			favoriteIconYes[i].classList.toggle("active");
			favoriteIconYes[i].style.display = "inline-block";
			favoriteIcon[i].style.display = "none";
		};

		favoriteIconYes[i].onclick = function () {
			favoriteIconYes[i].classList.toggle("active");
			favoriteIconYes[i].style.display = "none";
			favoriteIcon[i].style.display = "inline-block";
		};
	}
}

// Load tours
const tours = [];
let listTourCurrent = [];
fetch("./assets/data/tours.json")
	.then(function (response) {
		if (!response.ok) {
			throw new Error("HTTP error, status = " + response.status);
		}
		return response.json();
	})
	.then(function (data) {
		for (let tour of data) {
			tours.push(tour);
		}

		let titleHeading = "";
		let params = document.URL.split("?").pop().split("=");
		if (params.length > 1) {
			if (params[0] == "location") {
				titleHeading = favoriteList[params[1]];
				for (let tour of tours) {
					if (tour.name.includes(favoriteList[params[1]])) {
						listTourCurrent.push(tour);
					}
				}
			} else {
				if (params[0] == "region") {
					titleHeading =
						params[1] == "MB"
							? "Du lịch Miền Bắc"
							: params[1] == "MN"
							? "Du lịch Miền Nam"
							: "Du lịch Miền Trung";
					for (let tour of tours) {
						if (tour.code.substring(0, 2) == params[1]) {
							listTourCurrent.push(tour);
						}
					}
				}
			}
		} else {
			titleHeading = "Du lịch cùng Travel CE";
			for (let tour of tours) {
				listTourCurrent.push(tour);
			}
		}

		document.querySelector(".name-result").textContent = titleHeading;
		document.querySelector("title").textContent = titleHeading;
		let htmlResult = "";
		let result = document.querySelector(".results");

		document.querySelector(".results .heading").textContent = titleHeading;

		loadListTour(listTourCurrent);
	});

// Filters button
const startLocationFilter = document.getElementById("start-location");
const startLocationOptions = startLocationFilter.getElementsByTagName("option");
const endLocationFilter = document.getElementById("end-location");
const endLocationOptions = endLocationFilter.getElementsByTagName("option");
const dateStartFilter = document.getElementById("date-start");

const numberDay1_3 = document.getElementById("1-3days");
const numberDay4_7 = document.getElementById("4-7days");
const numberDay8_14 = document.getElementById("8-14days");
const numberDayOver14 = document.getElementById("over14days");

const luxuryFilter = document.getElementById("luxury");
const standardFilter = document.getElementById("standard");
const saveFilter = document.getElementById("save");
const goodPriceFilter = document.getElementById("goodPrice");

const planeFilter = document.getElementById("plane");
const carFilter = document.getElementById("touring-car");

const choiceBtns = document.querySelectorAll(".choice-btn");
for (let i = 0; i < choiceBtns.length; i++) {
	choiceBtns[i].onclick = function () {
		choiceBtns[i].classList.toggle("active");
	};
}

const fromPrice = document.getElementById("from-price");
const toPrice = document.getElementById("to-price");
const rangePrice = document.querySelectorAll('input[name="price"]');
for (let i = 0; i < rangePrice.length; i++) {
	rangePrice[i].onchange = function () {
		rangePrice[i].value = Intl.NumberFormat().format(rangePrice[i].value);
	};

	rangePrice[i].onfocus = function () {
		rangePrice[i].value = rangePrice[i].value.split(",").join("");
	};
}

let listTourFilter = [];

const filterBtn = document.querySelector(".filter-btn");
filterBtn.onclick = function () {
	listTourFilter = [];
	for (let i = 0; i < listTourCurrent.length; i++) {
		listTourFilter.push(listTourCurrent[i]);
	}
	if (startLocationFilter.value != "0") {
		for (let i = 0; i < listTourFilter.length; i++) {
			console.log("start");
			if (
				listTourFilter[i].startLocation !=
				startLocationOptions[startLocationFilter.value].textContent
			) {
				listTourFilter.splice(i, 1);
				i--;
			}
		}
	}
	if (endLocationFilter.value != "0") {
		for (let i = 0; i < listTourFilter.length; i++) {
			if (
				!listTourFilter[i].name.includes(
					endLocationOptions[endLocationFilter.value].textContent
				)
			) {
				listTourFilter.splice(i, 1);
				i--;
			}
		}
	}
	if (dateStartFilter.value) {
		let dateSplit = dateStartFilter.value.split("-");
		let dateString = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
		for (let i = 0; i < listTourFilter.length; i++) {
			if (dateString != listTourFilter[i].dateStart) {
				listTourFilter.splice(i, 1);
				i--;
			}
		}
	}

	if (
		numberDay1_3.classList.contains("active") ||
		numberDay4_7.classList.contains("active") ||
		numberDay8_14.classList.contains("active") ||
		numberDayOver14.classList.contains("active")
	) {
		if (!numberDay1_3.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				if (listTourFilter[i].time.split("-")[0] <= 3) {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
		if (!numberDay4_7.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				let numberDay = listTourFilter[i].time.split("-")[0];
				if (numberDay >= 4 && numberDay <= 7) {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
		if (!numberDay8_14.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				let numberDay = listTourFilter[i].time.split("-")[0];
				if (numberDay >= 8 && numberDay <= 14) {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
		if (!numberDayOver14.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				let numberDay = listTourFilter[i].time.split("-")[0];
				if (numberDay >= 14) {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
	}

	if (
		luxuryFilter.classList.contains("active") ||
		standardFilter.classList.contains("active") ||
		saveFilter.classList.contains("active") ||
		goodPriceFilter.classList.contains("active")
	) {
		if (!luxuryFilter.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				if (listTourFilter[i].type == "luxury") {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
		if (!standardFilter.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				if (listTourFilter[i].type == "standard") {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
		if (!saveFilter.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				if (listTourFilter[i].type == "save") {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
		if (!goodPriceFilter.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				if (listTourFilter[i].type == "goodPrice") {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
	}

	if (
		planeFilter.classList.contains("active") ||
		carFilter.classList.contains("active")
	) {
		if (!planeFilter.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				if (listTourFilter[i].vehicle.includes("Máy bay")) {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
		if (!carFilter.classList.contains("active")) {
			for (let i = 0; i < listTourFilter.length; i++) {
				if (listTourFilter[i].vehicle.includes("Xe du lịch")) {
					listTourFilter.splice(i, 1);
					i--;
				}
			}
		}
	}

	if (fromPrice.value) {
		let fromPriceValue = Number(fromPrice.value.split(",").join(""));
		for (let i = 0; i < listTourFilter.length; i++) {
			let priceTicket = Number(
				listTourFilter[i].priceTicket.adult.split(".").join("")
			);
			if (priceTicket < fromPriceValue) {
				listTourFilter.splice(i, 1);
				i--;
			}
		}
	}

	if (toPrice.value) {
		let toPriceValue = Number(toPrice.value.split(",").join(""));
		for (let i = 0; i < listTourFilter.length; i++) {
			let priceTicket = Number(
				listTourFilter[i].priceTicket.adult.split(".").join("")
			);
			if (priceTicket > toPriceValue) {
				listTourFilter.splice(i, 1);
				i--;
			}
		}
	}

	loadListTour(listTourFilter);
};

// Sort select
let sortBtn = document.getElementById("sort-results");
sortBtn.onchange = function () {
	if (listTourFilter.length == 0) {
		for (let i = 0; i < listTourCurrent.length; i++) {
			listTourFilter.push(listTourCurrent[i]);
		}
	}
	if (sortBtn.value == "1") {
		listTourFilter.sort(function (x, y) {
			let xPrice, yPrice;
			if (x.discount != 0) {
				xPrice =
					(Number(x.priceTicket.adult.split(".").join("")) *
						(100 - Number(x.discount))) /
					100;
			} else {
				xPrice = Number(x.priceTicket.adult.split(".").join(""));
			}
			if (y.discount != 0) {
				yPrice =
					(Number(y.priceTicket.adult.split(".").join("")) *
						(100 - Number(y.discount))) /
					100;
			} else {
				yPrice = Number(y.priceTicket.adult.split(".").join(""));
			}
			return xPrice - yPrice;
		});
	} else {
		if (sortBtn.value == "2") {
			listTourFilter.sort(function (x, y) {
				let xPrice, yPrice;
				if (x.discount != 0) {
					xPrice =
						(Number(x.priceTicket.adult.split(".").join("")) *
							(100 - Number(x.discount))) /
						100;
				} else {
					xPrice = Number(x.priceTicket.adult.split(".").join(""));
				}
				if (y.discount != 0) {
					yPrice =
						(Number(y.priceTicket.adult.split(".").join("")) *
							(100 - Number(y.discount))) /
						100;
				} else {
					yPrice = Number(y.priceTicket.adult.split(".").join(""));
				}
				return yPrice - xPrice;
			});
		}
	}
	loadListTour(listTourFilter);
};

// Load địa điểm ưa chuộng
