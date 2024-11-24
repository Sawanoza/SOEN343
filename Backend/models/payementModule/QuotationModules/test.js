const CostContext = require('../CostModules/CostContext');
const QuotationFactory = require('./QuotationFactory');

// Create the factory instance
const factory = new QuotationFactory();

// Create an express quotation
const expressQuotation = factory.createQuotation('express');
console.log(expressQuotation.calculateCost(1000, 5, 50));

// Create a standard quotation
// const standardQuotation = factory.createQuotation('standard');
// console.log(standardQuotation.calculateProfitPercentage(800, 3, 30));






