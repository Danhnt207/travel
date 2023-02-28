function loadXML() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "./assets/data/footer.xml", false);

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

function updateUI(xhr) {
	// console.log("Lấy đc dữ liệu");
	let doc = xhr.responseXML;
	let footer = doc.querySelector("footer");
	document.getElementById("footer").innerHTML = footer.innerHTML;
}

loadXML();
