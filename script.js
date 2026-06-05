const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".nav-list a")];
const revealItems = [...document.querySelectorAll(".reveal")];
let revealObserver;

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  });
});

if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const revealItemsInView = () => {
  revealItems.forEach((item) => {
    if (item.classList.contains("visible")) return;

    const rect = item.getBoundingClientRect();
    const isNearViewport = rect.top < window.innerHeight * 1.08 && rect.bottom > -80;

    if (isNearViewport) {
      item.classList.add("visible");
      revealObserver?.unobserve(item);
    }
  });
};

requestAnimationFrame(() => {
  window.setTimeout(revealItemsInView, 80);
});

const sections = [...document.querySelectorAll("main section[id], header[id]")];

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -48% 0px", threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const perspectiveText = {
  workers:
    "Workers often saw the strike as a fight for fair wages, shorter hours, and collective bargaining after wartime sacrifice.",
  leaders:
    "Many business and government leaders saw the strike as a threat to order, property, and authority during a tense postwar moment.",
  public:
    "The wider public was divided: some depended on halted services, while others sympathized with families facing inflation and insecurity."
};

const perspectiveOutput = document.querySelector(".perspective-output");
document.querySelectorAll(".perspective-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".perspective-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    perspectiveOutput.textContent = perspectiveText[button.dataset.perspective];
  });
});

const changeText = {
  before: "Rights existed in statutes and traditions, but protections were less constitutionally powerful.",
  after:
    "Rights became part of the Constitution, giving courts stronger authority to review government laws and actions."
};

const changeOutput = document.querySelector(".change-output");
document.querySelectorAll(".change-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".change-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    changeOutput.textContent = changeText[button.dataset.era];
  });
});

const causeButton = document.querySelector(".cause-button");
const causePanel = document.querySelector("#cause-panel");

if (causeButton && causePanel) {
  causeButton.addEventListener("click", () => {
    const isExpanded = causeButton.getAttribute("aria-expanded") === "true";
    causeButton.setAttribute("aria-expanded", String(!isExpanded));
    causePanel.hidden = isExpanded;
    causeButton.textContent = isExpanded ? "Show causes and consequences" : "Hide causes and consequences";
  });
}
