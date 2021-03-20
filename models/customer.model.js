module.exports = (sequelize, Sequelize) => {
    const Customers = sequelize.define('customer', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        customerName:{type: Sequelize.STRING},
        accountNumber:{type: Sequelize.STRING},
        depositAmount:{type: Sequelize.INTEGER},
        createdAt:{type: Sequelize.DATE},
        updatedAt:{type: Sequelize.DATE},
    },{freezeTableName : true});
    return Customers;
}