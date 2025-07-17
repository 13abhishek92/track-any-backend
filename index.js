
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const couriers = [
  { name: "Shiprocket", url: "https://track.shiprocket.in/?tracking_id=" },
  { name: "India Post", url: "https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx?articleid=" },
  { name: "Porter", url: "https://porter.in/track-order/" },
  { name: "Blue Dart", url: "https://www.bluedart.com/trackdarttracking?trackno=" },
  { name: "DTDC", url: "https://www.dtdc.in/tracking.asp?awb=" },
  { name: "Ecom Express", url: "https://ecomexpress.in/tracking/?awb_field=" },
  { name: "XpressBees", url: "https://www.xpressbees.com/track?awb=" },
  { name: "Shadowfax", url: "https://www.shadowfax.in/track/" },
  { name: "Ekart", url: "https://ekartlogistics.com/track/" },
  { name: "FedEx", url: "https://www.fedex.com/apps/fedextrack/?tracknumbers=" },
  { name: "Amazon Shipping", url: "https://track.amazon.in/tracking/" },
  { name: "Wow Express", url: "https://www.wowexpress.in/track-your-shipment/?tracking_number=" },
  { name: "Delhivery", url: "https://www.delhivery.com/track-v2/package/" }  // Moved to bottom
];

app.get("/api/track", async (req, res) => {
  const { awb } = req.query;
  if (!awb) return res.status(400).send("AWB number is required.");

  const keywords = ["Delivered", "In Transit", "Out for Delivery", "Shipped", "Shipment", "Expected", "Dispatched", "Tracking Details"];

  for (let courier of couriers) {
    const url = courier.url + awb;
    try {
      const response = await axios.get(url, { timeout: 7000 });
      const text = response.data;

      // Skip false matches like Delhivery's generic landing page
      if (
        typeof text === "string" &&
        keywords.some(word => text.includes(word)) &&
        !text.toLowerCase().includes("track your package")
      ) {
        return res.json({ success: true, name: courier.name, url });
      }
    } catch (e) {
      continue;
    }
  }

  res.json({ success: false });
});

app.listen(port, () => {
  console.log(`TrackAny backend running on port ${port}`);
});
