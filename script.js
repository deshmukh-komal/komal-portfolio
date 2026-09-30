const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const contactLinks = document.querySelector("#contact-links");
const contactPrompt = document.querySelector("#contact-prompt");

// Add verified contact URLs here when they are available.
const profiles = {
  email: "",
  linkedin: "",
  github: ""
};

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  }
});

const profileLinks = [
  ["email", "Email", (value) => `mailto:${value}`],
  ["linkedin", "LinkedIn", (value) => value],
  ["github", "GitHub", (value) => value]
];

for (const [key, label, makeHref] of profileLinks) {
  const value = profiles[key].trim();
  if (!value) continue;

  const link = document.createElement("a");
  link.className = "contact-link";
  link.href = makeHref(value);
  link.textContent = label;
  if (key !== "email") {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  contactLinks.append(link);
}

if (contactLinks.childElementCount) contactPrompt.remove();
document.querySelector("#year").textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}