const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const trackWithKeywords = require("./scrapers/keywordChecker");
const trackWithShiprocketAPI = require("./scrapers/shiprocketApi");

app.use(cors());

app.get("/api/track", async (req, res) => {
  const { awb } = req.query;
  if (!awb) return res.status(400).send("AWB number is required.");

  const shiprocketResult = await trackWithShiprocketAPI(awb);
  if (shiprocketResult.success) return res.json(shiprocketResult);

  const keywordResult = await trackWithKeywords(awb);
  if (keywordResult.success) return res.json(keywordResult);

  return res.json({ success: false });
});

app.listen(port, () => {
  console.log(`TrackAny backend combo running on port ${port}`);
});
