function getParams() {
	var params = {},
		pairs = document.URL.split("?").pop().split("&");

	for (var i = 0, p; i < pairs.length; i++) {
		p = pairs[i].split("=");
		params[p[0]] = p[1];
	}
	return params;
}

// Function random from min to max
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
let listTour = [];
// Get tourDetail
fetch("./assets/data/tours.json")
	.then(function (response) {
		if (!response.ok) {
			throw new Error("HTTP error, status = " + response.status);
		}
		return response.json();
	})
	.then(function (data) {
		let idTour = getParams().id;
		for (let tour of data) {
			if (tour.id == idTour) {
				let htmlTourDetail = "";
				let htmlContent = "";
				// Load main
				let price;
				if (tour.discount == 0) {
					price = tour.priceTicket.adult;
				} else {
					price =
						(Number(tour.priceTicket.adult.split(".").join("")) *
							(100 - Number(tour.discount))) /
						100;
					price = Intl.NumberFormat().format(price);
				}
				let htmlMain = `
            <div class="main">
                <div class="main__code">
                    <span class="material-icons-outlined"> confirmation_number </span>
                    <span>${tour.code}</span>
                </div>
                <div class="main__heading">
                    <div class="main__heading-left">
                        <div class="main__heading-left--title">
                            ${tour.name}
                        </div>
                        <div class="main__heading-left--rating">
                            <span class="material-icons-outlined"> star </span>
                            <span>${tour.ratePoint}</span>
                        </div>
                    </div>
                    <div class="main__heading-right">
                        <div class="main__heading-right-top">
                            <p class="main__heading-right-top--price">
                                ${price}đ<span>/khách</span>
                            </p>
                            <button class="main__heading-right--book">
                                <a href="booking.html?id=${tour.id}">
                                    <span class="material-icons-outlined"> shopping_cart </span>
                                    Đặt ngay
		                        </a>
                            </button>
                        </div>
                        <div class="main__heading-right-bottom">
                            <button>
                                <a href="contact.html">
                                    Liên hệ tư vấn
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="main__img">
                    <div class="main__img-left">
                        <img src="./assets/image/tours/${
													tour.image[0]
												}" alt="" />
                    </div>
                    <div class="main__img-right">
                        <div class="main__img-right-top">
                            <div class="main__img-right-top--left">
                                <img src="./assets/image/tours/${
																	tour.image[1]
																}" alt="" />
                            </div>
                            <div class="main__img-right-top--right">
                                <img src="./assets/image/tours/${
																	tour.image[2]
																}" alt="" />
                            </div>
                        </div>
                        <div class="main__img-right-bottom">
                            <img src="./assets/image/tours/${
															tour.image[3]
														}" alt="" />
                        </div>
                    </div>
                </div>
                <div class="main__desc">
                    <div class="main__desc-left">
                        <div class="main__desc-left-row">
                            <p>Khởi hành: <span>${tour.dateStart}</span></p>
                        </div>
                        <div class="main__desc-left-row">
                            <p>Thời gian: <span>${
															tour.time.split("-")[0]
														}</span></p>
                        </div>
                        <div class="main__desc-left-row">
                            <p>Nơi khởi hành: <span>${
															tour.startLocation
														}</span></p>
                        </div>
                        <div class="main__desc-left-row">
                            <p>Số chỗ còn nhận: <span>${
															tour.leftSlot
														}</span></p>
                        </div>
                    </div>
                    <div class="main__desc-right">
                        <div class="main__desc-right-top">
                            <div class="main__desc-right-top-item">
                                <div class="main__desc-right-top-item--title">
                                    <span class="material-icons-outlined"> tour </span>
                                    <span>Thời gian</span>
                                </div>
                                <p class="main__desc-right-top-item--desc">${
																	tour.time.split("-")[0]
																} ngày ${tour.time.split("-")[1]} đêm</p>
                            </div>
                            <div class="main__desc-right-top-item">
                                <div class="main__desc-right-top-item--title">
                                    <span class="material-icons-outlined">
                                        directions_car
                                    </span>
                                    <span>Phương tiện</span>
                                </div>
                                <p class="main__desc-right-top-item--desc">${
																	tour.vehicle
																}</p>
                            </div>
                            <div class="main__desc-right-top-item">
                                <div class="main__desc-right-top-item--title">
                                    <span class="material-icons-outlined"> local_library </span>
                                    <span>Điểm du lịch</span>
                                </div>
                                <p class="main__desc-right-top-item--desc">
                                    ${tour.locationVisit}
                                </p>
                            </div>
                            <div class="main__desc-right-top-item">
                                <div class="main__desc-right-top-item--title">
                                    <span class="material-icons-outlined">
                                        restaurant_menu
                                    </span>
                                    <span>Ẩm thực</span>
                                </div>
                                <p class="main__desc-right-top-item--desc">
                                    ${tour.culinary}
                                </p>
                            </div>
                        </div>
                        <div class="main__desc-right-top">
                            <div class="main__desc-right-top-item">
                                <div class="main__desc-right-top-item--title">
                                    <span class="material-icons-outlined"> location_city </span>
                                    <span>Khách sạn</span>
                                </div>
                                <p class="main__desc-right-top-item--desc">Khách sạn ${
																	tour.hotel.numberStar
																} sao</p>
                            </div>
                            <div class="main__desc-right-top-item">
                                <div class="main__desc-right-top-item--title">
                                    <span class="material-icons-outlined"> watch_later </span>
                                    <span>Thời gian lý tưởng</span>
                                </div>
                                <p class="main__desc-right-top-item--desc">${
																	tour.idealTime
																}</p>
                            </div>
                            <div class="main__desc-right-top-item">
                                <div class="main__desc-right-top-item--title">
                                    <span class="material-icons-outlined">
                                        people_outline
                                    </span>
                                    <span>Đối tượng</span>
                                </div>
                                <p class="main__desc-right-top-item--desc">
                                    ${tour.object}
                                </p>
                            </div>
                            <div class="main__desc-right-top-item">
                                <div class="main__desc-right-top-item--title">
                                    <span class="material-icons-outlined"> app_shortcut </span>
                                    <span>Ưu đãi</span>
                                </div>
                                <p class="main__desc-right-top-item--desc">
                                    ${tour.endow}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main__support">
                    <p class="main__support-title">Quý khách cần hỗ trợ?</p>
                    <div class="main__support-choose">
                        <button class="main__support-choose--method">
                            <span class="material-icons-outlined"> call </span>
                            Gọi miễn phí qua internet
                        </button>
                        <button class="main__support-choose--method">
                            <span class="material-icons-outlined"> email </span>
                            Gửi yêu cầu hỗ trợ
                        </button>
                    </div>
                </div>
            </div>
                `;

				// Load time line
				let htmlTimeline = `
                <div class="timeline">
				    <div class="timeline__left">LỊCH TRÌNH</div>
				    <div class="timeline__right">
                `;
				let htmlTimelineDays = `
                    <div class="timeline__right-days">
                `;
				let htmlTimelineDesc = `
                    <div class="timeline__right-desc">
                `;
				var parts = tour.dateStart.split("/");
				var date = new Date(parts[2], parts[1] - 1, parts[0]);
				for (let i in tour.timeline) {
					var numberOfDaysToAdd = i;
					var myDate = new Date(
						date.getTime() + numberOfDaysToAdd * 24 * 60 * 60 * 1000
					);
					var dayTimeline =
						myDate.getDate() +
						"/" +
						(myDate.getMonth() + 1) +
						"/" +
						myDate.getFullYear();

					htmlTimelineDays += `
                    <div class="timeline__right-days--day">
                        Ngày ${Number(i) + 1}
                        <p>${dayTimeline}</p>
                    </div>
                    `;

					htmlTimelineDesc += `
                    <div class="timeline__right-desc--title">
                        ${tour.timeline[i].title}
                        <p>${tour.timeline[i].meal}</p>
                    </div>
                    `;
				}
				htmlTimelineDays += "</div>";
				htmlTimelineDesc += "</div>";

				htmlTimeline += htmlTimelineDays;
				htmlTimeline += htmlTimelineDesc;
				htmlTimeline += "</div>";
				htmlTimeline += "</div>";

				// Load infomation
				myDate = new Date(
					date.getTime() + Number(tour.time.split("-")[0]) * 24 * 60 * 60 * 1000
				);
				let returnDay =
					myDate.getDate() +
					"/" +
					(myDate.getMonth() + 1) +
					"/" +
					myDate.getFullYear();

				// Calculate arrival time start
				let movingTime = tour.movingTime.split(":");
				let hourMoving = Number(movingTime[0]);
				let minuteMoving = Number(movingTime[1]);

				let departureTime = tour.departureTime.split(":");
				let minuteDeparture = Number(departureTime[1]);
				let hourDeparture = Number(departureTime[0]);

				let arrivalTimeStart = ["", ""];

				if (minuteDeparture + minuteMoving >= 60) {
					arrivalTimeStart[1] = minuteDeparture + minuteMoving - 60;
					arrivalTimeStart[0] = hourMoving + hourDeparture + 1;
				} else {
					arrivalTimeStart[1] = minuteDeparture + minuteMoving;
					arrivalTimeStart[0] = hourMoving + hourDeparture;
				}
				arrivalTimeStart[0] =
					arrivalTimeStart[0] >= 24
						? arrivalTimeStart[0] - 24
						: arrivalTimeStart[0];

				// Calculate arrival time end
				let returnTime = tour.returnTime.split(":");
				let minuteReturn = Number(returnTime[1]);
				let hourReturn = Number(returnTime[0]);
				let arrivalTimeEnd = ["", ""];

				if (minuteDeparture + minuteReturn >= 60) {
					arrivalTimeEnd[1] = minuteReturn + minuteMoving - 60;
					arrivalTimeEnd[0] = hourMoving + hourReturn + 1;
				} else {
					arrivalTimeEnd[1] = minuteReturn + minuteMoving;
				}
				arrivalTimeEnd[0] =
					arrivalTimeEnd[0] >= 24 ? arrivalTimeEnd[0] - 24 : arrivalTimeEnd[0];

				// Calculate gather time
				let gatherTime = ["", ""];
				if (minuteDeparture - 30 < 0) {
					gatherTime[1] = minuteDeparture - 30 + 60;
					gatherTime[0] = hourDeparture - 1;
				} else {
					gatherTime[1] = minuteDeparture - 30;
					gatherTime[0] = hourDeparture;
				}

				let vehicle =
					tour.vehicle.split(",")[0] == "Máy bay"
						? "flight"
						: "directions_bus_filled";

				let htmlInfomation = `
                <div class="information">
                <div class="information-left">
                    <p class="information-title">Chi tiết tour</p>
                    <div class="information__detail">
                        <div class="information__detail-left">
                            <div class="information__detail-left--title">
                                Ngày đi - <span>${tour.dateStart}</span>
                            </div>
                            <div class="information__detail-left-location">
                                <div class="information__detail-left-location-pre">
                                    ${tour.startLocation}
                                    <p>(${tour.departureTime})</p>
                                </div>
                                <div class="line-transport">
                                    <span class="material-icons-outlined">
                                        ${vehicle}
                                    </span>
                                </div>
                                <div class="information__detail-left-location-pre">
                                    ${tour.name.split(" - ")[0]}
                                    <p>(${arrivalTimeStart.join(":")})</p>
                                </div>
                            </div>
                        </div>
                        <div class="information__detail-right">
                            <div class="information__detail-left--title">
                                Ngày về - <span>${returnDay}</span>
                            </div>
                            <div class="information__detail-left-location">
                                <div class="information__detail-left-location-pre">
                                ${tour.name.split(" - ")[0]}
                                    <p>(${tour.returnTime})</p>
                                </div>
                                <div class="line-transport">
                                    <span class="material-icons-outlined">
                                        ${vehicle}
                                    </span>
                                </div>
                                <div class="information__detail-left-location-pre">
                                    ${tour.startLocation}
                                    <p>(${arrivalTimeEnd.join(":")})</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="information__concentrate">
                        <p class="information-title">Thông tin tập trung</p>
                        <p class="information__concentrate-day">
                            Ngày giờ tập trung: <span>${gatherTime.join(
															":"
														)} - ${tour.dateStart}</span>
                        </p>
                        <p class="information__concentrate-day">
                            Nơi tập trung: <span>${tour.gatheringPlace}</span>
                        </p>
                    </div>
                </div>
                <div class="information__right">
                    <p class="information-title">Giá tour</p>
                    <div class="information__right-contain">
                        <div class="information__right-col">
                            <div class="information__right-col--title">Loại khách</div>
                            <p>Người lớn (từ 12 tuổi trở lên)</p>
                            <p>Trẻ em (từ 5-11 tuổi)</p>
                            <p>Trẻ nhỏ (từ 2-4 tuổi)</p>
                            <p>Em bé (dưới 2 tuổi)</p>
                        </div>
                        <div class="information__right-col">
                            <div class="information__right-col--title">Giá tour</div>
                            <p>${tour.priceTicket.adult}đ</p>
                            <p>${tour.priceTicket.children}đ</p>
                            <p>${tour.priceTicket.kid}đ</p>
                            <p>${tour.priceTicket.baby}đ</p>
                        </div>
                    </div>
                </div>
            </div>
                `;

				document.querySelector(".content").innerHTML =
					htmlMain + htmlTimeline + htmlInfomation;
				// Break the loop
				break;
			}
		}

		let randomMaybeLike = [];
		while (randomMaybeLike.length < 4) {
			let numberRandom = getRndInteger(0, 7);
			if (
				!randomMaybeLike.includes(numberRandom) &&
				numberRandom != getParams().id
			) {
				randomMaybeLike.push(numberRandom);
			}
		}
		// Load maybe like list
		let htmlMaybeLike = "";
		for (let i = 0; i < randomMaybeLike.length; i++) {
			let maybeLikeTour = data[randomMaybeLike[i]];

			let price = "";
			if (maybeLikeTour.discount == 0) {
				price = maybeLikeTour.priceTicket.adult;
			} else {
				price =
					(Number(maybeLikeTour.priceTicket.adult.split(".").join("")) *
						(100 - Number(maybeLikeTour.discount))) /
					100;
				price = Intl.NumberFormat().format(price);
			}
			htmlMaybeLike += `
        <div class="maybe-like__item">
            <div class="maybe-like__item-img">
                <a href="tour_detail.html?id=${maybeLikeTour.id}">
                    <img src="./assets/image/tours/${maybeLikeTour.image[0]}" alt="" />
                </a>
        </div>
        <div class="maybe-like__item-date">${maybeLikeTour.dateStart}</div>
        <div class="maybe-like__item-title">
            <a href="tour_detail.html?id=">
            ${maybeLikeTour.name}
            </a>
        </div>
        <div class="maybe-like__item-departure">
            Nơi khởi hành: ${maybeLikeTour.startLocation}
        </div>
        <div class="maybe-like__item-price">${price}đ</div>
        <div class="maybe-like__item-btn">
            <button>
            <a href="booking.html?id=${maybeLikeTour.id}">
                Đặt ngay
            </a>
            </button>
            <button>
                <a href="tour_detail.html?id=${maybeLikeTour.id}">Xem chi tiết</a>
            </button>
        </div>
    </div>
        `;
		}

		document.querySelector(".maybe-like__list").innerHTML = htmlMaybeLike;
	});
