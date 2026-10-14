"use strict";

// import axios from "axios";
// import $ from "jquery";

const menuBtn = document.getElementById("menu-btn");
const burgerIcon = document.getElementById("burger-icon");
const closeIcon = document.getElementById("close-icon");
const mobileNav = document.getElementById("mobile-nav");
// const navbarEl = document.querySelector("nav");
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

    if (href !== "#" && href.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(href);
      const offsetTop = section.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// burger menu
menuBtn.addEventListener("click", () => {
  burgerIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
  mobileNav.classList.toggle("opacity-0");
  mobileNav.classList.toggle("-translate-y-10");
  mobileNav.classList.toggle("pointer-events-none");
  document.body.classList.toggle("overflow-hidden");
});

const mobileLinks = mobileNav.querySelectorAll("a");
mobileLinks.forEach(function (link) {
  link.addEventListener("click", () => {
    burgerIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
    mobileNav.classList.toggle("opacity-0");
    mobileNav.classList.toggle("-translate-y-10");
    mobileNav.classList.toggle("pointer-events-none");
    document.body.classList.toggle("overflow-hidden");
  });
});

const getCreatorById = function (creators, id) {
  return creators.find((creator) => creator.id === id);
};

const renderCollection = function (collection, creator) {
  const container = document.querySelector(".collection-container");
  container.innerHTML += `<div class="Card grid grid-cols-3 gap-4">
            <a class="hoverCls col-span-3 rounded-3xl" href="#">
              <img
                class="rounded-3xl"
                src="${collection.images[0]}"
                alt="${collection.name}"
              />
            </a>

            <a class="hoverCls rounded-3xl" href="#">
              <img
                class="rounded-3xl"
                src="${collection.images[1]}"
                alt="${collection.name}"
              />
            </a>

            <a class="hoverCls rounded-3xl" href="#">
              <img
                class="rounded-3xl"
                src="${collection.images[2]}"
                alt="${collection.name}"
              />
            </a>

            <a
              class="bg-purple hoverCls font-Space-Mono grid cursor-pointer content-center justify-center rounded-3xl font-bold md:text-2xl"
              href="#"
              aria-label="Other Ilustrations"
            >
              ${collection.total_items}+
            </a>

            <div
              class="col-span-3 grid grid-cols-[min-content_max-content] items-center gap-2"
            >
              <h5
                class="extra-tiny:text-xl tiny:text-2xl col-span-2 font-semibold"
              >
                ${collection.name}
              </h5>
              <button
                class="w-6 cursor-pointer rounded-full hover:shadow-[0_0_1px_1px_rgb(182,132,247)]"
                aria-label="designer profile"
                type="button"
              >
                <img
                  class="w-6 rounded-full"
                  src="${creator.image}"
                  alt="${creator.name}"
                />
              </button>
              <a class="hover:text-purple focus:text-purple username" href="#"
                >${creator.name}</a
              >
            </div>
          </div>`;
};

const renderCreator = function (creator) {
  const container = document.querySelector(".creators-container");
  container.innerHTML += `<a
            href="#"
            class="Card hoverCls relative bg-secondary mid-xl:justify-items-center mid-xl:aspect-square grid cursor-pointer items-center justify-start mid-xl:justify-center gap-x-5 gap-y-1.25 rounded-3xl p-5"
          >

              <img
                class="rounded-full mid-xl:w-30 row-span-2 w-15"
                src="${creator.image}"
                alt="${creator.name}"
              />
              <span
                class="bg-primary text-gray font-Space-Mono absolute mid-xl:top-4.5 mid-xl:left-5 top-3.5 left-3 rounded-full w-7.5 aspect-square grid justify-center items-center hover:bg-purple-400 hover:text-white"
                >${creator.id}</span
              >

            <h5 class="text-2xl font-semibold">${creator.name}</h5>
            <div
              class="mid-xl:col-start-1 mid-xl:col-end-2 col-start-2 col-end-3 flex gap-1.5"
            >
              <span class="text-gray">Total Sales: </span>
              <span>${creator.total_sales} ${creator.currency}</span>
            </div></a
          >`;
};

const renderCategory = function (category) {
  const container = document.querySelector(".categories-container");
  container.innerHTML += `<a
            class="bg-secondary hoverCls group grid cursor-pointer rounded-3xl"
            href="#"
          >
            <div class="relative overflow-hidden rounded-t-3xl">
              <img
                class="w-full overflow-hidden rounded-t-3xl group-hover:blur-xs"
                src="${category.image}"
                alt="${category.name}"
              />
              <img
                class="absolute top-1/2 left-1/2 hidden aspect-square w-20 -translate-x-1/2 -translate-y-1/2 group-hover:block xl:w-25"
                src="${category.icon}"
                alt="${category.name}"
              />
            </div>
            <span class="p-5 pb-6 font-semibold xl:px-7.5">${category.name}</span>
          </a>`;
};
const renderNFT = function (nft, creator) {
  const container = document.querySelector(".nfts-container");
  container.innerHTML += `<a
            class="bg-secondary hoverCls grid cursor-pointer rounded-3xl"
            href="#"
          >
            <img
              class="rounded-t-3xl"
              src="${nft.image}"
              alt="${nft.name}"
            />
            <div class="grid gap-6.25 p-5 pb-6.25 sm:px-7.5">
              <div
                class="grid grid-cols-[min-content_1fr] items-center gap-y-2 gap-x-3"
              >
                <span class="col-span-2 text-2xl font-semibold"
                  >${nft.name}</span
                >
                <button
                  class="aspect-square w-8 cursor-pointer rounded-full"
                  type="button"
                >
                  <img
                    class="w-full rounded-full"
                    src="${creator.image}"
                    alt="${creator.name}"
                  />
                </button>

                <span>${creator.name}</span>
              </div>

              <div class="grid grid-cols-2 gap-y-2">
                <span class="text-gray font-Space-Mono text-xs">Price</span>

                <span class="text-gray font-Space-Mono justify-self-end text-xs"
                  >Highest Bid</span
                >
                <span class="font-Space-Mono text-xs sm:text-base"
                  >${nft.price.amount} ${nft.price.currency}</span
                >
                <span
                  class="font-Space-Mono justify-self-end text-xs sm:text-base"
                  >${nft.highest_bid.amount} ${nft.highest_bid.currency}</span
                >
              </div>
            </div>
          `;
};

const renderAllCollections = function (collections, creators) {
  collections.forEach((collection) => {
    const creator = getCreatorById(creators, collection.creator_id);
    renderCollection(collection, creator);
  });
};

const renderAllCreators = function (creators) {
  creators.forEach((creator) => {
    renderCreator(creator);
  });
};

const renderAllCategories = function (categories) {
  categories.forEach((category) => {
    renderCategory(category);
  });
};

const renderAllNFTs = function (nfts, creators) {
  nfts.forEach((nft) => {
    const creator = getCreatorById(creators, nft.creator_id);
    renderNFT(nft, creator);
  });
};

const fetchData = async function () {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/mmhz23/mft-final/refs/heads/main/public/assets/data/data.json",
    );

    const collections = response.data.collections;
    const creators = response.data.creators;
    const categories = response.data.categories;
    const nfts = response.data.nfts;

    renderAllCollections(collections, creators);
    renderAllCreators(creators);
    renderAllCategories(categories);
    renderAllNFTs(nfts, creators);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
fetchData();

// storing new emails

const emailForms = document.querySelectorAll(".email-form");

emailForms.forEach((form) => {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value;

    try {
      await axios.post("http://localhost:3001/emails", { email });
      form.reset();
    } catch (error) {
      console.error("Error:", error);
    }
  });
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
      "box-shadow": "0 0 5px 2px rgba(55, 2, 58, 0.6)",
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

// countdown
let remainingTime = 10 * 600;

const countdown = document.querySelector(".countdown");
const hoursElement = countdown.querySelector(".hours");
const minutesElement = countdown.querySelector(".minutes");
const secondsElement = countdown.querySelector(".seconds");

function updateCountdown() {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    countdown.querySelector("span").textContent = "Auction ended!";
    return;
  }

  remainingTime--;
}

updateCountdown();

const timerInterval = setInterval(updateCountdown, 1000);

// ScrollToTop
const scrollToTopBtn = document.querySelector(".ScrollToTop");

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
