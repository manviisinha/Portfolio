document.addEventListener("DOMContentLoaded", () => {
  // --- GLOBAL ELEMENTS ---
  const menuToggle = document.getElementById("menu-toggle");
  const navItems = document.querySelector(".nav-items");

  if (menuToggle && navItems) {
    menuToggle.addEventListener("click", () => {
      navItems.classList.toggle("active");
    });
  }

  const cursor = document.getElementById("cursor");

  // --- 1. PARALLAX & CURSOR ANIMATION ---
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;

    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to("#p-text", { x: x * 0.5, y: y * 0.5, duration: 0.8 });
    gsap.to("#hero-img", { x: -x * 0.8, duration: 1 });
    gsap.to(".editorial-name", { x: x * 1.2, duration: 1.2 });

    gsap.to(".left-side", { x: x * 0.4, y: y * 0.2, duration: 1.5 });
    gsap.to(".right-side", { x: -x * 0.4, y: -y * 0.2, duration: 1.5 });
  });

  if (window.innerWidth <= 768) {
    gsap.to(".left-side", {
      x: -20,
      yoyo: true,
      repeat: -1,
      duration: 3,
      ease: "sine.inOut",
    });
    gsap.to(".right-side", {
      x: 20,
      yoyo: true,
      repeat: -1,
      duration: 3,
      ease: "sine.inOut",
    });
  }

  function applyCursorHover() {
    const interactiveSelectors =
      ".skill-group, .tag, a, button, input, textarea, .nav-icon-btn, #chat-trigger";
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener("mouseenter", () =>
        gsap.to(cursor, { scale: 3, background: "#d4af37" }),
      );
      el.addEventListener("mouseleave", () =>
        gsap.to(cursor, { scale: 1, background: "rgba(255,255,255,0.8)" }),
      );
    });
  }
  applyCursorHover();

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => navItems.classList.remove("active"));
  });

  // --- 3. CHATBOT LOGIC ---
  const chatTrigger = document.getElementById("chat-trigger");
  const chatWindow = document.getElementById("chat-window");
  const closeChat = document.getElementById("close-chat");
  const chatInput = document.getElementById("chat-input");
  const sendChat = document.getElementById("send-chat");
  const chatBody = document.getElementById("chat-body");

  if (chatTrigger) {
    chatTrigger.addEventListener("click", () => {
      chatWindow.style.display =
        chatWindow.style.display === "flex" ? "none" : "flex";
    });
  }
  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatWindow.style.display = "none";
    });
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "user-msg" : "bot-msg";
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function handleBotResponse(userText) {
    const input = userText.toLowerCase();
    let response =
      "I'm not sure about that, but you can drop a message in the 'Contact Me' section!";
    if (input.includes("old") || input.includes("age"))
      response = "Manvi is 19 years old.";
    else if (
      input.includes("university") ||
      input.includes("college") ||
      input.includes("igdtuw")
    )
      response =
        "Manvi studies at Indira Gandhi Delhi Technical University for Women (IGDTUW).";
    else if (input.includes("branch") || input.includes("major"))
      response = "She is currently pursuing Information Technology (IT).";
    else if (input.includes("email") || input.includes("gmail"))
      response = "You can email Manvi at manvisinhan4500@gmail.com.";
    else if (input.includes("contact") || input.includes("reach"))
      response =
        "You can contact Manvi through the 'Contact Me' section at the bottom of the page.";
    else if (input.includes("hi") || input.includes("hello"))
      response =
        "Hi! I'm Manvi's AI. I can tell you about her university, age, or how to contact her!";
    else if (input.includes("project"))
      response =
        "You can see my work in the Featured Projects section, like IGDTUWhub and Neurora.";
    else if (input.includes("skill") || input.includes("tech"))
      response =
        "I specialize in Full Stack Development (React, Node) and AI/ML (Python, TensorFlow).";

    setTimeout(() => addMessage(response, "bot"), 600);
  }

  if (sendChat) {
    sendChat.addEventListener("click", () => {
      const text = chatInput.value.trim();
      if (!text) return;
      addMessage(text, "user");
      chatInput.value = "";
      handleBotResponse(text);
    });
  }
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendChat.click();
    });
  }

  // --- 4. GSAP SCROLL ---
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".block").forEach((b) => {
    gsap.to(b, {
      scrollTrigger: { trigger: b, start: "top 85%" },
      opacity: 1,
      y: 0,
      duration: 1.2,
    });
  });

  document.querySelectorAll(".skill-group").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
      const rotateX = (y / rect.height - 0.5) * -6;
      const rotateY = (x / rect.width - 0.5) * 6;
      gsap.to(card, {
        rotateX,
        rotateY,
        z: 30,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, z: 0, duration: 0.6 });
    });
  });

  // --- 5. HORIZONTAL PROJECT SCROLL ---
  const projectsScroll = document.querySelector(".projects-scroll");
  if (projectsScroll) {
    projectsScroll.addEventListener(
      "wheel",
      (e) => {
        const delta = e.deltaY;
        const atStart = projectsScroll.scrollLeft <= 0;
        const atEnd =
          Math.ceil(projectsScroll.scrollLeft + projectsScroll.clientWidth) >=
          projectsScroll.scrollWidth;
        if ((delta > 0 && !atEnd) || (delta < 0 && !atStart)) {
          e.preventDefault();
          projectsScroll.scrollLeft += delta;
        }
      },
      { passive: false },
    );
  }

  // --- 5.5 EMAIL ---
  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.addEventListener("click", function (e) {
      setTimeout(() => {
        window.open(
          "https://mail.google.com/mail/?view=cm&fs=1&to=manvisinhan4500@gmail.com",
          "_blank",
        );
      }, 1000);
    });
  }

  // --- 6. FORM LOGIC ---
  const contactForm = document.getElementById("portfolio-contact-form");
  const statusMsg = document.getElementById("form-status");
  const btn = document.getElementById("submit-button");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      btn.disabled = true;
      btn.innerText = "Sending...";
      statusMsg.style.opacity = "1";
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      // Use the direct URL for local testing, and the secure /api endpoint for production.
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.protocol === "file:";

      const endpoint = isLocal
        ? "" // Add your local Formspree URL here for testing
        : "/api/contact";

      fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            statusMsg.style.color = "#d4af37";
            statusMsg.innerText = "✓ Message sent successfully!";
            contactForm.reset();
          } else {
            statusMsg.style.color = "#ff4d4d";
            statusMsg.innerText = "Oops! Problem submitting form.";
          }
          btn.disabled = false;
          btn.innerText = "Send Message";
        })
        .catch(() => {
          statusMsg.style.color = "#ff4d4d";
          statusMsg.innerText = "Oops! Connection error.";
          btn.disabled = false;
          btn.innerText = "Send Message";
        });
    });
  }
});
