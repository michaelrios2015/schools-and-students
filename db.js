// DATABASE STUFF should be it's own file and then subdivided 
//But this works for now 
const Sequelize = require('sequelize');
const { STRING, FLOAT, TEXT } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/acme_db');

const School = db.define('school', {
  name: { 
    type: STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    } 
  },
  address:  { 
    type: STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    } 
  },
  description: TEXT 
});

const Student = db.define('student', {
  name: { 
    type: STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    } 
  },
  email:  { 
    type: STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
        isEmail: true 
    }    
  },
  gpa:{
    type: FLOAT,
    allowNull: true,
    validate: {
        min: 0,
        max: 4
    }
  }
});


module.exports = {
    // Include your models in this exports object as well!
    db,
    models: {
      Student,
      School,
    }
  }
