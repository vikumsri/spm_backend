const subscriber = require('../models/emailSubscriber-model');

const subscribe = async(req,res, next) => {
    if(req.body && req.body){ 
        const email = new subscriber(req.body);

        await email
        .save()
        .then((data)=> {
            res.status(200).send({ data: data });
      })
        .catch((error) => {
            res.status(500).send({error: error.message});
        })

    }
};

const unsubscribe = async (req, res) => {

    const status = 'unsubscribed'
    await subscriber.findByIdAndUpdate(
        req.params.id,
        {$set: {status: status}},
        {upsert:true},
        function(err, result){
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        }
    );
}

module.exports = {
    subscribe,
    unsubscribe
}