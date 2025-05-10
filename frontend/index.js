// frontend/index.js

document.getElementById("verifyBtn").addEventListener("click", verifyWorldId);

// Dummy data (seharusnya ini didapat dari World ID widget di production)
const worldIdProof = {
  nullifier_hash: "dummy_hash_123",
  merkle_root: "dummy_root_456",
  proof: "dummy_proof_789",
  credential_type: "orb"
};

function verifyWorldId() {
  fetch("http://localhost:3000/verify-world-id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(worldIdProof)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Verification successful!");
      } else {
        alert("❌ Verification failed: " + data.message);
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ Network error.");
    });
}
