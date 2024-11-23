class QuotationStrategy {
    calculateCost(amount, weight, distance){    
        throw new Error("calculateCost method must be implement");
    }
    calculateProfitPercentage(){
        throw new Error("Profit method must be implement");
    }
}

module.exports = QuotationStrategy;