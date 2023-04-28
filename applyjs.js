const sections = ["section1", "section2", "section3", "section4", "section5"];
const width = [0, 25, 50, 75, 100];
const inpFields = [
  ["whichMake"],
  [],
  ["fname", "lname", "dob", "driverLic", "email", "mobile", "address", "town", "postCode"],
  ["employerName"],
  [],
];
let length = 1;
let step = 0;
function next() {
  if (!validateForm()) return;
  hideAll();
  ++step;
  if (step == 4) {
    document.getElementById("btn__next").style.display = "none";
    document.getElementById("btn__submit").style.display = "block";
  } else {
    document.getElementById("btn__next").style.display = "block";
    document.getElementById("btn__submit").style.display = "none";
  }
  document.querySelector(".progressed").style.width = width[step] + "%";
  document.getElementById(sections[step]).style.display = "block";
}
function pre() {
  if (step <= 0) return;
  hideAll();
  --step;
  if (step == 4) {
    document.getElementById("btn__next").style.display = "none";
    document.getElementById("btn__submit").style.display = "block";
  } else {
    document.getElementById("btn__next").style.display = "block";
    document.getElementById("btn__submit").style.display = "none";
  }
  document.querySelector(".progressed").style.width = width[step] + "%";
  document.getElementById(sections[step]).style.display = "block";
}
function calculate(ele) {
  let slectPrice = ele.parentNode.children[1].children[0];
  ele.style.background = `linear-gradient(to right, #EC4CB4 0%, #EC4CB4 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #D1D1D1 ${((ele.value - ele.min) / (ele.max - ele.min)) * 100}%, #D1D1D1 100%)`;
  //   console.log(slectPrice)
  ele.value = ele.value;
  // Result in percentage

  slectPrice.value = formateNumber(ele.value);
}
function changeSlider(value, id) {
  let slider = document.getElementById(id);
  slider.value = filterVal(value.value);
  slider.style.background = `linear-gradient(to right,  #EC4CB4 0%,  #EC4CB4 ${
    ((slider.value - slider.min) / (slider.max - slider.min)) * 100
  }%, #D1D1D1 ${((slider.value - slider.min) / (slider.max - slider.min)) * 100}%, #D1D1D1 100%)`;
}
function formatCurrency(val) {
  let newVal = filterVal(val.value);
  val.value = `${formateNumber(newVal)}`;
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
function hideAll() {
  sections.forEach((s) => {
    document.getElementById(s).style.display = "none";
  });
}
function validateForm() {
  let res = true;
  if (!inpFields[step]) return res;
  inpFields[step].forEach((i) => {
    let val = document.getElementById(i).value * 1;
    if (val == "" || val == null) {
      document.getElementById(i).style.border = "1px solid red";
      res = false;
    } else document.getElementById(i).style.border = "1px solid #ddd";
  });
  return res;
}
function addLiability() {
  let ele = document.getElementById("liability__append");
  length++;
  let html = `
  <div class="grid6x6" id="rowGrid${length}">
                  <div class="row__calc">
                    <label class="label__calc">Lender Name: </label>
                    <div class="combined__calc">
                      <input
                        type="text"
                        class="input__calc"
                        name="lenderName${length}"
                        id="lenderName${length}"
                      />
                    </div>
                  </div>
                  <div class="row__calc">
                    <label class="label__calc">Loan Type: </label>
                    <div class="combined__calc">
                      <select class="input__calc" name="loanType${length}" id="loanType${length}">
                        <option value="Car">Car</option>
                        <option value="Motorbike">Motorbike</option>
                        <option value="Caravan">Caravan</option>
                        <option value="Jet ski">Jet ski</option>
                        <option value="Boat">Boat</option>
                        <option value="Truck">Truck</option>
                        <option value="Personal/Business">Personal/Business</option>
                        <option value="Mortgage">Mortgage</option>
                        <option value="Credit Card">Credit Card</option>
                      </select>
                    </div>
                  </div>
                  <div class="row__calc">
                    <label class="label__calc">Balance(approx) </label>
                    <div class="combined__calc">
                      <input
                        type="text"
                        inputmode="numeric"
                        class="input__calc"
                        value="0"
                        name="balance${length}"
                        id="balance${length}"
                      />
                    </div>
                  </div>
                  <div class="row__calc">
                    <label class="label__calc">Repayment </label>
                    <div class="combined__calc">
                      <input
                        type="text"
                        inputmode="numeric"
                        class="input_calc"
                        value="0"
                        name="repayment${length}"
                        id="repayment${length}"
                      />
                      <span class="unit__calc">$</span>
                    </div>
                  </div>
                  <div class="row__calc">
                    <label class="label__calc">Frequency </label>
                    <div class="combined__calc">
                      <select class="input__calc" id="frequency${length}" name="frequency${length}">
                        <option value="per week">per week</option>
                        <option value="per fortnight">per fortnight</option>
                        <option value="per month">per month</option>
                      </select>
                    </div>
                  </div>
                </div>
  `;
  console.log(ele.innerHTML);
  $("#liability__append").append(html);
}
function liabilityTableGen() {
  let html = `
  <table style="border-collapse: collapse; width: 53.8523%; height: 163px" border="1">
  <tbody>
  <tr style="height: 36px">
    <th height: 36px">Lender Name</th>
    <th height: 36px">Loan Type</th>
    <th height: 36px">Balance(approx)</th>
    <th height: 36px">Repayment </th>
    <th height: 36px">Frequency</th>
  </tr>
  `;
  for (let x = 0; x < length; x++) {
    html += ` <tr style="height: 36px">
<td style="text-align:center" height: 36px">${
      document.getElementById(`lenderName${x + 1}`).value
    }</td>
<td style="text-align:center"  height: 36px">${
      document.getElementById(`loanType${x + 1}`).value
    }</td>
<td style="text-align:center"  height: 36px">${
      document.getElementById(`balance${x + 1}`).value
    }</td>
<td style="text-align:center"  height: 36px">${
      document.getElementById(`repayment${x + 1}`).value
    }</td>
<td style="text-align:center"  height: 36px">${
      document.getElementById(`frequency${x + 1}`).value
    }</td>
</tr>`;
  }

  html += `
  </tbody>
</table>`;
  document.getElementById("liability__html").value = html;
}
window.onload = function () {
  document.getElementById("contact__form").addEventListener("submit", function (event) {
    event.preventDefault();
    // generate a five digit number for the contact_number variable
    this.contact_number.value = (Math.random() * 100000) | 0;
    document.getElementById("btn__submit").value = "Please wait...";
    document.getElementById("btn__submit").disabled = true;
    liabilityTableGen();
    // these IDs from the previous steps
    emailjs.sendForm("service_1m6b7ha", "template_y4jjtuh", this).then(
      function () {
        document.getElementById("btn__submit").value = "Thank you!";
        document.getElementById("btn__submit").disabled = true;
        console.log("SUCCESS!");
      },
      function (error) {
        document.getElementById("btn__submit").value = "Try Again";
        document.getElementById("btn__submit").disabled = false;
        console.log("FAILED...", error);
      }
    );
  });
};

(() => {
  hideAll();
  document.getElementById(sections[step]).style.display = "block";
  document.querySelector(".progressed").style.width = width[step] + "%";
})();
