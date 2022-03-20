const {Router} = require('express');
const router = Router();
const {
    getPassengers,
    getPassengerById,
    getDrivers,
    getDriverrById,
    getNearbyDrivers,
    getTravelActive,
    createTravel,
    updateTravel
} = require('../controllers/index.controller')

//Paseenger
router.get('/passenger', getPassengers);
router.get('/passenger/:id', getPassengerById);
router.get('/passenger/drivers/:id', getNearbyDrivers);

//Driver
router.get('/driver', getDrivers);
router.get('/driver/:id', getDriverrById);

//Travel
router.get('/travel', getTravelActive);
router.post('/travel', createTravel);
router.put('/travel/:id', updateTravel);


module.exports = router;
