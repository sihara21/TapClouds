// =============================
// TAP TO FARM + CLAIM SYSTEM
// =============================
let count = 0;
const button = document.getElementById("tapButton");
const counter = document.getElementById("counter");
const claimButton = document.getElementById("claimButton");

const claimCooldown = 24 * 60 * 60 * 1000; // 24 jam
let lastClaim = parseInt(localStorage.getItem('lastClaim')) || 0;

function updateClaimButton() {
  const now = Date.now();
  const timeRemaining = claimCooldown - (now - lastClaim);

  if (timeRemaining > 0) {
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    claimButton.textContent = `Claim available in ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    claimButton.disabled = true;
  } else {
    claimButton.textContent = "Claim Now";
    claimButton.disabled = false;
  }
}

setInterval(updateClaimButton, 1000);
updateClaimButton();

claimButton.addEventListener("click", () => {
  if (Date.now() - lastClaim >= claimCooldown) {
    count += 1;
    counter.textContent = `${count} TCL`;
    lastClaim = Date.now();
    localStorage.setItem('lastClaim', lastClaim);
    updateClaimButton();
  }
});

button.addEventListener("click", () => {
  count += 1;
  counter.textContent = `${count} TCL`;
  counter.classList.add("count-animation");
  setTimeout(() => {
    counter.classList.remove("count-animation");
  }, 500);
});

// Animasi counter (CSS inject)
const style = document.createElement("style");
style.innerHTML = `
  .count-animation {
    animation: counterBounce 0.5s ease;
  }
  @keyframes counterBounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

// =============================
// WORLD ID VERIFICATION
// =============================
window.addEventListener("DOMContentLoaded", () => {
  if (window.WorldIDWidget) {
    new window.WorldIDWidget({
      action_id: "app_8fb6097455c4b53031a8f1d50b03ac11", // ✅ Kamu sudah benar
      signal: "tapcloud_user_verification",
      app_name: "TapCloud",
      container_id: "world-id-container",
      theme: "light",
      onSuccess: async (proof) => {
  console.log("✅ Verified!", proof);
  alert("Verification successful!");

  try {
    const res = await fetch("https://your-backend-domain.com/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proof)
    });

    const result = await res.json();
    if (result.success) {
      console.log("🎉 Backend verified the proof!");
      // Tambahkan bonus TCL atau buka akses premium
    } else {
      alert("❌ Verification rejected by backend");
    }
  } catch (err) {
    console.error("🚨 Error sending to backend:", err);
  }
}

      onError: (err) => {
        console.error("❌ Verification Error:", err);
        alert("Verification failed. Please try again.");
      }
    });
  }
});
