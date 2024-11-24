const CostContext = require("../CostModules/CostContext");
const SpeedBasedCost = require("../CostModules/SpeedBasedCost");
const QuotationStrategy = require("./QuotationStrategy");

class InternationalQuotation extends QuotationStrategy{

    calculateCost(amount, weight, distance){  
        const costContext = new CostContext(new SpeedBasedCost());
        let price = costContext.calculateCost(amount, weight, distance);
        return price;
    }
    calculateProfitPercentage(amount, weight, distance){
        let cost = this.calculateCost(amount, weight, distance);

        // Something random for profit idk
        cost *= 1.3;
        return cost;
    }
}

module.exports = InternationalQuotation;