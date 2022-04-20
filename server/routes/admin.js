const express = require('express');

const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const validate = require('validator')

const mongoose = require('mongoose');

const router = new express.Router();

const Joi = require('@hapi/joi')

const bcrypt = require('bcrypt');

const Admin = require('../db/model/admin');

const Bus = require('../db/model/bus');

const Ticket = require('../db/model/ticket');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

require('dotenv').config();

function adminAuth (req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if (token==null)  return res.status(500).json({
        status : "Error",
        result : "Access Denied"
        })

    jwt.verify(token,process.env.ADMIN_KEY,(err, email)=>{
        if (err) return res.status(500).json({
            status : "Error",
            result : "Access Denied"
            })
        req.email = email
    })
    next()
}

router.post('/admin/login',jsonParser, async ( req, res) =>{
    try{
        let Email = req.body.email
        let adminDetails =  await Admin.findOne({email:Email});
        if (adminDetails){
            const passCheck = await bcrypt.compare(req.body.password,adminDetails.password);
            
            if (passCheck==true){
                const token = jwt.sign(Email,process.env.ADMIN_KEY)
                res.json({
                    status : "Success",
                    result : {
                        "token" : token,
                    }
                })
            }else{res.status(500).json({
                status : "Error",
                result : "Incorrect Login Details"
                })}

        }else{res.status(500).json({
            status : "Error",
            result : "Incorrect Login Details"
            })}

    }catch (e) {res.status(500).json({
        status : "Error",
        result : {
            error : e
        }
        })}
})

router.post('/admin/signup', jsonParser, async ( req, res)=>{
    let {name, companyName, number, email, password} = req.body
    try{
        const existingUser = await Admin.findOne({email});
        if (existingUser){
            res.status(500).json({
                status : "Error",
                result : "Email already exists"
            })
        }
        const Number = req.body.number
        const existingNumber = await Admin.findOne({number});
        
        if (existingNumber){
            res.status(500).json({
                status : "Error",
                result : "Number already exists"
            })
        }
       
        // this will be implemented if the email in not register with the data base
        else {
            password = await bcrypt.hash(password,12);
                let admin = new Admin({
                    name,
                    companyName,
                    number,
                    email,
                    isAdmin:true,
                    password,
                })
            admin.save();
            res.status(200).json({
                status : "Success",
                result : "Successfully logged In"
            })
        }
    }catch (e) {res.status(500).json({
        status : "error",
        result :  "Please add the correct info"
    })}
})

router.post('/admin/bus/uploaddetails',adminAuth, jsonParser, async ( req, res)=>{
    let email = req.email
    const clientDetails =  await Admin.findOne({email});
        if (!clientDetails){
            res.status(500).json({
                status : "error",
                result :  "email doesn't exist"
            })
        }
        else{
            let {number,rate,date,time,noOfSeats,arrival,destiny} = req.body;
            try {
                const existingBus = await Bus.findOne({number,date});
                if (existingBus){
                    res.status(500).json({
                        status : "error",
                        result :  "Trip for the same bus on the given date already exists"
                    })
                }
                else{
                    for (i =1 ; i <=noOfSeats;i++){
                        const ticket = new Ticket ({
                            seatNo:i,
                            isBooked:false,
                            busNumber:number,
                            customerName:null, 
                            rate,
                            customerEmail:null,
                            date,
                            time,
                            arrival,
                            destiny
                        })
                        await ticket.save();
                    }
                    const bus = new Bus({
                        name:clientDetails.companyName,
                        number,
                        rate,
                        date,
                        time,
                        noOfSeats,
                        arrival,
                        destiny
                    })
                    
                    let busOwner = await Admin.findOneAndUpdate({email},{$push:{yourBus:bus},});
                    bus.save();
                    res.json({
                        status : "Success",
                        result : "Bus and tickets both are created"
                    })
                }
    
             } catch (error) {
                res.status(500).json({
                    status : "error",
                    result :  "Please fill in the appropriate details."
                })

}}
})

router.post('/admin/bus/sales',adminAuth, jsonParser, async ( req, res)=>{
    let email = req.email;
    let number = req.body.number
    try {
        let adminInfo = await Admin.find({email});
        let busInfo = await Bus.find({number});
        if (adminInfo.companyName === busInfo.name){
            const soldTickets = await Ticket.find({isBooked:true,busNumber:number});
            let sales = 0;
            for ( i=0 ;i < soldTickets.length;i++){
                sales+=soldTickets[i].rate
        }
        res.json({
            status : "Success",
            result : "Sales of bus Number " + number + " is " + sales
        })
        }
}catch (error) {
    res.status(500).json({
        status : "error",
        result :  "Please fill in the appropriate details."
    })
}
})

module.exports = router;

