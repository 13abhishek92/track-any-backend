// utils/identifyCourier.js
module.exports = function identifyCourier(awb) {
  if (/^SF/.test(awb)) return "Shadowfax";     // Shadowfax typically uses SF
  if (/^EX/.test(awb)) return "Ecom Express";  // Hypothetical
  if (/^[0-9]{12}$/.test(awb)) return "Delhivery";
  if (/^[A-Z]{2}[0-9]{9}IN$/.test(awb)) return "India Post";
  return null;
};
