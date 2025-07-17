const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const trackWithKeywords = require("./scrapers/keywordChecker");
const trackWithShiprocketAPI = require("./scrapers/shiprocketApi");
const identifyCourier = require("./utils/identifyCourier");

app.use(cors());

app.get("/api/track", async (req, res) => {
  const { awb } = req.query;
  if (!awb) return res.status(400).send("AWB number is required.");

  // Step 1: Identify known pattern (like Shadowfax with "SF")
  const guessedCourier = identifyCourier(awb);

  if (guessedCourier === "Shadowfax") {
    return res.json({
      success: true,
      name: "Shadowfax",
      url: "https://www.shadowfax.in/track/" + awb
    });
  }

  // Step 2: Try Shiprocket API
  const shiprocketResult = await trackWithShiprocketAPI(awb);
  if (shiprocketResult.success) return res.json(shiprocketResult);

  // Step 3: Fallback to keyword-based tracking
  const keywordResult = await trackWithKeywords(awb);
  if (keywordResult.success) return res.json(keywordResult);

  // Step 4: Not found
  return res.json({ success: false });
});

app.listen(port, () => {
  console.log(`TrackAny backend running on port ${port}`);
});
