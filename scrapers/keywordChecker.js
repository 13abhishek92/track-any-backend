const axios = require("axios");

const couriers = [
  { name: "Ecom Express", url: "https://ecomexpress.in/tracking/?awb_field=" },
  { name: "XpressBees", url: "https://www.xpressbees.com/track?awb=" },
  { name: "Delhivery", url: "https://www.delhivery.com/track-v2/package/" },
  { name: "Blue Dart", url: "https://www.bluedart.com/trackdarttracking?trackno=" },
  { name: "FedEx", url: "https://www.fedex.com/apps/fedextrack/?tracknumbers=" },
  { name: "India Post", url: "https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx?articleid=" },
  { name: "Wow Express", url: "https://www.wowexpress.in/track-your-shipment/?tracking_number=" }
];

const keywords = ["Delivered", "In Transit", "Out for Delivery", "Shipped", "Shipment", "Expected", "Dispatched"];

module.exports = async function trackWithKeywords(awb) {
  for (let courier of couriers) {
    const url = courier.url + awb;
    try {
      const response = await axios.get(url, { timeout: 7000 });
      const text = response.data;
      if (
        typeof text === "string" &&
        keywords.some(word => text.includes(word)) &&
        !text.toLowerCase().includes("track your package")
      ) {
        return { success: true, name: courier.name, url };
      }
    } catch (e) {
      continue;
    }
  }
  return { success: false };
};

