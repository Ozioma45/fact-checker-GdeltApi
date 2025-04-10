const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/api/quick-check", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Query missing" });

  try {
    const gdeltURL = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(
      query
    )}&mode=ArtList&format=json`;

    const response = await axios.get(gdeltURL);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch from GDELT" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
