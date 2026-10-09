window.onload = loginLoad;

function loginLoad() {
    const form = document.forms["myLogin"];
    if (form) {
        form.onsubmit = checkLogin;
    }
}

function checkLogin(event) {
    if (event) {
        event.preventDefault();
    }

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    const users = [{ username: "admin", password: "123456" }];

    if (storedUsername && storedPassword) {
        users.push({ username: storedUsername, password: storedPassword });
    }

    const inputUsername = document.forms[0]["username"].value.trim();
    const inputPassword = document.forms[0]["password"].value.trim();

    if (!inputUsername || !inputPassword) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return false;
    }

    let isLoginSuccess = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === inputUsername && users[i].password === inputPassword) {
            isLoginSuccess = true;
            break;
        }
    }

    if (isLoginSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ");
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง");
        return false;
    }
}
