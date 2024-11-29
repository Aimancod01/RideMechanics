import express from "express";
const app = express();
import Package from './models/Package.js';
import TourPayment from './models/Payment.js';
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import TourCustomer from './models/TourCustomer.js';
import morgan from "morgan";
import Stripe from 'stripe';
import path from 'path';
import loginRouter from "./routes/loginRouter.js";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import multer from 'multer';
import { createServer } from 'http';
import { Server } from 'socket.io';// var server = app.listen(8810);import io from ('socket.io').listen(server);process.env.PORT ||
//const port =  5000;
//app.listen(port, () => {
//console.log(`Server is running on port ${port}`);});
app.use(cors()); dotenv.config();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
}); server.listen(5000, () => {
  console.log('listening on *:5000');

}); app.use(cors());
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('update-Location', async (data) => {
    const { carId, latitude, longitude } = data;
    const car = await Car.findById(carId);
    if (car) {
      car.currentLocation = { lat: latitude, lng: longitude };
      await car.save();
      io.emit('location-updated', { carId, latitude, longitude });
    }
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});
app.post('/api/update-location/:carId', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Update car location
    car.currentLocation = { lat: latitude, lng: longitude };
    await car.save(); // Emit the updated location to all connected clients
    io.emit('locationUpdate', { carId: req.params.carId, latitude, longitude });
    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.get('/api/car-location-history/:carId', async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json({ locationHistory: car.locationHistory });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Assuming you have a model Car with location data
app.get('/api/car-location/:carId', async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Return the car's current location
    res.status(200).json({
      latitude: car.currentLocation.lat,
      longitude: car.currentLocation.lng
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
import { body, validationResult } from 'express-validator';
import { Driver } from './models/CarRentalForm.js';
const stripe = Stripe('sk_test_51Oh1XhAQEV6haT2dohPx2myX27wvPRPM7XasO0OTjDyUt1OYVcM9INe0NVXgTws5EV8kpg9t2n2zO3kjU3bDnvmj00YyVJUzJv');
dotenv.config();
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", loginRouter);

app.use((err, req, res, next) => {
  const msg = err.message || "something went wrong";
  res.status(500).json({ msg });
}); //const allowedOrigins = ['http://localhost:5173']; // Add your frontend URL hereapp.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  carModel: { type: String, required: true },
  doors: { type: Number, required: true },
  seats: { type: Number, required: true },
  transmission: { type: String, required: true },
  ac: { type: Boolean, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  days: { type: Number, required: true },

  clean: { type: Boolean, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  carNumber: { type: String, required: true },
  image: { type: String, required: true },
  city: { type: String, required: true },
  currentLocation: {
    lat: Number,
    lng: Number,
  },
}); const Car = mongoose.model('Car', carSchema);




app.use('/uploads', express.static('uploads'));

// Configure multer for image upload
const carStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const driverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/drivers/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadCar = multer({ storage: carStorage });
const uploadDriver = multer({ storage: driverStorage });
app.post('/api/drivers', uploadDriver.fields([{ name: 'carImage' }, { name: 'driverImage' }]), [
  body('carName').notEmpty().withMessage('Car name is required'),
  body('carModel').notEmpty().withMessage('Car model is required'),
  body('doors').isInt({ min: 1 }).withMessage('Doors must be a positive integer'),
  body('seats').isInt({ min: 1 }).withMessage('Seats must be a positive integer'),
  body('transmission').isIn(['Auto', 'Manual', 'Electric']).withMessage('Transmission must be Auto, Manual, or Electric'),
  body('ac').isBoolean().withMessage('AC must be a boolean'),
  body('category').isIn(['Economy', 'Luxury', 'Standard', 'Commercial']).withMessage('Category must be one of the specified types'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('days').isInt({ min: 1 }).withMessage('Days must be a positive integer'), body('carNumber').notEmpty().withMessage('carNumber is required'),
  body('theftProtection').isBoolean().withMessage('Theft protection must be a boolean'), body('latitude').notEmpty().withMessage('latitude is required'),
  body('clean').isBoolean().withMessage('Clean must be a boolean'), body('priceRange').notEmpty().withMessage('priceRange is required'),
  body('fullName').notEmpty().withMessage('fullname is required'), body('longitude').notEmpty().withMessage('longitude is required'),
  body('phoneNumber').notEmpty().withMessage('phoneNumber is required'), body('address').notEmpty().withMessage('address is required'), body('cnic').notEmpty().withMessage('CNIC is required'),
  body('driverPrice').isFloat({ min: 0 }).withMessage('Driver price must be a positive number'),], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newDriver = new Driver({
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        cnic: req.body.cnic,
        driverPrice: parseFloat(req.body.driverPrice),
        car: {
          carName: req.body.carName, carModel: req.body.carModel,
          doors: parseInt(req.body.doors, 10),
          seats: parseInt(req.body.seats, 10),
          transmission: req.body.transmission,
          ac: req.body.ac === 'true',
          category: req.body.category,
          price: parseFloat(req.body.price),
          days: parseInt(req.body.days, 10),
          theftProtection: req.body.theftProtection === 'true',
          clean: req.body.clean === 'true',
          image: req.files['carImage'] ? req.files['carImage'][0].path : '',
        },

        image: req.files['driverImage'] ? req.files['driverImage'][0].path : '',
      }); const savedDriver = await newDriver.save();
      res.status(201).json(savedDriver);
    } catch (error) {
      console.error('Error saving driver:', error);
      res.status(500).json({ message: 'Error saving driver', error });
    }
  });
const pickDropSchema = new mongoose.Schema({
  city: {
    type: String, required: true

  }, pickupDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  dropoffDate: { type: Date, required: true },
  dropoffTime: { type: String, required: true },

  // Add other necessary fields...
}); const CarPickDrop = mongoose.model('PickDrop', pickDropSchema);
app.post('/api/cars', async (req, res) => {
  const { days, city } = req.body;
  try {
    const cars = await Car.find({ days: days, city: city });
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).send('Server error');
  }
});

// Update driver details
app.post('/api/pickdrop', async (req, res) => {

  const { city, pickupDate, pickupTime, dropoffDate, dropoffTime } = req.body;
  if (!city || !pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const newpickDrop = new CarPickDrop({
      city,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
    });
    const savedPickDrop = await newpickDrop.save();
    res.status(201).json(savedPickDrop);
  } catch (error) {
    console.error('Error searching cars:', error);
    res.status(500).json({ message: 'Error searching cars: ', error });
  }
}); app.get('/api/pickdrop', async (req, res) => {
  try {
    const pickDropData = await CarPickDrop.find();
    res.json(pickDropData);
  } catch (error) {
    console.error('Error fetching pick and drop details:', error);
    res.status(500).json({ message: 'Error fetching pick and drop details', error });
  }
});
app.put('/api/drivers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(updatedDriver);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Delete driver
app.delete('/api/drivers/:id', async (req, res) => {

  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({ message: 'Driver deleted successfully' });
  } catch (err) {
    console.error('Error deleting driver:', err.message);
    res.status(500).send({ message: 'Error deleting driver', error });
  }
});

app.get('/api/drivers', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ message: 'Error fetching drivers', error });
  }
}); io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// API endpoint to create a car rental entry
app.post('/api/cars', uploadCar.single('image'),
  async (req, res) => {
    try {
      const { carName, carModel, doors, seats, transmission, ac, category, price, days, theftProtection, clean, latitude, longitude, carNumber, city } = req.body;
      const image = req.file ? req.file.path : null; // File path from multer
      // Validate presence of required fields
      if (!carName || !carModel || !doors || !seats || !transmission || !category || !price || !days || !latitude || !longitude || !carNumber || !city) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newCar = new Car({
        carName,
        carModel,
        doors,
        seats,
        transmission,
        ac,
        category,
        price,
        days,
        theftProtection,
        clean,
        latitude,
        longitude,
        carNumber,
        image,
        city,
        currentLocation: { lat: latitude, lng: longitude },

      });
      await newCar.save();
      res.status(201).json({ message: 'Car added successfully', newCar });
    } catch (error) {
      console.error('Error saving car:', error);
      res.status(500).json({ message: 'Error saving car', error });
    }
  });// API endpoint to fetch car rental data
