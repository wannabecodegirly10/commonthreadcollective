(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const contactEmail = "commonthreadbr@gmail.com";
  const inquiryForm = document.querySelector("#inquiry-form");
  const formStatus = document.querySelector("#form-status");

  if (!inquiryForm) return;

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(inquiryForm);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const phone = data.get("phone") || "";
    const date = data.get("date") || "";
    const eventType = data.get("eventType") || "";
    const experience = data.get("experience") || "";
    const venue = data.get("venue") || "";
    const message = data.get("message") || "";

    const subject = encodeURIComponent(
      "Common Thread Collective Inquiry: " + (eventType || "New Event") + (date ? " | " + date : "")
    );
    const body = encodeURIComponent(
      "Name: " +
        name +
        "\nEmail: " +
        email +
        "\nPhone: " +
        phone +
        "\nEvent date: " +
        date +
        "\nEvent type: " +
        eventType +
        "\nExperience: " +
        experience +
        "\nVenue / Location: " +
        venue +
        "\nEvent details: " +
        message
    );

    window.open("mailto:" + contactEmail + "?subject=" + subject + "&body=" + body, "_blank");
    if (formStatus) {
      formStatus.textContent = "Your email app should open with your inquiry details.";
    }
  });
})();
