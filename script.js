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

  // ส่วน Project Filtering ใน script.js
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1. อัปเดตสถานะปุ่ม Active
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const selectedFilter = btn.dataset.filter;

    // 2. ตรวจสอบการ์ด
    projectCards.forEach((card) => {
      // ดึงหมวดหมู่ทั้งหมดของการ์ดออกมาเป็น Array (แยกด้วยเว้นวรรค)
      const categories = (card.dataset.category || "").toLowerCase().split(/\s+/);

      if (selectedFilter === "all" || categories.includes(selectedFilter.toLowerCase())) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
  });
});

const musicBtn = document.getElementById("musicToggleBtn");
const bgm = document.getElementById("bgmAudio");
let isPlaying = false;

// ลดความดังลงเหลือ 30% เพื่อไม่ให้เสียงดังกระแทกหูผู้ใช้
bgm.volume = 0.3; 

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    bgm.pause();
    musicBtn.textContent = "🎵 Play Music";
  } else {
    bgm.play();
    musicBtn.textContent = "⏸️ Pause Music";
  }
  isPlaying = !isPlaying;
});

});