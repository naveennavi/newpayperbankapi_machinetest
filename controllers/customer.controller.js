const db = require('../config/database');


const customerModel = require('../models/customer.model')(db.sequelize, db.Sequelize);
const transmodel = require('../models/transaction.model')(db.sequelize, db.Sequelize);


//newCustomer
exports.newCustomer = (req, res)=>{
    var customerName = req.body.customerName;
    var accountNumber = req.body.accountNumber;
    var depositAmount = req.body.depositAmount;
    customerModel.create({
        customerName : customerName,
        accountNumber : accountNumber,
        depositAmount : depositAmount
    }).then(data=>{
        res.status(200).send({ status : 'success', msg:'user added successfully', data: data });
    }).catch(error=>{
        res.status(200).send({ status : 'error', data: error });
    });
}

//get customer account
exports.getCustomer = async (req, res) => {

    try {
        const number = req.body.accountNumber;
        const myAcc = await customerModel.findOne({accountNumber: number});
        if(!myAcc){
            return res.status(400).send({ status: 'success', resCode: 400, msg: 'No Account found...!'});
        }
        return res.status(200).send({ status: 'success', resCode: 200, msg: 'Customer Details', data: myAcc });

    } catch (error) {
        return res.status(200).send({ status: 'error', resCode: 403, msg: 'Server Unreachable. Please try again...!', data: error });

    }
}

//customer Balance Details
exports.getBalance = async (req, res) =>{
    try {
        const number = req.body.accountNumber;
        const name = req.body.customerName;
        let balance = await customerModel.findOne({where: {
            accountNumber: number,
            customerName:name
        }
     })
   return res.status(200).send({ status: 'success', resCode: 200, msg: 'Customer Balance Details', data: balance.depositAmount });
    }
    catch(error){
        return res.status(200).send({ status: 'error', resCode: 403, msg: 'Server Unreachable. Please try again...!', data: error });
    }
}

//customer transacton History
exports.getTranscationHistory = async (req, res) => { 
    try {
        var custtrans = await customerModel.findOne({where: {
            accountNumber: req.body.accountNumber,
                     },
                         attributes: ['id','customerName','accountNumber']
                       })
        if (custtrans){
            let history = await transmodel.findOne({
                where: { customerId: custtrans.id}
            })
            return res.status(200).send({ status: 'success', resCode: 200, msg: 'Customer Transaction Deetails', data: history });
        }
        else{
            return res.status(400).send({ status: 'success', resCode: 400, msg: 'No Transaction found...!'});
        }
    } catch (error) {
        return res.status(200).send({ status: 'error', resCode: 403, msg: 'Server Unreachable. Please try again...!', data: error });  
    }
   
}

//Create new transfer
exports.newTransaction = async (req, res) => {
    let data ={};
    try {
        const beneficiary_number = req.body.accountNumber;
        const mytrans = await customerModel.findOne({accountNumber: beneficiary_number});

        if(!mytrans){
            return res.status(400).send({ status: 'success', resCode: 400, msg: 'No Account found...!'});
        }
        else{
            var myaccountnumber= req.body.accountNumber;
            var benificiary_number = req.body.benificiaryAccountNumber;
            var benificary_amount = req.body.benificaryAmount;
            var transdate = new Date();
            var mytranscation = await customerModel.findOne({where: {
                accountNumber: myaccountnumber,
                         },
                             attributes: ['id','customerName','accountNumber','depositAmount']
                           })
            from_statement.push({ 
                depositAmount: mytranscation.depositAmount - benificary_amount,
                updatedAt:transdate
            })
            let from_account = await customerModel.update({from_statement})
           data['fromAccount']= from_account;

           var beneficarytrans = await customerModel.findOne({where: {
            accountNumber: benificiary_number,
                     },
                         attributes: ['id','customerName','accountNumber','depositAmount']
                       })
        benificiary_statement.push({ 
            depositAmount: beneficarytrans.depositAmount + benificary_amount,
            updatedAt:transdate
        })
        let benificiary = await customerModel.update({benificiary_statement})
        data['benificiaryAccount']= benificiary;
        var transhist = await transmodel.create({
            customerId:mytranscation.id,
            amount:benificary_amount
        })
        data['Transaction']= transhist;
        return res.status(200).send({ status: 'success', resCode: 200, msg: 'Transaction completed successfully...!', });
        }
        
    } catch (error) {
        return res.status(200).send({ status: 'error', resCode: 403, msg: 'Server Unreachable. Please try again...!', data: error });   
    }
}