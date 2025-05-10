let count = 0;
const button = document.getElementById("tapButton");
const counter = document.getElementById("counter");
const claimButton = document.getElementById("claimButton");

const claimCooldown = 24 * 60 * 60 * 1000; // 24 hours
let lastClaim = parseInt(localStorage.getItem('lastClaim')) || 0;

function updateClaimButton() {
  const now = Date.now();
  const timeRemaining = claimCooldown - (now - lastClaim);

  if (timeRemaining > 0) {
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    claimButton.textContent = `Claim available in ${formatted}`;
    claimButton.disabled = true;
  } else {
    claimButton.textContent = "Claim Now";
    claimButton.disabled = false;
  }
}

// Jalankan update setiap detik
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

// CSS animasi counter
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
