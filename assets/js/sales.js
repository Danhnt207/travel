fetch("./assets/data/sales.json")
	.then(function (response) {
		if (!response.ok) {
			throw new Error("HTTP error, status = " + response.status);
		}
		return response.json();
	})
	.then(function (data) {
		let htmlSales = "";
		for (let i in data) {
			tourSale = data[i];
			let newPrice =
				(Number(tourSale.priceTicket.adult.split(".").join("")) *
					(100 - Number(tourSale.discount))) /
				100;
			newPrice = Intl.NumberFormat().format(newPrice);
			htmlSales += `
			<div class="col">
			<div class="sale-item">
				<div class="thumb">
					<a href="tour_detail.html?id=${tourSale.id}">
						<img src="./assets/image/tours/${tourSale.image[0]}" alt="" />
					</a>
					<span class="material-icons-sharp favorite-icon">
						favorite_border
					</span>
					<span class="material-icons-sharp favorite-icon-yes">
						favorite
					</span>
					<div class="rate">
						<span class="material-icons-sharp rate__icon"> star </span>
						<span class="rate__point">${tourSale.ratePoint}</span>
					</div>
				</div>
				<div class="info">
					<span class="info__date">${tourSale.dateStart} - ${
				tourSale.time.split("-")[0]
			} ngày </span>
					<div class="info__name">
						<a href="${tourSale.id}">
							${tourSale.name}
						</a>
					</div>
					<div class="info__code">
						Mã tour
						<br />
						<div>
							<span class="material-icons-sharp ticket-icon">
								confirmation_number
							</span>
							<span>${tourSale.code}</span>
						</div>
					</div>
					<div class="info__start">Nơi khởi hành: ${tourSale.startLocation}</div>
					<div class="info__old-price">Giá <span>${
						tourSale.priceTicket.adult
					}đ</span></div>
					<div class="info__new-price">
						<span class="price">${newPrice}đ</span>
						<span class="discount">${tourSale.discount}% giảm giá</span>
					</div>

					<div class="info__remaining-seats">
						Số chỗ còn lại: <span>${tourSale.leftSlot}</span>
					</div>
				</div>
			</div>
		</div>
			`;

			document.querySelector(".list-sales").innerHTML = htmlSales;

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
	});
