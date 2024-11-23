const CostContext = require("../CostModules/CostContext");
const PriorityBasedCost = require("../CostModules/PriorityBasedCost");

class ExpressQuotation extends QuotationStrategy{

    calculateCost(amount, weight, distance){  
        CostContext = new CostContext(new PriorityBasedCost());
        let price = CostContext.calculateCost(amount, weight, distance);
        return price;
    }
    calculateProfitPercentage(amount, weight, distance){
        let cost = this.calculateCost(amount, weight, distance);

        // Something random for profit idk
        cost *= 1.3;
        return cost;
    }
}

module.exports = ExpressQuotation;