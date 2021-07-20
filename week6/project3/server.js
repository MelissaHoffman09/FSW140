const express = require('express');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql');
const PORT = 5500;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'registry'
    }
);

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Successful MySQL Database Connection');
});

// Create Database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE registry';
    // execute sql query
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('registry Database Created Successfully!');

    })
})

// Create New Table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE items (id INT AUTO_INCREMENT, title VARCHAR(50), description VARCHAR(300), imageURL VARCHAR(300), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('items table successfully created');
    })
})

// Insert a new record
app.get('/insertitem1', (req, res) => {
    let item = {title: 'Jogging Stoller', description: 'stroller that keeps baby safe in any terrain', 
    imageURL: 'https://target.scene7.com/is/image/Target/GUEST_f6af6959-12d4-4a1f-9c5b-4974e0dfbd3e?qlt=85&fmt=&hei=325&wid=325'};
    let sql = 'INSERT INTO items SET ?'
    db.query(sql, item, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('item 1 inserted successfully');
    })
})

app.get('/insertitem2', (req, res) => {
    let item = {title: 'Crib', description: 'A safe crib that grows with your baby from infancy to toddler years', 
    imageURL: 'https://images.pexels.com/photos/2253894/pexels-photo-2253894.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'};
    let sql = 'INSERT INTO items SET ?'
    db.query(sql, item, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('item 2 inserted successfully');
    })
})

// GET all items
app.get('/getitems', (req, res) => {
    let sql = 'SELECT * FROM items';
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    })
})

// GET one item
app.get('/getitems/:id', (req, res) => {
    let sql = `SELECT * FROM items WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(result);

    })
})

// UPDATE
app.get('/updateitemtitle/:id', (req, res) => {
    const newTitle = 'Title has changed';
    let sql = `UPDATE items SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('UPDATE command has successfully executed');
    })
})

app.get('/updateitemdescription/:id', (req, res) => {
    const newdescription = 'Description item has changed';
    let sql = `UPDATE registry SET description = '${newdescription}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('UPDATE command has successfully executed');

    })
})


// DELETE
app.get('/deleteitem/:id', (req, res) => {
    let sql = `DELETE FROM items WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('DELETE command successfully executed');

    })
})

// Error Handling
app.use((err, req, res, next) => {
    return res.send({errMsg: err.message});
});

// Listen
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})