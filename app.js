const socket = new WebSocket("ws://localhost:8080/ws");

socket.onopen = () => {
    console.log("✅ Connected to WebSocket server");
};

socket.onmessage = (event) => {
    console.log("📢 Notification received:", event.data);
    showNotification(event.data);
};

socket.onclose = () => {
    console.log("❌ Disconnected from WebSocket server");
};

// Fungsi untuk menampilkan notifikasi sebagai card
function showNotification(message) {
    const notificationsContainer = document.getElementById("notifications");

    // Hapus teks default jika ada
    const defaultText = notificationsContainer.querySelector("p");
    if (defaultText) defaultText.remove();

    // Buat elemen notifikasi (card)
    const notificationCard = document.createElement("div");
    notificationCard.className = "flex items-center p-4 bg-white shadow-md rounded-lg border-l-4 border-blue-500";
    notificationCard.innerHTML = `
        <div class="mr-3">
            <span class="inline-block bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">🔔</span>
        </div>
        <div class="flex-1">
            <p class="text-gray-800 font-semibold">${message}</p>
            <p class="text-gray-500 text-xs">${new Date().toLocaleTimeString()}</p>
        </div>
        <button onclick="this.parentElement.remove()" class="ml-4 text-gray-400 hover:text-red-500">✖</button>
    `;

    // Tambahkan ke container
    notificationsContainer.prepend(notificationCard);

    // Kirim notifikasi browser jika diizinkan
    if (Notification.permission === "granted") {
        new Notification("📢 New Notification", { body: message });
    }

    // Hapus otomatis setelah 5 detik
    setTimeout(() => {
        notificationCard.remove();
    }, 5000);
}
