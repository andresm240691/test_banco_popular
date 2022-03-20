const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'admin',
    password:'admin',
    database:'bbk_popular',
    port: '5433'
});

// Passenger
const getPassengers = async(req,res) =>{
    /*
        Optener una  lista de todos los pasajeros
    */
    const response = await pool.query('SELECT * FROM passenger');
    res.json(response.rows);
}

const getPassengerById = async(req, res) =>{
    /*
        Optener un pasajero por el ID
    */
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM passenger WHERE id= $1',[id]);
    res.status(200).json(response.rows);
};

const getNearbyDrivers = async(req, res) =>{
    /*
        Para un pasajero solicitando un viaje, obtenga una 
        lista de los 3 conductores mas cercanos al punto de partida.
        Nota: Se asumio que el punto de partida son las corrdenas del apsajero.
    */ 
    const id = req.params.id;
    const driversQuery = await pool.query('SELECT * FROM driver');
    const passengersQuery = await pool.query('SELECT * FROM passenger WHERE id= $1',[id]);
    let passenger = passengersQuery.rows;
    let drivers = driversQuery.rows;
    if(passenger.length > 0){
        passenger = passenger[0];
        //calculate distance between passanger than drivers
        drivers.forEach((item, index) =>{
            let distance = Math.sqrt((Math.pow((parseFloat(item.x_axis) - parseFloat(passenger.x_axis)),2) + Math.pow((parseFloat(item.y_axis) - parseFloat(passenger.y_axis)),2)));
            item['distance'] = distance;
        });  
        //sort by least distance
        drivers.sort((a,b) =>{
            if (a.distance < b.distance) {
                return -1;
            }
            if (a.distance > b.distance) { 
                return 1;
            }
            return 0;
        });    
        res.json(drivers.slice(0,3));
    }else{
        res.json({"message": "Passenger not exist"});
    }
};

// Driver
const getDrivers = async(req,res) =>{
    /*
        Optener una  lista de todos los conductores
    */
    const response = await pool.query('SELECT * FROM driver');
    res.json(response.rows);
}

const getDriverrById = async(req, res) =>{
    /*
        Optener un conductor por el ID
    */
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM driver WHERE id= $1',[id]);
    res.status(200).json(response.rows);
};

//Travel
const getTravelActive = async(req, res) =>{
    /*
        Obtenga una lista de todos los viajes activos
    */
    let responseStatus = await pool.query('SELECT * FROM status WHERE description ILIKE $1',['%active%']);
    responseStatus = responseStatus.rows[0];
    const response = await pool.query('SELECT * FROM travel WHERE status_id= $1',[responseStatus.id]);
    res.status(200).json(response.rows);
};

const createTravel = async(req, res) =>{
    /*
        Crear una nua solcicitud de viaje asignando un conductor a un pasajero
    */
    try{
        const {driver_id, passenger_id} = req.body;
        let passenger = await pool.query('SELECT * FROM passenger WHERE id= $1',[passenger_id]);
        if(passenger.rows.length == 0)
            res.status(400).json({'message': "El ID del pasajero no existe"});
        let driver  = await pool.query('SELECT * FROM driver WHERE id= $1',[driver_id]);
        if(driver.rows.length == 0)
            res.status(400).json({'message': "El ID del viajero no existe"});
        let responseStatus = await pool.query('SELECT * FROM status WHERE description ILIKE $1',['%active%']);
        let status_id = responseStatus.rows[0].id;
        await pool.query('INSERT INTO travel (passenger_id, driver_id, status_id) VALUES ($1, $2, $3)', [passenger_id, driver_id, status_id]);
        res.status(200).json({ "message": "Travel Created"});
    }catch(error){
        res.status(400).json({'message': error.message})
    }
}

const updateTravel = async(req, res) =>{
    /*
        Completar un viaje
    */
    try{
        let travel_id = req.params.id;
        let statusComplete = await pool.query('SELECT * FROM status WHERE description ILIKE $1',['%completed%']);
        statusComplete = statusComplete.rows[0];
        let statusActive = await pool.query('SELECT * FROM status WHERE description ILIKE $1',['%active%']);
        statusActive = statusActive.rows[0];
        const response = await pool.query('UPDATE travel SET status_id=$1 WHERE status_id= $2 AND id= $3',[
            statusComplete.id, 
            statusActive.id,
            travel_id
        ]);
        res.json({"message": "Travel Update"})
    }catch(error){
        res.status(400).json({'message': error.message})
    }
};


module.exports = {
    getPassengers,
    getPassengerById,
    getDrivers,
    getDriverrById,
    getNearbyDrivers,
    getTravelActive,
    createTravel,
    updateTravel
};