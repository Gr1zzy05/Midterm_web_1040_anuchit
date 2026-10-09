// ========================================================
// Assignment 5: JavaScript Post and Reply
// ========================================================

window.onload = setupFunction;

function setupFunction() {

    // กำหนดชื่อหัวข้อของหน้าเว็บ
    document.getElementById("top").innerHTML = "Blooger";

    // กำหนดการทำงานให้ปุ่ม Post และ Clear
    document.getElementsByTagName("button")[0].onclick = postFunction;
    document.getElementsByTagName("button")[1].onclick = clearFunction;
}

// ตัวแปรนับลำดับการโพสต์
var postCount = 0;


function postFunction() {

    // 1. อ่านค่าข้อความจาก textarea
    var message = document.getElementById("message").value;

    // 2. นำข้อความไปใส่ในแต่ละกล่องตามลำดับ
    if (postCount == 0) {
        document.getElementById("topic").innerHTML = message;
    }
    else if (postCount == 1) {
        document.getElementById("reply1").innerHTML = message;
    }
    else if (postCount == 2) {
        document.getElementById("reply2").innerHTML = message;
    }

    // 3. เคลียร์ข้อความใน textarea
    document.getElementById("message").value = "";

    // 4. เพิ่มค่า postCount
    postCount++;
}


function clearFunction() {

    // 1. ล้างข้อความใน topic, reply1, reply2
    document.getElementById("topic").innerHTML = "";
    document.getElementById("reply1").innerHTML = "";
    document.getElementById("reply2").innerHTML = "";

    // 2. ล้างข้อความใน textarea
    document.getElementById("message").value = "";

    // 3. รีเซ็ต postCount
    postCount = 0;
}