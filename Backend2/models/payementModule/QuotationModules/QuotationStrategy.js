const CostContext = require("../CostModules/CostContext");

class QuotationStrategy extends CostContext {
    calculateCost(amount, weight, distance){    
        throw new Error("calculateCost method must be implement");
    }
    calculateProfitPercentage(){
        throw new Error("Profit method must be implement");
    }
}

module.exports = QuotationStrategy;