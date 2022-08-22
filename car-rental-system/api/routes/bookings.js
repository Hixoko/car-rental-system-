const router =require("express").Router();
const Booking = require("../models/Booking");

//Add booking
router.post("/add", async (req,res) => {
    const newBooking = new Booking(req.body);
    try{
        const bookingcount = await Booking.count()
        newBooking.booking_id = 'B00' + (parseInt(bookingcount)+1)
        try{
            const booking = await newBooking.save();
            res.status(200).json(booking);
        } catch (err){
            res.status(500).json(err);
        }
    }catch(err){
        console.log(err);
    }
});

//Get all bookings
router.get("/", async(req,res) => {
    const book_id = req.query.booking_id;
    try{
        let bookings;
        if(book_id) {
            bookings = await Booking.find({ booking_id });
        } else {
            bookings = await Booking.find();
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//Get one booking
router.get("/:booking_id", async(req,res) => {
    try{
        const booking = await Booking.findOne({ 'booking_id':req.params.booking_id });
        res.status(200).json(booking);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;