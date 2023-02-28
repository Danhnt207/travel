var swiperEndow = new Swiper(".endow-slider", {
	loop: true,
	spaceBetween: 20,
	autoplay: {
		delay: 7500,
		disableOnInteraction: false,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	breakpoints: {
		992: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 2,
		},
		576: {
			slidesPerView: 1,
		},
	},
});

var swiperExplore = new Swiper(".explore-slider", {
	spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	breakpoints: {
		992: {
			slidesPerView: 4,
		},
		768: {
			slidesPerView: 3,
		},
		576: {
			slidesPerView: 2,
		},
		320: {
			slidesPerView: 1,
		},
	},
});
