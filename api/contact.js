export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const FORMSPREE_URL = process.env.FORMSPREE_URL;

  if (!FORMSPREE_URL) {
    return res.status(500).json({ error: "Contact service is not configured." });
  }

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return res.status(200).json({ status: "success" });
    } else {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
