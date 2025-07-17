// utils/identifyCourier.js

module.exports = function identifyCourier(awb) {
  awb = awb.trim().toUpperCase();

  // Shadowfax: often starts with 'SF'
  if (/^SF/.test(awb)) return "Shadowfax";

  // Shiprocket: typically alphanumeric, can start with SF too
  // Skip here if you're handling it via API or more rules later

  // India Post: usually like 'EE123456789IN'
  if (/^[A-Z]{2}[0-9]{9}IN$/.test(awb)) return "India Post";

  // Delhivery: often 12 digits
  if (/^[0-9]{12}$/.test(awb)) return "Delhivery";

  // Blue Dart: some 8-11 digit numeric codes
  if (/^[0-9]{8,11}$/.test(awb)) return "Blue Dart";

  // XpressBees: long numeric
  if (/^[0-9]{10,14}$/.test(awb)) return "XpressBees";

  // Ecom Express: can overlap, prefer checking via HTML response
  if (/^EX/.test(awb)) return "Ecom Express";

  // Default fallback
  return null;
};