// Endpoint to update car location (simulate GPS updates)
app.post('/api/update-location', async (req, res) => {
  const { carId, lat, lng } = req.body;

  try {
    await Car.findByIdAndUpdate(carId, { currentLocation: { lat, lng } });
    const car = await Car.findById(carId);

    io.emit('locationUpdate', { carId: car._id, location: car.currentLocation });

    res.status(200).json({ success: true, currentLocation: car.currentLocation });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).send(cars);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.delete('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.status(200).send('Car deleted successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
}); app.put('/api/cars/:id', uploadCar.single('image'), async (req, res) => {
  try {
    const carId = req.params.id;
    console.log(carId)
    const updates = req.body;
    if (req.files) {
      // Handle file upload if necessary
      updates.image = req.file.path;
      // Save file and get URL or path
      // Add image URL to updates
    }

    const updatedCar = await Car.findByIdAndUpdate(carId, updates, { new: true });
    if (!updatedCar) return res.status(404).send('Car not found');
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update car', error });
  }
}); app.get('/api/cars/cars', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const cars = await Car.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCars = await Car.countDocuments();

    res.status(200).json({
      totalCars,
      totalPages: Math.ceil(totalCars / limit),
      currentPage: parseInt(page),
      cars,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/api/car/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).send({ message: 'Car not found' });
    }
    res.status(200).send(car);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).send({ message: 'An unexpected error occurred', error: err });
});
const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  cnic: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true }, address: { type: String, required: true }, carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true }
});

