const QuotationFactory = require('./QuotationFactory');

// Create the factory instance
const factory = new QuotationFactory();

// Create an express quotation
const expressQuotation = factory.createQuotation('express');
expressQuotation.calculateCost(800,3,30);
// console.log(expressQuotation.calculateCost(1000, 5, 50));

// Create a standard quotation
const standardQuotation = factory.createQuotation('standard');
standardQuotation.calculateProfitPercentage(800, 3, 30);

// Create a International Quotation
const internationalQuotation = factory.createQuotation('international');
internationalQuotation.calculateProfitPercentage(800, 3, 30);
