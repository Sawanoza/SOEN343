const CostContext = require("../CostModules/CostContext");
const DistanceBasedCost = require("../CostModules/SpeedBasedCost");
const QuotationStrategy = require("./QuotationStrategy");

class StandardQuotation extends QuotationStrategy{

    calculateCost(amount, weight, distance){  
        const costContext = new CostContext(new DistanceBasedCost());
        return costContext.calculateCost(amount, weight, distance);;
    }
    calculateProfitPercentage(amount, weight, distance){
        let cost = this.calculateCost(amount, weight, distance);

        // Something random for profit idk
        cost *= 1.3;
        return cost;
    }
}

module.exports = StandardQuotation;