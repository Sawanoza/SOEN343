const CostContext = require("../CostModules/CostContext");
const SpeedBasedCost = require("../CostModules/SpeedBasedCost");

class InternationalQuotation {

    calculateCost(amount, weight, distance){  
        CostContext = new CostContext(new SpeedBasedCost());
        let price = CostContext.calculateCost(amount, weight, distance);
        return price;
    }
    calculateProfitPercentage(amount, weight, distance){
        let cost = this.calculateCost(amount, weight, distance);

        // Something random for profit idk
        cost *= 1.3;
    }
}

module.exports = InternationalQuotation;