function getParams() {
  var params = {},
    pairs = document.URL.split("?").pop().split("&");
  for (var i = 0; i < pairs.length; i++) {
    p = pairs[i].split("=");
    params[p[0]] = p[1];
  }
  return params;
}
function getTour() {
  fetch("./assets/data/tours.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Đã có lỗi xảy ra :(");
      }
      return response.json();
    })
    .then(function (data) {
      let html = "";
      let html2 = "";
      let idTour = getParams().id;
      document.querySelector(".id").value = idTour;
      for (let tour of data) {
        if (idTour == tour.id) {
          html = `
          <div class="product__img">
          <img src="./assets/image/tours/${tour.image[0]}" alt="" />
        </div>
        <div class="product__description">
          <div class="product__description-score">
            <span class="rating"
              ><span class="icon material-icons-sharp"> star </span>
              ${tour.ratePoint}</span
            >
            <span class="form__title">Rất tốt</span>
            <span>365 quan tâm</span>
          </div>
          <h3 class="product__description-title">
            ${tour.name}
          </h3>
          <div class="product__description-details">
            <span
              >Mã tour: <b>${tour.code} </b> <br />
              Khởi hành: <b>${tour.dateStart}</b> <br />
              Thời gian: <b>${tour.time.split("-")[0]} ngày </b><br />
              Nơi khởi hành: <b>${tour.startLocation}</b> <br />
              Số chỗ còn nhận: <b>${tour.leftSlot}</b></span
            >
          </div>
        </div>
                `;
          var parts = tour.dateStart.split("/");
          var someDate = new Date(parts[2], parts[1] - 1, parts[0]);
          var numberOfDaysToAdd = parseInt(tour.time.split("-")[0]);
          var myDate = new Date(
            someDate.getTime() + numberOfDaysToAdd * 24 * 60 * 60 * 1000
          );
          var dayEnd =
            myDate.getDate() +
            "/" +
            (myDate.getMonth() + 1) +
            "/" +
            myDate.getFullYear();
          html2 = `<div class="row">
          <div class="payment-info__product row">
            <img src="./assets/image/tours/${tour.image[0]}" alt="" />
            <div class="payment-info__product-title">
            ${tour.name} <br><br>  Giảm giá vé: ${tour.discount}%
            </div>
          </div>
        </div>
        <div class="payment-info__period">
          <div class="payment-info__date-start">
            <span class="icon material-icons-sharp form__title">
              calendar_month
            </span>
            <span class="date"
              >Bắt đầu chuyến đi: <br />
              <b class="form__title">${tour.dateStart}</b>
            </span>
          </div>
          <hr />
          <div class="payment-info__date-end">
            <span class="icon material-icons-sharp form__title">
              calendar_month
            </span>
            <span class="date"
              >Kết thúc chuyến đi: <br />
              <b class="form__title">${dayEnd}</b></span
            >
          </div>
        </div>`;
          document.querySelector(".single-room-price").innerHTML =
            tour.hotel.price.single + "đ";
          document.querySelector(".twin-room-price").innerHTML =
            tour.hotel.price.twin + "đ";
          document.querySelector(".double-room-price").innerHTML =
            tour.hotel.price.double + "đ";
          document.querySelector(".triple-room-price").innerHTML =
            tour.hotel.price.triple + "đ";

          document.querySelector(".adult-price").innerHTML =
            tour.priceTicket.adult;
          document.querySelector(".children-price").innerHTML =
            tour.priceTicket.children;
          document.querySelector(".kid-price").innerHTML = tour.priceTicket.kid;
          document.querySelector(".baby-price").innerHTML =
            tour.priceTicket.baby;
          document.querySelector(".discount").innerHTML =
            tour.discount.replaceAll("%", "");
          document.querySelector(".fullName").innerText = tour.code;
        }
      }
      document.getElementById("product").innerHTML = html;
      document.getElementById("payment-product").innerHTML = html2;
    })
    .catch(function (error) {
      alert(error.message);
    });
}
getTour();

function increaseInput(a) {
  let input = parseInt(document.querySelector(a).value);
  input++;
  document.querySelector(a).value = input;
}
function descreaseInput(a) {
  let input = parseInt(document.querySelector(a).value);
  if (input > 0) input--;
  else return;
  document.querySelector(a).value = input;
}