const Customer = mongoose.model('Customer', customerSchema);
app.post('/api/customers', async (req, res) => {
  const { fullName, cnic, email, contactNumber, address, carId } = req.body;

  // Perform server-side validation if needed
  // Example: validateRequest(req.body);

  try {
    // Save customer data to MongoDB using Mongoose or any MongoDB driver
    const newCustomer = new Customer({ fullName, cnic, email, contactNumber, address, carId });
    await newCustomer.save();
    res.status(201).json({ message: 'Customer data saved successfully' });
  } catch (error) {
    console.error('Error saving customer data:', error);
    res.status(500).json({ message: 'Failed to save customer data' });
  }
});// Example route to fetch customer data from MongoDB
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find(); // Assuming 'Customer' is your Mongoose model
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/create-checkout-session', async (req, res) => {
  const { amount, email } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Car Rental',
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: ' http://localhost:5000/success.html',
    cancel_url: 'http://localhost:5000/cancel.html',
  });

  res.json({ id: session.id });
}); app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'Gmail', host: 'smtp.gmail.email', port: 465,//587
      secure: true,
      auth: {
        user: 'cartooncraze302@gmail.com',
        pass: 'ixzt khsu twkh ctnz',
      },
    });

    const mailOptions = {
      from: 'cartooncraze302@gmail.com',
      to: email,
      subject: 'Payment Confirmation',
      text: `Your payment of $${amount / 100} was successful.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}); app.post('/api/payment', async (req, res) => {
  const { amount, paymentMethodId, car, customer } = req.body;
  if (!amount || !paymentMethodId || !car || !customer) {
    console.error('Missing required fields', { amount, paymentMethodId, car, customer });
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'pkr',
      payment_method: paymentMethodId, description: `Payment for ${car.carName} by ${customer.fullName}`,
      confirm: true, payment_method_types: ['card'],
    });

    // Save booking details to your database here if necessary
    const transporter = nodemailer.createTransport({
      service: 'Gmail', host: 'smtp.gmail.email', port: 587,
      auth: {
        user: 'umar1466088@gmail.com',
        pass: 'vawj nujs lbfr auda',
      },
    });

    const mailOptions = {
      from: 'umar1466088@gmail.com',
      to: customer.email,
      subject: 'Payment Confirmation',
      text: `Dear ${customer.fullName},

      Thank you for booking with us! We are excited to confirm your reservation for the ${car.carName}.
      Your payment of Rs${amount / 100} has been successfully processed. Here are the details of your booking:
      
      
      - **Car Name**: ${car.carName}
      - **Car Model**: ${car.carModel}
      - **Car Number**: ${car.carNumber}


      We look forward to providing you with a smooth and enjoyable experience. If you have any questions, feel free to contact us.
      Best regards,  
      Explore Ride Mechanics
      
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(400).json({ error: error.message, stripeError: error });
  }
}); app.get('/api/cars/:carId', async (req, res) => {
  const { carId } = req.params;
  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(carId)) {
    console.error('Invalid carId format', { carId });
    return res.status(400).json({ error: 'Invalid carId format' });
  }

  try {
    const car = await Car.findById(carId);
    if (!car) {
      console.error('Car not found', { carId });
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ currentLocation: car.currentLocation });
  } catch (error) {
    console.error('Error fetching car location:', error);
    res.status(500).json({ error: 'Server error' });
  }
}); io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('subscribeToLocation', ({ carId }) => {
    if (carId && mongoose.Types.ObjectId.isValid(carId)) {
      socket.join(carId); console.log(`Subscribed to car location: ${carId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// Store rooms
const rooms = {};

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Join a room based on rentalId
  socket.on('joinRoom', (rentalId) => {
    socket.join(rentalId);
    console.log(`${socket.id} joined room ${rentalId}`);
  });

  // Listen for messages
  socket.on('sendMessage', ({ rentalId, message, sender }) => {
    io.to(rentalId).emit('receiveMessage', { message, sender });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
}); const reviewSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, },
  customerId: { type: mongoose.Schema.Types.ObjectId, },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}); const Review = mongoose.model('Review', reviewSchema);
app.post('/api/submit-review', async (req, res) => {
  const { carId, customerId, rating, comment } = req.body;

  if (!carId || !customerId || !rating || !comment) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  // Ensure rating is a valid number between 1 and 5
  if (isNaN(rating) || rating < 1 || rating > 5) {
    console.error('Invalid rating value', { rating });
    return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
  }
  try {
    const review = new Review({ carId, customerId, rating, comment });
    await review.save();
    res.status(200).json({ success: true, });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});// Endpoint to get reviews for a car
app.get('/api/reviews/:carId', async (req, res) => {
  const { carId } = req.params;

  try {
    const reviews = await Review.find({ carId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});// In your Node.js/Express server

// Route to handle storing booking data
const bookingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car', // Reference to Car model
    required: true
  },
  customer: {
    fullName: String,
    cnic: String,
    email: String,
    contactNumber: String,
    address: String,
    carId: String
  },
  paymentId: { type: String, required: true },
  date: { type: Date, default: Date.now }
}); const Booking = mongoose.model('Booking', bookingSchema);
app.get('/api/bookings/customer/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ 'customer.email': email }).populate('car');
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for this customer' });
    } const validBookings = bookings.filter((booking) => booking.car !== null);
    res.json(validBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    console.log('customer')
    const { car, customer, paymentId } = req.body;

    console.log(customer)
    const newBooking = new Booking({
      car,
      customer,//: customer._id
      paymentId,
      date: new Date(),
    });
    await newBooking.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ success: false });
  }
});

// Route to fetch all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json([]);
  }
});

app.get('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('car'); // Populate car details
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Daily report
app.get('/api/reports/daily', async (req, res) => {
  try {
    const dailyBookings = await Booking.aggregate([
      {
        $lookup: {
          from: 'cars', // The name of the Car collection in the database
          localField: 'car',
          foreignField: '_id',
          as: 'carDetails'
        }
      }, { $unwind: '$carDetails' }, // Unwind the array to use individual car objects
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' }
          },
          bookings: { $sum: 1 },
          totalRevenue: { $sum: '$carDetails.price' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } }
    ]);

    res.json(dailyBookings);
  } catch (error) {
    console.error('Error fetching daily report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Monthly report
app.get('/api/reports/monthly', async (req, res) => {
  try {
    const monthlyBookings = await Booking.aggregate([
      {
        $lookup: {
          from: 'cars',
          localField: 'car',
          foreignField: '_id',
          as: 'carDetails'
        }
      },
      { $unwind: '$carDetails' },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          bookings: { $sum: 1 },
          totalRevenue: { $sum: '$carDetails.price' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.json(monthlyBookings);
  } catch (error) {
    console.error('Error fetching monthly report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const MaintenanceScheduleSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },

  maintenanceDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  notificationSent: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
const Maintenance = mongoose.model('Maintenance', MaintenanceScheduleSchema);
// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: 'gmail', host: 'smtp.gmail.email', port: 465,
  auth: {
    user: 'umar1466088@gmail.com',
    pass: 'vawj nujs lbfr auda',
  }
});// Middleware to check for upcoming maintenance
const checkMaintenance = async (req, res, next) => {
  try {
    const today = new Date();
    const schedules = await Maintenance.find({
      maintenanceDate: { $gte: today },
      notificationSent: false
    }).populate('carId');

    for (const schedule of schedules) {
      const car = schedule.carId;
      const users = await User.find();

      const subject = 'Upcoming Maintenance Notification';
      const text = `The car ${car.carName} (${car.carModel}) is scheduled for maintenance on ${schedule.maintenanceDate}.`;

      // Send email to all users
      for (const user of users) {
        const mailOptions = {
          from: 'umar1466088@gmail.com',
          to: user.email,
          subject,
          text
        };
        try {
          await transporter.sendMail(mailOptions);
        } catch (emailError) {
          console.error(`Error sending email to cartooncraze302@gmail.com:`, emailError);
        }
      }

      // Update notification statususer.email
      schedule.notificationSent = true;
      await schedule.save();
    }

    next();
  } catch (error) {
    console.error('Error checking maintenance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; app.use('/api/maintenance', checkMaintenance); // Adjust as needed
// Routes
// app.use(checkMaintenance);
// Create a maintenance schedule
app.post('/api/maintenance', async (req, res) => {
  const { carId, maintenanceDate, description } = req.body;

  try {
    const newSchedule = new Maintenance({ carId, maintenanceDate, description });
    await newSchedule.save();
    // Send email notification on creation
    const users = await User.find();

    // Email subject and text
    const subject = 'New Maintenance Scheduled';
    const text = `A new maintenance schedule has been created for car ID: ${carId} on ${new Date(maintenanceDate).toLocaleDateString()}. Description: ${description}`;
    for (const user of users) {
      const mailOptions = {
        from: 'umar1466088@gmail.com',
        to: user.email, // Send to the user's email
        subject,
        text,
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully  to ${user.email}`);
      } catch (error) {
        console.error('Error sending email on creation:', error);
      }
    }
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error('Error creating maintenance schedule:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all maintenance schedules
app.get('/api/maintenance', async (req, res) => {
  try {
    const schedules = await Maintenance.find().populate('carId', 'carName carModel carNumber');
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a maintenance schedule
app.put('/api/maintenance/:id', async (req, res) => {
  const { id } = req.params;
  const { maintenanceDate, description } = req.body;

  try {
    const schedule = await Maintenance.findByIdAndUpdate(id,
      { maintenanceDate, description }, { new: true } // Return the updated document
    ).populate('carId');

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Send email notification for the updated maintenance schedule
    const car = schedule.carId;
    const users = await User.find(); // Fetch users if needed

    const subject = 'Maintenance Schedule Updated';
    const text = `The maintenance for car ${car.carName} (${car.carModel}) has been updated to ${maintenanceDate}.`;

    for (const user of users) {
      const mailOptions = {
        from: 'umar1466088@gmail.com',
        to: user.email, // Use the user's email from the database
        subject,
        text,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${user.email}`);
      } catch (emailError) {
        console.error(`Error sending email to ${user.email}:`, emailError);
      }
    }



    res.status(200).json(schedule);

  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a maintenance schedule
app.delete('/api/maintenance/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Maintenance.findByIdAndDelete(id);
    res.status(200).json({ message: 'Maintenance schedule deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

// Serve static files from the uploads folder


const upload = multer({ storage: storage });

app.use('/uploads/package/', express.static('uploads'));

// POST route to handle form submission
app.post('/api/packages', upload.single('picture'), async (req, res) => {
  try {
    console.log('Received file:', req.file); // Debugging the file upload
    console.log('Request body:', req.body); // Debugging the body data

    const { packageName, description, price, departureDate, departureTime, arrivalDate, arrivalTime, location } = req.body;


    const newPackage = new Package({
      packageName,
      description,
      price,
      departureDate: new Date(departureDate),
      departureTime,
      arrivalDate: new Date(arrivalDate),
      arrivalTime,
      location,
      picture: req.file ? req.file.filename : null, // Store filename of the uploaded picture
    });



    await newPackage.save();
    res.status(201).json({ message: 'Package uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading package' });
  }
});


// GET route to fetch all packages
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await Package.find(); // Fetch all packages
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching packages' });
  }
});



// Fetch specific package by ID
app.get('/api/packages/:id', async (req, res) => {
  try {
    const packageId = req.params.id;
    const getPackage = await Package.findById(packageId);

    if (!getPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json(getPackage);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching package' });
  }
});





// Update specific package by ID
app.put('/api/packages/:id', upload.single('picture'), async (req, res) => {
  try {
    const packageId = req.params.id;
    const updatedData = {
      packageName: req.body.packageName,
      price: req.body.price,
      date: req.body.date,
      timing: req.body.timing,
      carInfo: {
        carName: req.body.carName,
        model: req.body.model,
        color: req.body.color,
        seater: req.body.seater,
      },
    };

    // Handle picture upload
    if (req.file) {
      updatedData.picture = req.file.filename; // Store the new picture filename
    }

    const updatedPackage = await Package.findByIdAndUpdate(packageId, updatedData, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ error: 'Error updating package' });
  }
});




// Delete specific package by ID
app.delete('/api/packages/:id', async (req, res) => {
  try {
    const packageId = req.params.id;
    const deletedPackage = await Package.findByIdAndDelete(packageId);

    if (!deletedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Optionally, delete the associated image file from the filesystem
    const picturePath = path.join(__dirname, 'uploads', deletedPackage.picture);
    fs.unlink(picturePath, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
      }
    });

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting package' });
  }
});
app.get('/api/search', async (req, res) => {
  try {
    const { search } = req.query;

    // Construct search filters
    const filters = {};
    if (search) {
      const regex = new RegExp(search, 'i');
      filters.$or = [
        { packageName: regex },
        { price: { $gte: parseInt(search), $lte: parseInt(search) + 1000 } }, // Search for price range
      ];; // Case-insensitive search
    }


    const packages = await Package.find(filters);
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/tourCustomer', async (req, res) => {
  try {
    const { firstName, lastName, email, cnic, address, packageId } = req.body;

    // Validate packageId
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ error: 'Invalid package ID' });
    }

    // Find the selected package
    const selectedPackage = await Package.findById(packageId);
    if (!selectedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Create a new customer document
    const newCustomer = new TourCustomer({
      firstName,
      lastName,
      email,
      cnic,
      address,
      package: packageId,
    });

    // Save the customer to the database
    await newCustomer.save();

    // Respond with the new customer's data
    res.status(201).json({
      message: 'Customer information saved successfully!',
      newCustomer, // Include the full customer object
    });
  } catch (error) {
    console.error('Error saving customer:', error);
    res.status(500).json({ error: 'Error saving customer information' });
  }
});
app.get('/api/tourCustomer/:id', async (req, res) => {
  try {
    const tourCustomer = req.params.id;
    const tourCustomerData = await TourCustomer.findById(tourCustomer);

    if (!tourCustomerData ) {
      return res.status(404).json({ error: 'tourCustomerData not found' });
    }

    res.status(200).json(tourCustomerData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tourCustomerData' });
  }
});

app.post("/api/tour-package-payment", async (req, res) => {
  try {
    const { amount, customerName, customerEmail } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
      receipt_email: customerEmail,  description: `Payment for ${customerName}`,
    });
    const transporter = nodemailer.createTransport({
      service: 'Gmail', host: 'smtp.gmail.email', port: 587,
      auth: {
        user: "umar1466088@gmail.com",
        pass: "hmha agbk ntmq ogty",
      },
    });

    const mailOptions = {
      from: "umar1466088@gmail.com",
      to: customerEmail,
      subject: "Payment Confirmation",
      text: `Dear ${customerName},\n\nYour payment of $${amount / 100} was successful. Thank you for choosing our service!\n\nBest regards,\nYour Company`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ clientSecret: paymentIntent.client_secret, paymentId: paymentIntent.id });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
}); app.post("/api/save-payment", async (req, res) => {
  const { customerId, paymentId, packageId, quantity, totalPrice } = req.body;

  try {  // Find the customer
    const customer = await TourCustomer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }
    const paymentRecord = new TourPayment({
      customerId,
      paymentId,
      packageId,
      quantity,
      totalPrice,
    });

    await paymentRecord.save();

    res.status(201).json({ message: "Payment saved successfully!" });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ error: "Failed to save payment" });
  }
});
// Assuming you have a "TourPayment" model in your MongoDB


app.get("/api/payments/:id", async (req, res) => {
    try {
        const payment = await TourPayment.findById(req.params.id).populate('customerId packageId');
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payment data", error: error.message });
    }
});

try {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB connected')).catch((err) => console.log('MongoDB connection error:', err));

} catch (error) {
  console.log(error);
}