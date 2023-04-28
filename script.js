function calculate(ele) {
  let slectPrice = ele.parentNode.children[1].children[0];
  ele.style.background = `linear-gradient(to right, #EC4CB4 0%, #EC4CB4 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #D1D1D1 ${((ele.value - ele.min) / (ele.max - ele.min)) * 100}%, #D1D1D1 100%)`;
  ele.value = ele.value;
  // Result in percentage
  if (ele.id == "balloon") {
    ele.parentNode.children[0].children[0].value = formateNumber(ele.value);
  } else slectPrice.value = formateNumber(ele.value);

  calculateResult();
}

function calculateResult() {
  let amount = filterVal(document.getElementById("amount").value);
  let balloon = filterVal(document.getElementById("balloon").value) / 100;
  let apr = filterVal(document.getElementById("apr").value);
  let term = filterVal(document.getElementById("term").value);
  let freq = document.getElementById("freq").value.split("-");
  let checkBox = document.getElementById("checkBox").checked;
  let balloonamount = amount * balloon;
  let res = GetPrice(amount, term, apr, freq[0] * 1, checkBox == true ? balloonamount : 0);
  document.getElementById("res__value").innerHTML =
    "$" + formateNumber(res) + `<span class="small__text">/${freq[1]}</span>`;
  document.getElementById("ballonPay").innerHTML = "$" + formateNumber(balloonamount);
}
function GetPrice(loanamount, loanterm, loaninterest, loanmonthweek, balloonamount) {
  var interest_rate = loaninterest / loanmonthweek / 100;
  var loan_term = loanterm * loanmonthweek;
  if (balloonamount > 0) {
    var amount =
      ((loanamount - balloonamount / Math.pow(1 + interest_rate, loan_term)) * interest_rate) /
      (1 - Math.pow(1 + interest_rate, -loan_term));
  } else {
    var amount = (interest_rate * loanamount) / (1 - Math.pow(1 + interest_rate, -loan_term));
  }

  return amount;
}

function formatCurrency(val) {
  let newVal = filterVal(val.value);
  val.value = `${formateNumber(newVal)}`;
}
function changeSlider(value, id) {
  let slider = document.getElementById(id);
  slider.value = filterVal(value.value);
  slider.style.background = `linear-gradient(to right,  #EC4CB4 0%,  #EC4CB4 ${
    ((slider.value - slider.min) / (slider.max - slider.min)) * 100
  }%, #D1D1D1 ${((slider.value - slider.min) / (slider.max - slider.min)) * 100}%, #D1D1D1 100%)`;
  calculateResult();
}
function numberWithCommas(x) {
  return formatter.format(x).replace("$", "");
}
function formateNumber(val) {
  if (isNaN(val)) return 0;
  if (!isFinite(val)) return 0;
  return numberWithCommas(val);
}
function filterVal(val) {
  return (
    val.toString().replace("$", "").replace(/,/g, "").replace("%", "").replace(" year", "") * 1
  );
}
// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
function toggleBalloon() {
  let checkBox = document.getElementById("checkBox").checked;
  checkBox == true
    ? (document.querySelectorAll(".ballon__box")[0].style.display = "block")
    : (document.querySelectorAll(".ballon__box")[0].style.display = "none");
  checkBox == true
    ? (document.querySelectorAll(".ballon__box")[1].style.display = "block")
    : (document.querySelectorAll(".ballon__box")[1].style.display = "none");
}
function slideUpForm() {
  document.querySelector(".input__container--calc").style.display = "none";
  document.querySelector(".output__container--calc").style.display = "none";
  //   contact__form
  $(".form__container").slideToggle("fast");
}
function slideDownForm() {
  //   contact__form
  $(".form__container").slideToggle("fast", () => {
    document.querySelector(".input__container--calc").style.display = "block";
    document.querySelector(".output__container--calc").style.display = "flex";
  });
}
// window.onload = function () {
//   document
//     .getElementById("contact__form")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();
//       document.getElementById("loan").value =
//         document.getElementById("res__value").innerHTML;
//       // generate a five digit number for the contact_number variable
//       this.contact_number.value = (Math.random() * 100000) | 0;
//       document.getElementById("btn__form").innerHTML =
//         '<div class="load"></div>';
//       document.getElementById("btn__form").disabled = true;
//       // these IDs from the previous steps
//       emailjs.sendForm("service_1m6b7ha", "template_y4jjtuh", this).then(
//         function () {
//           document.getElementById("btn__form").innerHTML =
//             "Application Submitted";
//           document.getElementById("btn__form").disabled = true;
//           console.log("SUCCESS!");
//         },
//         function (error) {
//           document.getElementById("btn__form").innerHTML = "Try Again";
//           document.getElementById("btn__form").disabled = false;
//           console.log("FAILED...", error);
//         }
//       );
//     });
// };
