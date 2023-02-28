function loadXML() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "./assets/data/header.xml", false);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			// Xử lý dữ liệu
			updateUI(this);
		} else {
			alert("Không lấy được dữ liệu");
		}
	};
	xhr.send();
}

function validateEmail(email) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
}

function validatePhone(phone) {
	const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

	return phone.match(regexPhoneNumber);
}

function updateUI(xhr) {
	// console.log("Lấy đc dữ liệu");
	let doc = xhr.responseXML;
	let header = doc.querySelector("header");
	document.getElementById("header").innerHTML = header.innerHTML;

	// Popup login
	const accountIcon = document.querySelector(".account-icon");
	const popupLogin = document.querySelector(".popup-login");
	// const modal = document.querySelector(".modal");
	accountIcon.onclick = function () {
		popupLogin.classList.toggle("active");
		// modal.classList.toggle("active");
	};

	// Click menu-btn
	const menuBtn = document.querySelector(".menu-btn");
	const nav = document.querySelector("nav");
	menuBtn.onclick = function () {
		nav.classList.toggle("active");
	};

	const closeBtn = document.querySelector(".close-btn");

	closeBtn.onclick = function () {
		popupLogin.classList.remove("active");
	};

	// Login button click
	const emailPhoneInput = document.getElementById("email-phone");
	const messageEmailPhone = document.getElementById("message-email-phone");
	const passwordInput = document.getElementById("password");
	const messagePassword = document.getElementById("message-password");
	const loginBtn = document.querySelector(".login-btn");

	emailPhoneInput.oninput = function () {
		emailPhoneInput.classList.remove("error");
		messageEmailPhone.textContent = "";
	};

	passwordInput.oninput = function () {
		passwordInput.classList.remove("error");
		messagePassword.textContent = "";
	};

	loginBtn.onclick = function () {
		let check = true;
		if (emailPhoneInput.value == "") {
			emailPhoneInput.classList.add("error");
			messageEmailPhone.textContent = "Cần nhập dữ liệu";
		}
		if (passwordInput.value == "") {
			passwordInput.classList.add("error");
			messagePassword.textContent = "Cần nhập dữ liệu";
			check = false;
		}
		if (check) {
			if (
				!validateEmail(emailPhoneInput.value) &&
				!validatePhone(emailPhoneInput.value)
			) {
				messageEmailPhone.textContent = "Email hoặc Sđt không hợp lệ";
				emailPhoneInput.classList.add("error");
				check = false;
				alert("Đăng nhập thất bại");
			} else {
				alert("Đăng nhập thành công");
				window.location.href = "account.html";
			}
		}
	};
}

loadXML();
