// URLs for current and historical data
let currentRateUrl = "https://economia.awesomeapi.com.br/json/last/USD-BRL";
let historicalRateUrl = "https://economia.awesomeapi.com.br/json/daily/USD-BRL/8"; // Hypothetical URL for historical data

// Fetch the current USD-BRL exchange rate
let request = new Request(currentRateUrl);
let data = await request.loadJSON();
let currentDollarRate = parseFloat(data["USDBRL"].bid);

// Attempt to fetch the historical rate from one week ago
let historicalRequest = new Request(historicalRateUrl);
let historicalData = await historicalRequest.loadJSON();
let historicalDollarRate = parseFloat(historicalData[7].bid); // Adjust based on the API response structure

// Calculate the adjusted main value (98% of current rate times 1111)
let salary = 1111;
let adjustedRate = (currentDollarRate * 0.98) * salary;
let formattedAdjustedRate = adjustedRate.toFixed(2); // Adjusted value still in 2 decimal places

// Calculate the change from one week ago (as a percentage)
let rateChange = ((currentDollarRate - historicalDollarRate) / historicalDollarRate * 100).toFixed(2);
let rateChangeText = rateChange >= 0 ? `+${rateChange}%` : `${rateChange}%`;

// Set up the widget
let widget = new ListWidget();
widget.backgroundColor = new Color("#ffffff");

// Main info: Adjusted dollar value
let salaryLabel = widget.addText("Salary:");
salaryLabel.font = Font.systemFont(12);
salaryLabel.textColor = Color.gray();
let mainValueText = widget.addText("R$ " + formattedAdjustedRate);
mainValueText.font = Font.boldSystemFont(18);
mainValueText.textColor = Color.green();
widget.addSpacer(10);

// Current dollar rate with 4 decimals
let currentRateText = widget.addText("Now: R$ " + currentDollarRate.toFixed(4));
currentRateText.font = Font.systemFont(12);
currentRateText.textColor = Color.gray();
widget.addSpacer(5);

// Historical rate with 4 decimals and comparison
let historicalRateText = widget.addText(`1w Ago: R$ ${historicalDollarRate.toFixed(4)} (${rateChangeText})`);
historicalRateText.font = Font.systemFont(10);
historicalRateText.textColor = rateChange >= 0 ? Color.red() : Color.green();
widget.addSpacer(20);

// Display the last updated time
let updateText = widget.addText("Updated: " + new Date().toLocaleTimeString());
updateText.font = Font.systemFont(10);
updateText.textColor = Color.gray();

// Finalize the widget
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();
