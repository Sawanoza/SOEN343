const CostContext = require("../CostModules/CostContext");
const SpeedBasedCost = require("../CostModules/SpeedBasedCost");
const QuotationStrategy = require("./QuotationStrategy");

class InternationalQuotation extends QuotationStrategy{

    calculateCost(amount, weight, distance){  
        console.log("international Quotation")
        console.log("Calculating cost with:", { amount, weight, distance });
        let costContext = new CostContext(new SpeedBasedCost());
        console.log("cost context: ", costContext);
        let price = costContext.calculateCost(amount, weight, distance);
        return price;
    }
    calculateProfitPercentage(amount, weight, distance){
        var cost = this.calculateCost(amount, weight, distance);

        // Something random for profit idk
        cost *= 1.3;
        return cost;
    }
}

module.exports = InternationalQuotation;