function openRow(a) {
  document.getElementById(a).classList.toggle("unlock");
}
function addAdult() {
  let quantity = parseInt(document.querySelector(".quantity-1").value);
  let html = "";
  for (let i = 0; i < quantity; i++) {
    html += `<div class="row">
    <span class="width-40">Họ tên</span>
    <span class="width-20">Giới tính</span>
    <span class="width-20">Ngày sinh</span>
    <span class="width-20">Số điện thoại</span>
  </div>
  <div class="row">
    <input
      type="text"
      class="form__input width-40"
      placeholder="Vui lòng nhập họ tên"
    />
    <input
      type="text"
      class="form__input width-20"
      name=""
      id=""
      placeholder="Giới tính"
    />
    <input type="date" class="form__input width-20" name="" id="" />
    <input
      type="text"
      class="form__input width-20"
      placeholder="Số điện thoại"
    />
  </div>
  </div>`;
  }
  document.getElementById("adult").innerHTML = html;
}
function addChildren() {
  let quantity = parseInt(document.querySelector(".quantity-2").value);
  let html = "";
  for (let i = 0; i < quantity; i++) {
    html += `<div class="row">
<span class="width-40">Họ tên</span>
<span class="width-30">Giới tính</span>
<span class="width-30">Ngày sinh</span>
</div>
<div class="row">
<input
  type="text"
  class="form__input width-40"
  placeholder="Vui lòng nhập họ tên"
/>
<input
  type="text"
  class="form__input width-30"
  name=""
  id=""
  placeholder="Giới tính"
/>
<input type="date" class="form__input width-30" name="" id="" />
</div>`;
  }
  document.getElementById("children").innerHTML = html;
}
function buyNow() {
  document.getElementById("infoForm").submit();
}
function update() {
  let html = "";
  if (document.querySelector("#single-room").checked) {
    let singNum = parseInt(document.querySelector("#single_num").value);
    html += `<div class="row between">
    <span class="payment-info__tag">Phòng Single</span>
    <span class="payment-info__quantity">${singNum} x ${
      document.querySelector(".single-room-price").innerText
    }</span>
  </div>`;
  }
  if (document.querySelector("#twin-room").checked) {
    let twinNum = parseInt(document.querySelector("#twin_num").value);
    html += `<div class="row between">
    <span class="payment-info__tag">Phòng Twin</span>
    <span class="payment-info__quantity">${twinNum} x ${
      document.querySelector(".twin-room-price").innerText
    }</span>
  </div>`;
  }
  if (document.querySelector("#double-room").checked) {
    let doubleNum = parseInt(document.querySelector("#double_num").value);
    html += `<div class="row between">
    <span class="payment-info__tag">Phòng Double</span>
    <span class="payment-info__quantity">${doubleNum} x ${
      document.querySelector(".double-room-price").innerText
    }</span>
  </div>`;
  }
  if (document.querySelector("#triple-room").checked) {
    let tripleNum = parseInt(document.querySelector("#triple_num").value);
    html += `<div class="row between">
    <span class="payment-info__tag">Phòng Triple</span>
    <span class="payment-info__quantity">${tripleNum} x ${
      document.querySelector(".triple-room-price").innerText
    }</span>
  </div>`;
  }
  document.querySelector(".hotel").innerHTML = html;
}
function updateCustomer() {
  let quantity_adult = parseInt(document.querySelector(".quantity-1").value);
  let quantity_children = parseInt(document.querySelector(".quantity-2").value);
  let quantity_kid = parseInt(document.querySelector(".quantity-3").value);
  let quantity_baby = parseInt(document.querySelector(".quantity-4").value);
  let html = "";
  if (quantity_adult != 0) {
    html += `<div class="row between">
    <span class="payment-info__tag">Người lớn</span>
    <span class="payment-info__quantity"> ${quantity_adult} x ${
      document.querySelector(".adult-price").innerText
    }đ</span>
  </div>`;
  }
  if (quantity_children != 0) {
    html += `<div class="row between">
    <span class="payment-info__tag">Trẻ em</span>
    <span class="payment-info__quantity"> ${quantity_children} x ${
      document.querySelector(".children-price").innerText
    }đ</span>
  </div>`;
  }
  if (quantity_kid != 0) {
    html += `<div class="row between">
    <span class="payment-info__tag">Trẻ nhỏ</span>
    <span class="payment-info__quantity"> ${quantity_kid} x ${
      document.querySelector(".kid-price").innerText
    }đ</span>
  </div>`;
  }
  if (quantity_baby != 0) {
    html += `<div class="row between">
    <span class="payment-info__tag">Em bé</span>
    <span class="payment-info__quantity"> ${quantity_baby} x ${
      document.querySelector(".baby-price").innerText
    }đ</span>
  </div>`;
  }
  document.querySelector(".customer").innerHTML = html;
}
function calTotalPrice() {
  let quantity_adult = parseInt(document.querySelector(".quantity-1").value);
  let quantity_children = parseInt(document.querySelector(".quantity-2").value);
  let quantity_kid = parseInt(document.querySelector(".quantity-3").value);
  let quantity_baby = parseInt(document.querySelector(".quantity-4").value);
  let price_adult = parseInt(
    document.querySelector(".adult-price").innerText.replaceAll(".", "")
  );
  let price_children = parseInt(
    document.querySelector(".children-price").innerText.replaceAll(".", "")
  );
  let price_kid = parseInt(
    document.querySelector(".kid-price").innerText.replaceAll(".", "")
  );
  let price_baby = parseInt(
    document.querySelector(".baby-price").innerText.replaceAll(".", "")
  );
  let discount = parseInt(document.querySelector(".discount").innerText);
  let singleNum = 0,
    twinNum = 0,
    doubleNum = 0,
    tripleNum = 0,
    singlePrice = 0,
    twinPrice = 0,
    doublePrice = 0,
    triplePrice = 0;

  if (document.querySelector("#single-room").checked) {
    singleNum = parseInt(document.querySelector("#single_num").value);
    singlePrice = parseInt(
      document
        .querySelector(".single-room-price")
        .innerText.replaceAll(".", "")
        .replaceAll("đ")
    );
  }
  if (document.querySelector("#twin-room").checked) {
    twinNum = parseInt(document.querySelector("#twin_num").value);
    twinPrice = parseInt(
      document
        .querySelector(".twin-room-price")
        .innerText.replaceAll(".", "")
        .replaceAll("đ")
    );
  }
  if (document.querySelector("#double-room").checked) {
    doubleNum = parseInt(document.querySelector("#double_num").value);
    doublePrice = parseInt(
      document
        .querySelector(".double-room-price")
        .innerText.replaceAll(".", "")
        .replaceAll("đ")
    );
  }
  if (document.querySelector("#triple-room").checked) {
    tripleNum = parseInt(document.querySelector("#triple_num").value);
    triplePrice = parseInt(
      document
        .querySelector(".triple-room-price")
        .innerText.replaceAll(".", "")
        .replaceAll("đ")
    );
  }
  let totalPrice =
    ((price_adult * quantity_adult +
      price_children * quantity_children +
      price_kid * quantity_kid +
      price_baby * quantity_baby) *
      (100 - discount)) /
      100 +
    singleNum * singlePrice +
    twinNum * twinPrice +
    doubleNum * doublePrice +
    tripleNum * triplePrice;
  var moneyFormatter = new Intl.NumberFormat();
  totalPrice = moneyFormatter.format(totalPrice);
  document.getElementById("total-price").innerHTML = totalPrice + "đ";
}

