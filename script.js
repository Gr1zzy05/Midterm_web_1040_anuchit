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

// ================= PROJECT MODAL CONTROLLER =================
const modal = document.getElementById("projectModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalImg = document.getElementById("modalImg");
const modalBadge = document.getElementById("modalBadge");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalExternalLink = document.getElementById("modalExternalLink");

// ฟังก์ชันเปิด Modal
function openProjectModal(card) {
  const title = card.dataset.title || card.querySelector("h3")?.textContent || "";
  const badge = card.dataset.badge || card.querySelector(".project-badge")?.textContent || "";
  const desc = card.dataset.desc || card.querySelector("p")?.textContent || "";
  const img = card.dataset.img || "";
  const link = card.dataset.link || "#";
  const tags = (card.dataset.tags || "").split(",").map(t => t.trim()).filter(Boolean);

  // นำข้อมูลไปใส่ใน Modal อย่างปลอดภัย
  modalTitle.textContent = title;
  modalBadge.textContent = badge;
  modalDesc.textContent = desc;

  // จัดการรูปภาพ (ถ้าไม่มีรูปให้ซ่อน)
  if (img) {
    modalImg.src = img;
    modalImg.style.display = "block";
  } else {
    modalImg.style.display = "none";
  }

  // จัดการปุ่มลิงก์
  if (link && link !== "#") {
    modalExternalLink.href = link;
    modalExternalLink.style.display = "inline-block";
  } else {
    modalExternalLink.style.display = "none";
  }

  // ล้างแท็กเก่าและสร้างแท็กใหม่ด้วย DOM Node
  while (modalTags.firstChild) {
    modalTags.removeChild(modalTags.firstChild);
  }
  tags.forEach((tagText) => {
    const span = document.createElement("span");
    span.textContent = tagText;
    modalTags.appendChild(span);
  });

  // แสดง Modal และล็อกไม่ให้หน้าเว็บด้านหลังเลื่อน
  modal.classList.remove("is-hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// ฟังก์ชันปิด Modal
function closeProjectModal() {
  modal.classList.add("is-hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ผูก Event ให้กับการ์ดทุกใบที่มีคลาส modal-trigger
document.querySelectorAll(".modal-trigger").forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card));
});

// ปิดเมื่อกดปุ่ม X
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeProjectModal);
}

// ปิดเมื่อคลิกพื้นที่ว่างนอกหน้าต่างกล่อง Modal
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });
}

// ปิดเมื่อกดปุ่ม Escape บนคีย์บอร์ด
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("is-hidden")) {
    closeProjectModal();
  }
});