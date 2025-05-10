// frontend/index.js

// Simulasi data dari hasil scan World ID (gantilah ini dengan hasil real dari widget)
const worldIdProof = {
  nullifier_hash: "example_hash",
  merkle_root: "example_root",
  proof: "example_proof",
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
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("✅ World ID verified successfully!");
      } else {
        alert("❌ Verification failed: " + data.message);
      }
    })
    .catch(error => {
      console.error("Error verifying:", error);
      alert("❌ Error connecting to backend.");
    });
}

// Call this function when user submits verification
// verifyWorldId();
