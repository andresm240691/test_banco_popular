# README #

Technical test

### Base Requeriments ###

* PostgreSQL v14
* Node JS  v10.19.0

### 1) Install Postgres SQl in Linux
    sudo apt update
    sudo apt install postgresql

### 2) Create DB in PostgreSQL ###
    sudo su - postgres
    psql
    postgres=# CREATE USER admin WITH PASSWORD '<str_password>';
    postgres=# CREATE DATABASE bbk_popular;
    postgres=# GRANT ALL PRIVILEGES ON DATABASE admin to bbk_popular;
   

### 3) Load fixtures data ###
    # Run following script
    ../databse/database.sql

### 4) Install requirements ###
    
    npm install

### 5) Run the project ###

    npm run dev


## Services

* It has been attached to the collection of calls to services. You can use Postman or Insomnia as a REST client

        -------------------------------------------------------------------------------------------------------------------------------------
        Method | Name       | Parameters            | Question
        -------------------------------------------------------------------------------------------------------------------------------------
        GET    | pasenger   |                       |Optener una  lista de todos los pasajeros
        -------------------------------------------------------------------------------------------------------------------------------------
        GET    | pasenger   |  id                   |Optener un pasajero por el ID
        -------------------------------------------------------------------------------------------------------------------------------------
        GET    | pasenger   | id  (ID del pasajero) |Para un pasajero solicitando un viaje, una 
            |            |                       |lista de los 3 conductores mas cercanos al punto de partida.
        ------------------------------------------------------------------------------------------------------------------------------------
        GET    | driver     |                       |Optener una  lista de todos los conductores
        ------------------------------------------------------------------------------------------------------------------------------------
        GET    | driver     |  id                   |Optener un conductor por el ID
        ------------------------------------------------------------------------------------------------------------------------------------
        GET   | travel    |                        |Obtenga una lista de todos los viajes activos
        ------------------------------------------------------------------------------------------------------------------------------------
        POST  | travel    |                        |Crear una nua solcicitud de viaje asignando un conductor a un pasajero
        ------------------------------------------------------------------------------------------------------------------------------------
        PUT   | travel    |   id                   |Completar un viaje





### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact