app.post("/verify-world-id", (req, res) => {
  const { nullifier_hash, proof, merkle_root, credential_type } = req.body;

  // Di versi production: kirim proof ini ke World ID endpoint untuk diverifikasi benar-benar
  console.log("Proof received:", req.body);

  // Dummy validasi saja
  if (nullifier_hash && proof) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false, message: "Invalid proof" });
  }
});
