export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nullifier_hash, merkle_root, proof, credential_type } = req.body;

  if (!nullifier_hash || !merkle_root || !proof || !credential_type) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }

  try {
    // Kirim ke World ID API untuk verifikasi
    const worldResponse = await fetch("https://developer.worldcoin.org/api/v1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WORLD_ID_API_KEY}` // simpan di Environment Variable
      },
      body: JSON.stringify({
        nullifier_hash,
        merkle_root,
        proof,
        credential_type,
        action: "tapcloud_user_verification",
        signal: "tapcloud_user_verification"
      })
    });

    const result = await worldResponse.json();

    if (!worldResponse.ok) {
      return res.status(400).json({ success: false, error: result.detail || "Verification failed" });
    }

    // ✅ Jika lolos verifikasi
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Verification error:", err);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
