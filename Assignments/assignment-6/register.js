window.onload = pageLoad;

function pageLoad() {
    const form = document.forms["myRegister"];
    if (form) {
        form.onsubmit = validateForm;
    }
}

function validateForm(event) {
    event.preventDefault();

    const errorMsg = document.getElementById("errormsg");
    const username = document.forms["myRegister"]["username"].value.trim();
    const passwords = document.forms["myRegister"]["password"];
    
    const password = (passwords.length ? passwords[0].value : passwords.value).trim();
    const retypePassword = passwords.length > 1 ? passwords[1].value.trim() : "";

    if (!username || !password) {
        const message = "กรุณากรอก Username และ Password ให้ครบถ้วน";
        if (errorMsg) errorMsg.innerHTML = message;
        alert(message);
        return false;
    }
    if (password !== retypePassword) {
        const message = "Password และ Retype Password ไม่ตรงกัน";
        if (errorMsg) errorMsg.innerHTML = message;
        alert(message);
        return false;
    }
    if (errorMsg) errorMsg.innerHTML = "";

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("ลงทะเบียนสำเร็จ! กำลังไปที่หน้า Login");
    window.location.href = "login.html";
    return true;
}
