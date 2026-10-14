"use strict";

// import axios from "axios";

const menuBtn = document.getElementById("menu-btn");
const burgerIcon = document.getElementById("burger-icon");
const closeIcon = document.getElementById("close-icon");
const mobileNav = document.getElementById("mobile-nav");
const headerEl = document.querySelector("header");
const links = document.querySelectorAll("a");
const headerHeight = headerEl.offsetHeight;

links.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    if (href === "#") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (
      href !== "#" &&
      href.startsWith("../NFT-Marketplace-main/index.html#")
    ) {
      // e.preventDefault();
      const section = document.querySelector(href);
      const offsetTop = section.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

menuBtn.addEventListener("click", () => {
  burgerIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
  mobileNav.classList.toggle("opacity-0");
  mobileNav.classList.toggle("-translate-y-10");
  mobileNav.classList.toggle("pointer-events-none");
  document.body.classList.toggle("overflow-hidden");
});

const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = signupForm.querySelector('input[name="username"]').value;
  const email = signupForm.querySelector('input[name="email"]').value;
  const password = signupForm.querySelector('input[name="password"]').value;
  const confirmPassword = signupForm.querySelector(
    'input[name="confirmPassword"]',
  ).value;

  if (password !== confirmPassword) {
    alert("Confirm Password does not match Password!");
    return;
  }

  try {
    await axios.post("http://localhost:3001/users", {
      username,
      email,
      password,
    });
    signupForm.reset();
  } catch (error) {
    console.error("Error:", error);
  }
});

const emailForm = document.querySelector(".email-form");

emailForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = emailForm.querySelector('input[type="email"]').value;

  try {
    await axios.post("http://localhost:3001/emails", { email });
    form.reset();
  } catch (error) {
    console.error("Error:", error);
  }
});

// form validation

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

// Updating Validation Status
function updateValidationState(element, isValid) {
  if (isValid) {
    element.css({
      "border-color": "#a546ff",
      "box-shadow": "0 0 5px 3px rgba(164, 53, 250, 0.66)",
    });
  } else {
    element.css({
      "border-color": "#31063d",
      "box-shadow": "0 0 5px 2px rgba(55, 2, 58, 0.69)",
    });
  }
}

// Validate both email forms separately
$(".email-form").each(function () {
  const form = $(this);
  const emailInput = form.find('input[type="email"]');
  const feedback = form.find(".email-feedback");

  emailInput.on("blur", function () {
    const email = $(this).val();
    const isValid = isValidEmail(email);

    updateValidationState($(this), isValid);

    if (!isValid) {
      feedback.text("Please enter a valid email.");
    } else {
      feedback.text("");
    }
  });

  emailInput.on("input", function () {
    feedback.text("");
  });

  form.on("submit", async function (event) {
    event.preventDefault();

    const email = emailInput.val();
    const isValid = isValidEmail(email);

    updateValidationState(emailInput, isValid);

    if (!isValid) {
      feedback.text("Please enter a valid email.");
      return;
    }

    feedback.text("");

    try {
      await axios.post("http://localhost:3001/emails", {
        email: email,
      });

      form[0].reset();
      updateValidationState(emailInput, true);
      feedback.text("");
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

function isValidUsername(username) {
  return username.trim().length >= 3;
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

function isValidPassword(password) {
  const hasEnoughLength = password.length >= 6;
  const hasNumber = /[0-9]/.test(password);

  return hasEnoughLength && hasNumber;
}

function updateValidationState(element, isValid) {
  if (isValid) {
    element.css({
      "border-color": "#a546ff",
      "box-shadow": "0 0 5px 3px rgba(164, 53, 250, 0.66)",
    });
  } else {
    element.css({
      "border-color": "#31063d",
      "box-shadow": "0 0 5px 3px rgba(55, 2, 58, 0.69)",
    });
  }
}

$(".signup-form").each(function () {
  const form = $(this);

  const usernameInput = form.find("#username");
  const emailInput = form.find("#email");
  const passwordInput = form.find("#password");
  const confirmPasswordInput = form.find("#confirmPassword");

  function showFeedback(input, message, isValid) {
    input.closest(".group").find(".validation-feedback").text(message);
    updateValidationState(input, isValid);
  }

  function validateUsername() {
    const username = usernameInput.val();
    const isValid = isValidUsername(username);

    showFeedback(
      usernameInput,
      isValid ? "" : "Username must be at least 3 characters long.",
      isValid,
    );

    return isValid;
  }

  function validateEmail() {
    const email = emailInput.val();
    const isValid = isValidEmail(email);

    showFeedback(
      emailInput,
      isValid ? "" : "Please enter a valid email address.",
      isValid,
    );

    return isValid;
  }

  function validatePassword() {
    const password = passwordInput.val();
    const isValid = isValidPassword(password);

    showFeedback(
      passwordInput,
      isValid
        ? ""
        : "Password must be at least 6 characters long and include at least one number.",
      isValid,
    );

    return isValid;
  }

  function validateConfirmPassword() {
    const password = passwordInput.val();
    const confirmPassword = confirmPasswordInput.val();

    const isValid = confirmPassword.length > 0 && confirmPassword === password;

    showFeedback(
      confirmPasswordInput,
      isValid ? "" : "Passwords do not match.",
      isValid,
    );

    return isValid;
  }

  usernameInput.on("blur", validateUsername);
  emailInput.on("blur", validateEmail);
  passwordInput.on("blur", validatePassword);
  confirmPasswordInput.on("blur", validateConfirmPassword);

  usernameInput.on("input", function () {
    usernameInput.closest(".group").find(".validation-feedback").text("");
  });

  emailInput.on("input", function () {
    emailInput.closest(".group").find(".validation-feedback").text("");
  });

  passwordInput.on("input", function () {
    passwordInput.closest(".group").find(".validation-feedback").text("");

    if (confirmPasswordInput.val().length > 0) {
      validateConfirmPassword();
    }
  });

  confirmPasswordInput.on("input", function () {
    confirmPasswordInput
      .closest(".group")
      .find(".validation-feedback")
      .text("");
  });

  form.on("submit", function (event) {
    const usernameValid = validateUsername();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const confirmPasswordValid = validateConfirmPassword();

    if (
      !usernameValid ||
      !emailValid ||
      !passwordValid ||
      !confirmPasswordValid
    ) {
      event.preventDefault();
    }
  });
});
