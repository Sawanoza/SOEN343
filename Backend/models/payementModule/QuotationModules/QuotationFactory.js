const ExpressQuotation = require('./ExpressQuotation');
const InternationalQuotation = require('./InternationalQuotation');
const StandardQuotation = require('./StandardQuotation');


class QuotationFactory {
    createQuotation(type) {
      switch (type) {
        case 'express':
          return new ExpressQuotation();
        case 'international':
          return new InternationalQuotation();
        case 'standard':
          return new StandardQuotation();
        default:
          throw new Error("Invalid quotation type");
      }
    }
  }
  

  module.exports = QuotationFactory; 