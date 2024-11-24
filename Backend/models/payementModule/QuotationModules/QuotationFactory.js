const ExpressQuotation = require('./ExpressQuotation');
const InternationalQuotation = require('./InternationalQuotation');
const StandardQuotation = require('./StandardQuotation');

class QuotationFactory {
    createQuotation(type) {
      switch (type) {
        case 'express':
          console.log("using Quotation factory, returning new express quotation. \n");
          return new ExpressQuotation();
        case 'international':
          console.log("using Quotation factory, returning new international quotation. \n");
          return new InternationalQuotation();
        case 'standard':
          console.log("using Quotation factory, returning new standard quotation. \n");
          return new StandardQuotation();
        default:
          throw new Error("Invalid quotation type");
      }
    }
  }
  

  module.exports = QuotationFactory; 