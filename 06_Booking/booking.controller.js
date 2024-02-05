const Booking = require('../models/booking');


// Controller for creating a booking
exports.createBooking = async (req, res) => {
    try {
        const { userId, roomId, startDate, endDate } = req.body;
        const booking = new Booking({ userId, roomId, startDate, endDate });
        await booking.save();
        res.status(201).json(booking);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Controller for fetching all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller for fetching bookings by user ID
exports.getBookingsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Booking.find({ userId });
        res.json(bookings);

    } catch (error) { 
       res.status(500).json({ message: error.message });
    }
};


// Controller for updating a booking
exports.updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { startDate, endDate } = req.body;
        // find the booking by ID and update the dates
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { startDate, endDate }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(updatedBooking);

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};


// Controller for canceling a booking
exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        // find the booking by ID and delete it
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking canceled successfully' });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  