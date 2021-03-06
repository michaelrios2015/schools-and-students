// THIS SHOULD WORK - it can be cleaned up and such but should work for
//  my porpuses

//this could have some sort of route thing so we did not need to say api or 
// some such not entirely sure need to review
const express = require('express');
const { static } = express;
const path = require('path');

const app = express();
app.use(express.json());

app.use('/dist', static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

//gets all schools
app.get('/api/schools', async(req, res, next)=> {
  try {
    res.send(await School.findAll({include: Student}));
  }
  catch(ex){
    next(ex);
  }
});

//get a school
app.get('/api/schools/:id', async(req, res, next)=> {
  try {
    res.send(await School.findByPk(req.params.id, {include: Student}));
  }
  catch(ex){
    next(ex);
  }
});

// creates school
app.post('/api/schools', async(req, res, next)=> {
    try {
      res.status(201).send(await School.create(req.body));
    }
    catch(ex){
      next(ex);
    }
  });

//deletes school 
app.delete('/api/schools/:id', async(req, res, next)=> {
    try {
      const school = await School.findByPk(req.params.id);
      await school.destroy();
      res.sendStatus(204);
    }  
    catch(ex){
      next(ex);
    }
});

//Update school
app.put('/api/schools/:id', async(req, res, next)=> {
  try {
    const school = await School.findByPk(req.params.id, {include: Student});
    res.send(await school.update(req.body));
  }  
  catch(ex){
    next(ex);
  }
});

//Gets all students
app.get('/api/students', async(req, res, next)=> {
    try {
      res.send(await Student.findAll({include: School}));
    }
    catch(ex){
      next(ex);
    }
});

//Gets a students
app.get('/api/students/:id', async(req, res, next)=> {
  try {
    console.log('get a student')
    res.send(await Student.findByPk(req.params.id, {include: School}));
    //could use an error hangel if statement
  }
  catch(ex){
    next(ex);
  }
});

//Create student
app.post('/api/students', async(req, res, next)=> {
    try {
      res.status(201).send(await Student.create(req.body, {include: School}));
    }
    catch(ex){
      next(ex);
    }
});

//delete student
app.delete('/api/students/:id', async(req, res, next)=> {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  }  
  catch(ex){
    next(ex);
  }
});

//Update student
app.put('/api/students/:id', async(req, res, next)=> {
  try {
    let student = await Student.findByPk(req.params.id);
    student = await student.update(req.body);
    console.log(student);
    student = await Student.findByPk(req.params.id, {include: School});
    res.send(student);
  }  
  catch(ex){
    next(ex);
  }
});


//final error catcher 
app.use((err, req, res, next)=>{
  res.status(500).send({ error:err });
});

// not sure if this gets it own file 

const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3001;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

const { db, models: { Student, School } } = require('./db');

// DATABASE STUFF should be it's own file and then subdivided 
//But this works for now 
/*const Sequelize = require('sequelize');
const { STRING, FLOAT, TEXT } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/acme_db');

const School = conn.define('school', {
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

const Student = conn.define('student', {
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
*/
School.hasMany(Student);
Student.belongsTo(School);

// School.createRandomSchool = function(){
//     return this.create({ name: `${Math.random()} - school`})
// }

const syncAndSeed = async()=> {
  await db.sync({ force: true });
  await Promise.all([
    School.create({ name: 'Moes School', address: '111 One Way', description: 'too coool!!!' }),
    School.create({ name: 'Larrys School', address: '222 One Way', description: 'three coool!!!' }),
    School.create({ name: 'Lucys School', address: '333 One Way', description: 'for coool!!!' })
  ]);

  await Promise.all([
    Student.create({ name: 'One', email: 'email@email.com', gpa: '2', schoolId: 1 }),
    Student.create({ name: 'Two', email: 'email2@email.com', gpa: '2.5', schoolId: 1 }),
    Student.create({ name: 'Tree', email: 'email3@email.com', gpa: '3', schoolId: 2 }),
    Student.create({ name: 'Poor', email: 'email4@email.com', gpa: '3.5', schoolId: 3 }),
    Student.create({ name: 'Pie', email: 'email5@email.com' }),
    Student.create({ name: 'Six', email: 'email6@email.com' })

  ]);
};

init();
