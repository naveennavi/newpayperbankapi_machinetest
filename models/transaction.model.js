module.exports = (sequelize, Sequelize) => {
    const transactionModel = sequelize.define('transaction', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        customerId:{type: Sequelize.STRING},
        amount:{type: Sequelize.INTEGER},
        createdAt:{type: Sequelize.DATE},
        updatedAt:{type: Sequelize.DATE},
    },{freezeTableName : true});
    return transactionModel;
}