const subscriber = require('../models/emailSubscriber-model');

const subscribe = async(req,res, next) => {
    if(req.body && req.body){ 
        const mail = new subscriber(req.body);

        const email = req.body.email;

        const existingUser = await subscriber.findOne({email});

        console.log(existingUser);


        if(existingUser){
            if(existingUser.status === 'subscribed') {
                res.status(200).send("Already subscribed. Please Try a different Email");
            }
            else if(existingUser.status ==='unsubscribed'){
                console.log(existingUser)
                const status = 'subscribed'
                await subscriber.findOneAndUpdate(
                    {email: existingUser.email},
                    {$set: {status: status}},
                    {upsert:true},
                    function(err, result){
                        if(err){
                            res.send(err);
                        }else{
                            res.send("User successfully re-subscribed");
                        }
                    }
                );
            }
        }
        else if (existingUser === null ){
            await mail
            .save()
            .then((data)=> {
                res.status(200).send("User Successfully subscribed");
        })
            .catch((error) => {
                res.status(500).send({error: error.message});
            })

        }





    }
};

const unsubscribe = async (req, res) => {

    email = req.params.email;
    const existingUser = await subscriber.findOne({email})


    if (existingUser === null){
        res.send("Please enter an Email you have already Subscribed from.")
    }
    else if (existingUser){
        if(existingUser.status === 'unsubscribed'){
            res.send("You have already unsubscribed")
        }
        if(existingUser.status === "subscribed") {
            const status = 'unsubscribed'
            await subscriber.findOneAndUpdate(
                {email: req.params.email},
                {$set: {status: status}},
                {upsert: true},
                function (err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Successfully Unsubscribed");
                    }
                }
            );
        }
    }
    
}

module.exports = {
    subscribe,
    unsubscribe
}