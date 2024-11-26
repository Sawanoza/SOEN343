class QuotationContext {
    constructor(QuotationStrategy) {
        this.QuotationStrategy = QuotationStrategy;
    }

    setPaymentStrategy(QuotationStrategy) {
        this.QuotationStrategy = QuotationStrategy;
    }

    calculateQuotation(amount, weight, distance){    
        var cost = this.QuotationStrategy.calculateProfitPercentage(amount,weight,distance);
    }

}

module.exports = QuotationContext;
