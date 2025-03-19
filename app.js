let socket;

function connectWebSocket() {
    const userID = document.getElementById("userID").value.trim();
    if (!userID) {
        alert("Please enter a valid User ID!");
        return;
    }

    // Buat koneksi WebSocket dengan user_id sebagai query parameter
    socket = new WebSocket(`ws://localhost:8080/ws?user_id=${userID}`);

    socket.onopen = () => {
        console.log(`✅ Connected as User ID: ${userID}`);
    };

    socket.onmessage = (event) => {
        console.log("📩 Message received:", event.data);
        showNotification(event.data);
    };

    socket.onclose = () => {
        console.log("❌ Disconnected");
    };
}

function showNotification(message) {
    const notificationsContainer = document.getElementById("notifications");

    // Hapus teks default jika ada
    const defaultText = notificationsContainer.querySelector("p");
    if (defaultText) defaultText.remove();

    // Buat elemen notifikasi
    const notificationCard = document.createElement("div");
    notificationCard.className = "p-3 bg-blue-100 text-blue-800 rounded-lg shadow";
    notificationCard.innerText = message;

    notificationsContainer.prepend(notificationCard);

    // Hapus otomatis setelah 5 detik
    setTimeout(() => {
        notificationCard.remove();
    }, 5000);
}
