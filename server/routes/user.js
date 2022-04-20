const express = require('express');

const app = express();

const jwt = require('jsonwebtoken')

require('dotenv').config()

app.use(express.json());

const validate = require('validator')

const mongoose = require('mongoose');

const router = new express.Router();

const Joi = require('@hapi/joi')

const bcrypt = require('bcrypt');

const User = require('../db/model/user');

const Admin = require('../db/model/admin');

const Bus = require('../db/model/bus');

const Ticket = require('../db/model/ticket');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

function userAuth (req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if (token==null)  return res.status(500).json({
        status : "Error",
        result : "Access Denied"
        })

    jwt.verify(token,process.env.USER_KEY,(err, email)=>{
        if (err) return res.status(500).json({
            status : "Error",
            result : "Access Denied"
        })
        req.email = email
    })
    next()
}

router.post('/user/login',jsonParser, async ( req, res) =>{
    try{
        let Email = req.body.email
        let userDetails =  await User.findOne({email:Email});
        if (userDetails){
            const passCheck = await bcrypt.compare(req.body.password,userDetails.password);
            
            if (passCheck==true){
                    const token = jwt.sign(Email,process.env.USER_KEY)
                    res.json({
                    status : "Success",
                    result : {
                        "token" : token,
                    }
                    })
            }
            else{res.status(500).json({
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

router.post('/user/signup', jsonParser, async ( req, res)=>{
    let {firstName, lastName, number, email, password} = req.body
    try{
        const existingUser = await User.findOne({email});
        if (existingUser){
            res.status(500).json({
                status : "Error",
                result : "Email already exists"
                })}
        
        const existingNumber = await User.findOne({number});
        if (existingNumber){
            res.status(500).json({
                status : "Error",
                result : "Number already exists"
                })
        }
       
        // this will be implemented if the email in not register with the data base
        else {
            password = await bcrypt.hash(password,12);
                let user = new User({
                    firstName,
                    lastName,
                    number,
                    email,
                    isAdmin:false,
                    password,
                })
                user.save();
                res.status(200).json({
                status : "Success",
                result : "Successfully logged In"
                })
        }
    }catch (e) {res.json({
        status : "error",
        result : "Please add the correct info"
    })}
})

router.post('/user/bus/search',userAuth, jsonParser, async ( req, res)=>{
    let {from, to,date} = req.body
    try {
        const busList = await Bus.find({arrival:from,destiny:to,date})
        if (busList.length==0) {res.status(500).json({
            status : "error",
            result : "Sorry no Buses available"
        })}
        else{
            res.status(500).json({
                status : "Success",
                result : busList
            })
        }

    } catch (error) {
        {res.status(500).json({
            status : "error",
            result : "Please fill in the appropriate details."
        })}
    }
})

router.post('/user/bus/booktickets',userAuth, jsonParser, async ( req, res)=>{
    let email = req.email;
    const {number,from,to,date,seatNo,modeOfPayment,passengerName} = req.body;
    try {
        let ticketList = [];
        const busExist = await Bus.find({arrival:from,destiny:to,date,number})
        let existingUser = await User.find({email});
        if(!busExist){
            res.status(500).json({
                status : "Error",
                result : "sorry no bus available on the given date"
            })
        }
        else if (seatNo.length != passengerName.length){
            res.status(500).json({
                status : "Error",
                result : "Please add the passenger Details"
            })}
        else if(seatNo.length > await Ticket.count({busNumber:number,isBooked:false})){
            res.status(500).json({
                status : "Error",
                result : "Tickets not available"
            })}
            else{
                let count = 0
                for ( i=0 ;i < seatNo.length;i++){
                    let seat = seatNo[i]
                    if (await Ticket.findOne({seatNo:seat,busNumber:number,isBooked:false})) {
                        count +=1
                    }
                }
                if (count ==seatNo.length){
                    for ( i=0 ;i < seatNo.length;i++){
                        let seat = seatNo[i]
                        let ticket = await Ticket.findOneAndUpdate({seatNo:seat,busNumber:number,isBooked:false},{$set:{customerName:passengerName[i],customerEmail:email,isBooked:true,modeOfPayment:modeOfPayment}});
                        ticketList.push(ticket)
                        }
                        res.status(200).json({
                            status : "Success",
                            result : {
                                message : "Ticket is Booked",
                                ticketList : ticketList
                            }
                        })
                }
                else {
                    res.status(500).json({
                        status : "Error",
                        result : "Tickets are already booked please check the availibility once"
                    })
                }
                }
            
        
        
    } catch (error) {
        {res.status(500).json({
            status : "Error",
            result : "Please fill in the appropriate details."
        })}
    }
})

router.post('/user/bus/ticket',userAuth, jsonParser, async ( req, res)=>{
    let {number} = req.body;
    try {
        let busExist = await Bus.findOne({number})
        if (!busExist) {res.status(500).json({
            status : "Error",
            result : "Please fill in the appropriate details."})}
        else {
            const ticketList = await Ticket.find({busNumber:number,isBooked:false})
            newTicketList = [];
            for ( i=0 ;i < ticketList.length;i++){
                let ticket = ticketList[i]
                newTicketList.push(ticket.seatNo)   
            }
            if (newTicketList.length ==0){
                res.status(500).json({
                    status : "Error",
                    result : "No tickets Available"
                })}
                else{
                    res.status(500).json({
                        status : "Success",
                        result : newTicketList
                    })
            }
        }
    } catch (error) {
        {res.status(500).json({
            status : "Error",
            result : "Please fill in the appropriate details."
        })}
    }
})

router.get('/user/ticket', userAuth,jsonParser, async ( req, res)=>{
    let email = req.email;
    try {
        const tickets = await Ticket.find({customerEmail:email})
        res.json({
            status : "Success",
            result : tickets
        })
        
    } catch (error) {
        {res.status(500).json({
            status : "Error",
            result : "Please fill in the appropriate details."
        })}  
    }
})

module.exports = router;