// URLs for current and historical data
const CURRENT_RATE_URL = "https://economia.awesomeapi.com.br/json/last/USD-BRL";
const HISTORICAL_RATE_URL = "https://economia.awesomeapi.com.br/json/daily/USD-BRL/8"; // Hypothetical URL for historical data

// Constants
const SALARY = 1111; // Base salary
const RATE_ADJUSTMENT = 0.98; // Adjustment factor (98%)
const REFRESH_INTERVAL = 60 * 60; // 1 hour in seconds for widget refresh

// Function to fetch JSON data from a given URL
async function fetchJSON(url) {
  let request = new Request(url);
  return await request.loadJSON();
}

// Fetch the current USD-BRL exchange rate
let currentData = await fetchJSON(CURRENT_RATE_URL);
let currentRate = parseFloat(currentData.USDBRL.bid);

// Fetch historical data (1 week ago)
let historicalData = await fetchJSON(HISTORICAL_RATE_URL);
let historicalRate = parseFloat(historicalData[7].bid); // 7 days ago

// Calculate adjusted salary
let adjustedSalary = (currentRate * RATE_ADJUSTMENT * SALARY).toFixed(2);

// Calculate percentage change from 1 week ago
let rateChange = (((currentRate - historicalRate) / historicalRate) * 100).toFixed(2);
let rateChangeText = rateChange >= 0 ? `+${rateChange}%` : `${rateChange}%`;

// Create widget
let widget = new ListWidget();
widget.backgroundColor = new Color("#ffffff");

// Display adjusted salary
let salaryLabel = widget.addText("Salary:");
styleText(salaryLabel, Font.systemFont(12), Color.gray());
let salaryValue = widget.addText(`R$ ${adjustedSalary}`);
styleText(salaryValue, Font.boldSystemFont(18), Color.green());
widget.addSpacer(10);

// Display current rate
let currentRateText = widget.addText(`Now: R$ ${currentRate.toFixed(4)}`);
styleText(currentRateText, Font.systemFont(12), Color.gray());
widget.addSpacer(5);

// Display historical rate with change percentage
let historicalRateText = widget.addText(`1w Ago: R$ ${historicalRate.toFixed(4)} (${rateChangeText})`);
let rateChangeColor = rateChange >= 0 ? Color.red() : Color.green();
styleText(historicalRateText, Font.systemFont(10), rateChangeColor);
widget.addSpacer(20);

// Display last updated time
let updatedTimeText = widget.addText(`Updated: ${new Date().toLocaleTimeString()}`);
styleText(updatedTimeText, Font.systemFont(10), Color.gray());

// Set widget refresh interval
widget.refreshAfterDate = new Date(Date.now() + REFRESH_INTERVAL * 1000);

// Present widget
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();

// Helper function to style text elements
function styleText(element, font, color) {
  element.font = font;
  element.textColor = color;
}
