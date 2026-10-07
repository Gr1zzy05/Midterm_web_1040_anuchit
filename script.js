document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle (Dark/Light Mode)
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const storedTheme = localStorage.getItem("theme");

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  if (storedTheme) {
    applyTheme(storedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });

  // 2. Project Filtering (ใช้วิธี toggle class แทนการ inject HTML ใหม่)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // อัปเดตสถานะปุ่ม Active
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.dataset.filter;

      // จัดการแสดงผลการ์ด
      projectCards.forEach((card) => {
        const category = card.dataset.category;
        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  // 3. Contact Form Submission (ปลอดภัย ไม่ใช้ innerHTML)
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();

    formStatus.className = "form-status"; // reset status classes

    if (!name || !email || !message) {
      formStatus.classList.add("error");
      formStatus.textContent = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
      return;
    }

    // ตัวอย่างจำลองการส่งข้อมูล
    formStatus.classList.add("success");
    formStatus.textContent = "ส่งข้อความสำเร็จแล้ว ทางเราจะติดต่อกลับโดยเร็ว!";
    contactForm.reset();

    // ล้างสถานะแจ้งเตือนหลังผ่านไป 5 วินาที
    setTimeout(() => {
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }, 5000);
  });
});