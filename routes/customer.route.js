module.exports = (app)=>{
    const customer = require('../controllers/customer.controller');

    app.post('/api/v1/newCustomer', customer.newCustomer);
    app.post('/api/v1/getCustomer',customer.getCustomer);
    app.post('/api/v1/getBalance',customer.getBalance);
    app.post('/api/v1/getTranscationHistory',customer.getTranscationHistory);
    app.post('/api/v1/transaction',customer.newTransaction);
   
}