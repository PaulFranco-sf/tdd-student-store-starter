const { storage } = require("../data/storage")

class Purchases {
    static async listPurchases() {
        // list all items in the transactions array
        const purchases = storage.get("purchases").value()
        return purchases
      }

    static async recordPurchase(purchase) {
        // create a new transaction
    
        if (!purchase) {
          return console.log("No purchase sent")
        }
        // const requiredFields = ["orderId", "category", "amount"]
        // requiredFields.forEach((field) => {
        //   if (!transaction[field] && transaction[field] !== 0) {
        //     throw new BadRequestError(`Field: "${field}" is required in transaction`)
        //   }
        // })

        const purchases = await Purchases.listPurchases()
        const purchaseId = purchases.length + 1
        const purchasedAt = new Date().toISOString()
    
        const newPurchase = { id: purchaseId, purchasedAt, ...purchase }
    
        storage.get("purchases").push(newPurchase).write()
    
        return newPurchase
      }
}

module.exports = Purchases