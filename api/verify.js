export async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    nullifier_hash,
    merkle_root,
    proof,
    credential_type
  } = req.body;

  if (!nullifier_hash || !merkle_root || !proof || !credential_type) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const response = await fetch('https://developer.worldcoin.org/api/v1/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nullifier_hash,
        merkle_root,
        proof,
        credential_type,
        signal: "tapcloud"
      })
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, ...result });
    } else {
      return res.status(400).json({ error: result });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Verification failed' });
  }
}
