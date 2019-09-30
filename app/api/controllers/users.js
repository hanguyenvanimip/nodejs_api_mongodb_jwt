const userModel = require('./../models/users');
const jwt =require('jsonwebtoken');

module.exports ={
    create :(req,res,next)=> {
        userModel.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password

        },
        (err,result)=>{
            if(err)
                next(err);
            else
            {
                res.json({status: 'succsess',message :'User added successfull',data:null});
            }
        });
    },
    authentication :(req,res,next)=> {
        userModel.findOne(
        {
            email: req.body.email
        },
        (err,userInfo)=>{
            if(err)
            {
                next(err);
            }            
            if(req.body.password ===userInfo.password)
            {
                var token = jwt.sign({id:userInfo._id},req.app.get('secretKey'),{expiresIn:'1h'});
                res.json({status:'success',message:'user found!!!',user: userInfo,token:token});
            }
            else{
                res.json({status:"error", message: "Invalid email/password!!!", data:null});
            }
        });
    }
}