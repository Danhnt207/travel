// var name = document.querySelector("#name");
// var email = document.querySelector("#email");
// var phone = document.querySelector("#phone");
// var pass = document.querySelector("#pass");
// var confirmPass = document.querySelector("#confirmpass");
// var form = document.querySelector("form");
// function showError(input) {
//     let parent = input.parrentElement;
//     let small = parent.querySelector('small');
//     parent.classList.add('error');
//     small.innerText = message; 
// }
// function showSuccess(input) {
//     let parent = input.parrentElement;
//     let small = parent.querySelector('small');
//     parent.classList.remove('error');
// }
// function checkEmptyError(listInput) {
//     let isEmptyError = false;
//     listInput.forEach(input => {
//         input.value = input.value.trim()

//         if(!input.value) {
//             isEmptyError = true;
//             showError(input, "Thông tin không được để trống")
//         }
//         else {
//             showSuccess(input);
//         }
//     })
// }

// showError(username, "Lỗi")
// form.addEventListener('submit', function(e) {
//     e.preventDefault()

//     let isEmptyError = checkEmptyError([name, email, phone, pass, confirmPass])
// })


// const usernameEle = document.getElementById('name');
// const emailEle = document.getElementById('email');
// const phoneEle = document.getElementById('phone');

// const btnRegister = document.getElementById('btn-register');
// const inputEles = document.querySelectorAll('.right__item');

// btnRegister.addEventListener('click', function () {
//     Array.from(inputEles).map((ele) =>
//         ele.classList.remove('success', 'error')
//     );
//     let isValid = checkValidate();

//     if (isValid) {
//         alert('Gửi đăng ký thành công');
//     }
// });

// function checkValidate() {
//     let usernameValue = usernameEle.value;
//     let emailValue = emailEle.value;
//     let phoneValue = phoneEle.value;

//     let isCheck = true;

//     if (usernameValue == '') {
//         setError(usernameEle, 'Tên không được để trống');
//         isCheck = false;
//     } else {
//         setSuccess(usernameEle);
//     }

//     if (emailValue == '') {
//         setError(emailEle, 'Email không được để trống');
//         isCheck = false;
//     } else if (!isEmail(emailValue)) {
//         setError(emailEle, 'Email không đúng định dạng');
//         isCheck = false;
//     } else {
//         setSuccess(emailEle);
//     }

//     if (phoneValue == '') {
//         setError(phoneEle, 'Số điện thoại không được để trống');
//         isCheck = false;
//     } else if (!isPhone(phoneValue)) {
//         setError(phoneEle, 'Số điện thoại không đúng định dạng');
//         isCheck = false;
//     } else {
//         setSuccess(phoneEle);
//     }

//     return isCheck;
// }

// function setSuccess(ele) {
//     ele.parentNode.classList.add('success');
// }

// function setError(ele, message) {
//     let parentEle = ele.parentNode;
//     parentEle.classList.add('error');
//     parentEle.querySelector('small').innerText = message;
// }

// function isEmail(email) {
//     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//         email
//     );
// }

// function isPhone(number) {
//     return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
// }
// document.getElementById("btn-register").disabled=true;
var check = true;
function showHidepassword() {
  if(check) {
      document.getElementById('pass').type = "text";
      document.getElementById('confirmpass').type = "text";
      check = false;
  }
  else {
      document.getElementById('pass').type = "password";
      document.getElementById('confirmpass').type = "password";
      check = true;
  }
}
function register() {
    document.getElementById("registerForm").submit();
}
// document.getElementById("btn-register").addEventListener('click', function () {
//       let isValid = validationInput();
//       if (isValid) {
//           alert('Gửi đăng ký thành công');
//       }
//   });
  
function validationInput() {
    if (document.querySelector("#name").value == "") {
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
    if (document.querySelector("#pass").innerHTML == "") {
      alert("Bạn chưa nhập mật khẩu");
      return;
    }
    if (document.querySelector("#confirmpass").innerHTML == "") {
      alert("Vui lòng nhập lại mật khẩu");
      return;
    }
  register();

  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhone(phone) {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  
    return phone.match(regexPhoneNumber);
  };
