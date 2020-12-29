// THIS SHOULD WORK - it can be cleaned up and such but should work for
//  my porpuses

//this could have some sort of route thing so we did not need to say api or 
// some such not entirely sure need to review
const express = require('express');
const { static } = express;
const path = require('path');

const app = express();

app.use('/dist', static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/schools', async(req, res, next)=> {
  try {
    res.send(await School.findAll({include: Student}));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/schools', async(req, res, next)=> {
    try {
      res.send(await School.createRandomSchool());
    }
    catch(ex){
      next(ex);
    }
  });

app.get('/api/students', async(req, res, next)=> {
    try {
      res.send(await Student.findAll({include: School}));
    }
    catch(ex){
      next(ex);
    }
  });

// not sure if this gets it own file 

const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};


// DATABASE STUFF should be it's own file and then subdivided 
//But this works for now 
const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/acme_db');

const School = conn.define('school', {
  name: STRING 
});

const Student = conn.define('student', {
    name: STRING 
  });

School.hasMany(Student);
Student.belongsTo(School);

School.createRandomSchool = function(){
    return this.create({ name: `${Math.random()} - school`})
}

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Promise.all([
    School.create({ name: 'Moes School' }),
    School.create({ name: 'Larrys School' }),
    School.create({ name: 'Lucys School' })
  ]);

  await Promise.all([
    Student.create({ name: 'One', schoolId: 1 }),
    Student.create({ name: 'Two', schoolId: 1 }),
    Student.create({ name: 'Tree', schoolId: 2 }),
    Student.create({ name: 'Poor', schoolId: 3 }),
    Student.create({ name: 'Pie' }),
    Student.create({ name: 'Six' })

  ]);
};

init();
