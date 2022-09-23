const account = require("./customer.service");
const { genSaltSync, hashSync } = require("bcrypt");
const RegisterMail = require("../mails/register");

module.exports = {
  createCustomer: async (req, res) => {
    const customer_data = req.body;
    var salt = genSaltSync(10);
    customer_data.salt = salt;
    customer_data.password = hashSync(customer_data.password, salt);
    if (!customer_data.password || !customer_data.email) {
      res.send({ error: "Error: You must provide Email & Password." });
    } else {
      try {
        account.isExistingCustomer(
          customer_data,
          function (err, is_existing_customer) {
            if (is_existing_customer === false) {
              account.register(customer_data, (err, result) => {
                if (!result.error && result) {
                  RegisterMail.sendMail(customer_data);
                  return res.send({status:200,result : "Register Sucesss"});
                } else {
                  res.send({ status:401, error: result.error });
                }
              });
            } else {
              res.send({  status:401 ,error: is_existing_customer });
            }
          }
        );
      } catch (error) {
        console.log(" Error in create user " + error);
      }
    }
  },
  customerLogin: async(req,res)=>{
    console.log('-----------customerLogin')
  }
  

};
