const CostContext = require("../CostModules/CostContext");
const DistanceBasedCost = require("../CostModules/DistanceBasedCost");
const QuotationStrategy = require("./QuotationStrategy");

class StandardQuotation extends QuotationStrategy{

    calculateCost(amount, weight, distance){  
        console.log("standard Quotation")
        console.log("Calculating cost with:", { amount, weight, distance });
        let costContextSet = new CostContext(new DistanceBasedCost());
        console.log("cost context: ", costContextSet);
        return costContextSet.calculateCost(amount, weight, distance);;
    }
    calculateProfitPercentage(amount, weight, distance){
        var cost = this.calculateCost(amount, weight, distance);

        // Something random for profit idk
        cost *= 1.3;
        return cost;
    }
}

module.exports = StandardQuotation;