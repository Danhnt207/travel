function openInfo(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }


document.getElementById('openModalLogout').addEventListener("click", function() {
    document.getElementById("modal").classList.add("active");
})

const closes = document.querySelectorAll(".modal__close");
for (let close of closes) {
    close.addEventListener("click", function () {
        document.getElementById("modal").classList.remove("active");
      });
}

document.getElementById('modal').addEventListener("click", function() {
  document.getElementById("modal").classList.remove("active");

})
document.querySelector('.modal__logout-content').addEventListener("click", function(event) {
 event.stopPropagation();
/*--------------------------------*/




})
document.getElementById('openModalRating').addEventListener("click", function() {
  document.getElementById("modal2").classList.add("active");
})
document.getElementById("form-rating__row-btn--send").addEventListener("click", function() {
  alert("Gửi đánh giá thành công!")
})
const close = document.querySelector("#form-rating__row-btn--close");

close.addEventListener("click", function () {
      document.getElementById("modal2").classList.remove("active");
    });


document.getElementById('modal2').addEventListener("click", function() {
document.getElementById("modal2").classList.remove("active");

})
document.querySelector('.modal__rating-content').addEventListener("click", function(event) {
event.stopPropagation();

})
