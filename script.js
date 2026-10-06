// Product names and prices are kept together so totals are easy to update.
var products = [
  { name: "Paracetamol", price: 50, quantity: 0 },
  { name: "Vitamin Tablets", price: 100, quantity: 0 },
  { name: "Cough Syrup", price: 80, quantity: 0 },
  { name: "Pain Relief Balm", price: 70, quantity: 0 }
];

var selectedAgeGroup = "";

// Update the number of items and the order price.
function updateOrderSummary() {
  var totalItems = 0;
  var totalAmount = 0;
  var index;

  for (index = 0; index < products.length; index++) {
    totalItems = totalItems + products[index].quantity;
    totalAmount = totalAmount + products[index].quantity * products[index].price;
  }

  document.getElementById("totalItems").textContent = totalItems;
  document.getElementById("totalAmount").textContent = "₹" + totalAmount;
}

// Clicking an age card selects it and enables the continue link.
var ageCards = document.getElementsByClassName("age-card");
var ageIndex;

for (ageIndex = 0; ageIndex < ageCards.length; ageIndex++) {
  ageCards[ageIndex].addEventListener("click", function () {
    var cardIndex;

    for (cardIndex = 0; cardIndex < ageCards.length; cardIndex++) {
      ageCards[cardIndex].classList.remove("selected");
    }

    this.classList.add("selected");
    selectedAgeGroup = this.getAttribute("data-age");

    var ageMessage = document.getElementById("ageMessage");
    ageMessage.textContent = "Selected Age Group: " + selectedAgeGroup;
    ageMessage.classList.add("has-selection");

    var continueButton = document.getElementById("continueButton");
    continueButton.classList.remove("is-disabled");
    continueButton.setAttribute("aria-disabled", "false");
  });
}

// Plus and minus buttons change quantities without allowing negative values.
var quantityButtons = document.getElementsByClassName("quantity-button");
var buttonIndex;

for (buttonIndex = 0; buttonIndex < quantityButtons.length; buttonIndex++) {
  quantityButtons[buttonIndex].addEventListener("click", function () {
    var productIndex = Number(this.getAttribute("data-product"));
    var change = Number(this.getAttribute("data-change"));

    products[productIndex].quantity = products[productIndex].quantity + change;

    if (products[productIndex].quantity < 0) {
      products[productIndex].quantity = 0;
    }

    document.getElementById("quantity-" + productIndex).textContent = products[productIndex].quantity;
    updateOrderSummary();
  });
}

// Show the payment section and move the page to it.
document.getElementById("proceedButton").addEventListener("click", function () {
  var paymentSection = document.getElementById("payment");
  paymentSection.classList.remove("is-hidden");
  paymentSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

// This is only a payment demo; it does not contact a payment service.
document.getElementById("payNowButton").addEventListener("click", function () {
  alert("Payment successful! Your order has been placed.");
  document.getElementById("paymentSuccess").classList.remove("is-hidden");
  document.getElementById("payNowButton").classList.add("is-hidden");
});

// Open and close the sign-in modal.
var signInModal = document.getElementById("signInModal");
var openSignInButton = document.getElementById("openSignInButton");
var closeSignInButton = document.getElementById("closeSignInButton");

openSignInButton.addEventListener("click", function () {
  signInModal.classList.remove("is-hidden");
  document.getElementById("email").focus();
});

closeSignInButton.addEventListener("click", function () {
  signInModal.classList.add("is-hidden");
});

signInModal.addEventListener("click", function (event) {
  if (event.target === signInModal) {
    signInModal.classList.add("is-hidden");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    signInModal.classList.add("is-hidden");
  }
});

// Check the two required fields and display a frontend-only result.
document.getElementById("signInForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var signInMessage = document.getElementById("signInMessage");

  if (email === "" || password === "") {
    signInMessage.textContent = "Please enter email and password.";
    signInMessage.classList.add("error");
  } else {
    signInMessage.textContent = "Login successful!";
    signInMessage.classList.remove("error");
  }
});
