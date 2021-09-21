const emailCreator = require('../models/email-model');
const emailSubscriber =require('../models/emailSubscriber-model');
const nodeMailer = require('nodemailer');

const createEmail = async(req,res, next) => {

     let subEmails = [];
        subEmails= await subscribers();
    console.log(subEmails);

    if(req.body){

       
        const email = new emailCreator(req.body);
        await email
        .save()
        .then((data)=> {
            res.status(200).send({ data: data });

            const topic = req.body.topic;
            const body = req.body.body;
            let trasporter = nodeMailer.createTransport({
                service:'gmail',
                auth:{
                    user:'spmassignment40@gmail.com',
                    pass:'lakeroad'
                }
            });

            let mailOptions = {
                from:'spmassignment40@gmail.com',
                to:subEmails,
                subject:topic,
                text: body,

            }

            trasporter.sendMail(mailOptions, function(err,data) {
                if(err) {
                    console.log('Error Occurs' , err)
                }
                else {
                    console.log("Email sent!")
                }
            })

      })
        .catch((error) => {
            res.status(500).send({error: error.message});
        })
    }
};

const viewEmails = async(req, res) => {
    if(req.params){
        await emailCreator.find()
        .then(data => {
            res.status(200).send({ data:data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}


const searchEmails = async(req, res) => {
    if(req.params && req.params.key){
        const keyword = req.params.key
        const regex = new RegExp(keyword, 'i') // i for case insensitive
        await emailCreator.find({"topic": {$regex: regex}})
        .then(data => {
            res.status(200).send({ data:data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}


const subscribers = async() => {
    let subscribersArr = [];
    const subs = await emailSubscriber.find({status:'subscribed'})
    .then(data => {
        for(let i = 0; i < data.length; i++){
            subscribersArr.push(data[i].email)
        }

    })
   

    // const queryRes = await Person.findOne({ _id: idString });

    return subscribersArr

}




module.exports = {
    createEmail,
    viewEmails,
    searchEmails,
    subscribers

}