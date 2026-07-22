/* ========================================
   JIUSMAN INTEGRATED TECHNOLOGY
   COMPLETE WEBSITE JAVASCRIPT
======================================== */


/* ---------- Mobile navigation menu ---------- */

const menuButton = document.getElementById("menu-button");
const navigationLinks = document.getElementById("navigation-links");

if (menuButton && navigationLinks) {
  menuButton.addEventListener("click", function () {
    const menuIsOpen = navigationLinks.classList.toggle("active");

    menuButton.classList.toggle("active");
    menuButton.setAttribute("aria-expanded", menuIsOpen);
  });


  /* Close the mobile menu after clicking a navigation link */

  const menuLinks = navigationLinks.querySelectorAll("a");

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navigationLinks.classList.remove("active");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });


  /* Close the mobile menu when clicking outside it */

  document.addEventListener("click", function (event) {
    const clickedInsideMenu = navigationLinks.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      navigationLinks.classList.remove("active");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });


  /* Close the menu when the Escape key is pressed */

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      navigationLinks.classList.remove("active");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}


/* ---------- Automatically display the current year ---------- */

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* ---------- Contact form email submission ---------- */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formStatus.textContent = "Please wait while your message is being sent.";
    formStatus.className = "form-status";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formStatus.textContent =
          "Your message has been sent successfully. We will contact you soon.";

        formStatus.className = "form-status success";

        contactForm.reset();
      } else {
        const responseData = await response.json();

        if (responseData.errors) {
          const errorMessages = responseData.errors
            .map(function (error) {
              return error.message;
            })
            .join(", ");

          formStatus.textContent = errorMessages;
        } else {
          formStatus.textContent =
            "Your message could not be sent. Please try again.";
        }

        formStatus.className = "form-status error";
      }
    } catch (error) {
      formStatus.textContent =
        "A connection problem occurred. Check your internet and try again.";

      formStatus.className = "form-status error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}