function loadMethod() {
  fetch("./assets/data/payment-method.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error, status=" + response.status);
      }
      return response.json();
    })
    .then(function (paymentList) {
      document.querySelector(".fullName").innerText +=
        " " + document.querySelector("#fullName").value;
      let html = "";
      for (let i = 0; i < paymentList.length; i = i + 2) {
        html += `<div class="row">
        <div class="payment-method__item">
          <img src="./assets/image/payment/${paymentList[i].image}" alt="" />
          <label for="payment-method-${paymentList[i].id}">${
          paymentList[i].name
        }</label>
          <input type="radio" name="payment-method" id="payment-method-${
            paymentList[i].id
          }" value='${paymentList[i].id}' />
        </div>
        <div class="payment-method__item">
        <img src="./assets/image/payment/${paymentList[i + 1].image}" alt="" />
        <label for="payment-method-${paymentList[i + 1].id}">${
          paymentList[i + 1].name
        }</label>
        <input type="radio" name="payment-method" id="payment-method-${
          paymentList[i + 1].id
        }" value='${paymentList[i + 1].id}'/>
      </div>
      </div>`;
      }
      html += `<h3 class="form__title">Điều khoản bắt buộc khi thanh toán online</h3>
      <p>
        NỘI DUNG ĐỌC, HIỂU VÀ ĐỒNG Ý TRƯỚC KHI ĐĂNG KÝ ONLINE CHƯƠNG TRÌNH
        DU LỊCH TRONG NƯỚC Tôi đã hiểu rõ và đồng ý với các nội dung liên
        quan đến chương trình tour trong giai đoạn bình thường mới và điều
        kiện bán tour như sau: <br />
        1. Trường hợp tour di chuyển bằng xe/tàu hỏa/tàu thủy thì Khách phải
        đảm bảo đã hoàn thành tiêm 02 mũi vắc xin và có giấy xác nhận tiêm
        chủng (mũi thứ 02 từ 14 ngày trở lên và không quá 12 tháng) hoặc F0
        đã khỏi bệnh COVID-19 trong vòng 06 tháng có giấy xác nhận của bệnh
        viện tính đến thời điểm đi du lịch. Theo chính sách của cơ quan nhà
        nước, địa phương nơi điểm đi, điểm đến, các điều kiện trên có thể
        thay đổi tùy từng thời điểm cụ thể và Vietravel sẽ thông báo cho
        Khách hàng để bổ sung theo yêu cầu. <br />
        2. Trẻ em (đi cùng ba mẹ) phải xét nghiệm COVID-19 và có giấy xác
        nhận âm tính của cơ sở Y tế trước ngày khởi hành 24h (chi phí xét
        nghiệm tự túc).
      </p>
      <input type="checkbox" name="" id="policy-confirm" />
      <label class='policy-confirm' for="policy-confirm">Tôi đồng ý với các điều khoản trên</label>`;
      document.querySelector(".col-left").innerHTML = html;
      document.querySelector(".new-btn-submit").innerHTML = `<input
      id="submit"
      type="submit"
      class="form__btn btn-submit"
      value="Thanh toán ngay"
      onclick="makePayment()"
    />`;
      document.querySelector(".step1").classList.remove("bold");
      document.querySelector(".step2").classList.add("bold");
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function makePayment() {
  document.querySelector(".modal-body").innerHTML =
    document.querySelector(".customer").innerHTML +
    document.querySelector(".hotel").innerHTML +
    `
    <div class="row between row-total-price">
               ${document.querySelector(".row-total-price").innerHTML}
               </div>
               <p class='row'><span class="material-icons-sharp">
               navigate_next
               </span> Chuyển khoản nội dung: ${
                 document.querySelector(".fullName").innerText
               }  </p>
    `;
  var checked_method = document.querySelector(
    'input[name = "payment-method"]:checked'
  );
  if (checked_method == null) {
    alert("Chưa chọn phương thức thanh toán");
    return; //Alert, nothing was checked.
  }
  if (!document.getElementById("policy-confirm").checked) {
    alert("Bạn chưa đồng ý với điều khoản dịch vụ");
    return;
  }
  loadQR();
  document.getElementById("myModal").classList.toggle("open");
}
// ===========Modal=======================
function loadQR() {
  fetch("./assets/data/payment-method.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error, status=" + response.status);
      }
      return response.json();
    })
    .then(function (paymentList) {
      for (let i = 0; i < paymentList.length; i++)
        if (
          document.querySelector('input[name = "payment-method"]:checked')
            .value == paymentList[i].id
        ) {
          document.querySelector(
            ".modal-footer"
          ).innerHTML = `<img src="./assets/image/QR/${paymentList[i].qr}" alt="">`;
          document.querySelector(".modal__method-name").innerHTML =
            paymentList[i].name;
        }
    })
    .catch(function (error) {
      alert(error.message);
    });
}

const modal = document.getElementById("myModal");
modal.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("open");
  }
};
function closeModal() {
  modal.classList.remove("open");
}

function validationInput() {
  if (document.querySelector("#fullName").value == "") {
    alert("Bạn chưa nhập tên");
    return;
  }
  if (document.querySelector("#email").value == "") {
    alert("Bạn chưa nhập email");
    return;
  } else {
    if (!validateEmail(document.querySelector("#email").value)) {
      alert("Vui lòng nhập đúng định dạng email");
      return;
    }
  }
  if (document.querySelector("#phone").value == "") {
    alert("Bạn chưa nhập SĐT");
    return;
  } else {
    if (!validatePhone(document.querySelector("#phone").value)) {
      alert("Vui lòng nhập đúng định dạng SĐT");
      return;
    }
  }
  if (document.querySelector(".customer").innerHTML == "") {
    alert("Vui lòng đăng ký số lượng khách hàng");
    return;
  }
  if (document.querySelector(".hotel").innerHTML == "") {
    alert("Vui lòng đăng ký phòng khách sạn");
    return;
  }
  buyNow();
  loadMethod();
}
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  return phone.match(regexPhoneNumber);
}
