import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

//mongoose.connect('mongodb+srv://dbfahad:bharmal786@chatbotalcluster.mpfvc.mongodb.net/mychatapp?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://dbfahad:bharmal786@chatbotalcluster.mpfvc.mongodb.net/mychatapp?retryWrites=true&w=majority',function(){
  console.log("db Connected");
});
  
const User = mongoose.model('student',{
  student_name:String,
  father_name:String,
  age:String,
  dob:Date,
  mobile:String,
  email:String,
  gender:String
});

const Employee = mongoose.model('employee',{
  student_name:String,
  father_name:String,
  age:String,
  roll_no:String,
});


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

app.use((req,res,next)=>{
  console.log("req come");
  next();
});

app.get('/users',(req,res)=>{
  User.find({},(err,users)=>{
    if(!err){
      res.send(users);
    }else{
      res.status(500).send("error");
    }
  })
})

app.get('/user/:id',(req,res)=>{
  User.findOne({_id:req.params.id},(err,user)=>{
    if(!err){
        res.send(user);
    }else{
      res.send(500).send("error")
    }
  })
})

app.post('/user',(req,res)=>{
if(!req.body.student_name ||!req.body.father_name ||!req.body.age 
  ||!req.body.dob ||!req.body.mobile ||!req.body.email ||!req.body.gender){
  res.status(400).send("invalid record");
}else{
  const newUser = new User({
    student_name:req.body.student_name,
    father_name:req.body.father_name,
    age:req.body.age,
    dob:req.body.dob,
    mobile:req.body.mobile,
    email:req.body.email,
    gender:req.body.gender,
  });
  newUser.save().then(()=>{
    console.log("user created");
    res.send("user created");
  })
}
})

app.put('/user/:id',(req,res)=>{
let updateUser={};
if(req.body.student_name){
  updateUser.student_name = req.body.student_name;
}
if(req.body.father_name){
  updateUser.father_name = req.body.father_name;
}
if(req.body.age){
  updateUser.age = req.body.age;
}
if(req.body.dob){
  updateUser.dob = req.body.dob;
}
if(req.body.mobile){
  updateUser.mobile = req.body.mobile;
}
if(req.body.email){
  updateUser.email = req.body.email;
}
if(req.body.gender){
  updateUser.gender = req.body.gender;
}
User.findByIdAndUpdate(req.params.id,updateUser,{new:true},
  (err,data)=>{
    if(!err){
      res.send(data);
    }else{
      res.status(500).send("error");
    }
  })
})

app.delete('/user/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.send("user deleted")
    } else {
      res.status(500).send("error happened")
    }
  })
})

//For Employee //
app.get('/employees',(req,res)=>{
  Employee.find({},(err,employees)=>{
    if(!err){
      res.send(employees);
    }else{
      res.status(500).send("error");
    }
  })
})

app.get('/employee/:id',(req,res)=>{
  Employee.findOne({_id:req.params.id},(err,employee)=>{
    if(!err){
        res.send(employee);
    }else{
      res.send(500).send("error")
    }
  })
})

app.post('/employee',(req,res)=>{
if(!req.body.student_name ||!req.body.father_name ||!req.body.age ||!req.body.roll_no){
  res.status(400).send("invalid record");
}else{
  const newEmployee = new Employee({
    student_name:req.body.student_name,
    father_name:req.body.father_name,
    age:req.body.age,
    roll_no:req.body.roll_no,
  });
  newEmployee.save().then(()=>{
    console.log("Employee created");
    res.send("Employee created");
  })
}
})

app.put('/employee/:id',(req,res)=>{
let updateEmployee={};
if(req.body.student_name){
  updateEmployee.student_name = req.body.student_name;
}
if(req.body.father_name){
  updateEmployee.father_name = req.body.father_name;
}
if(req.body.age){
  updateEmployee.age = req.body.age;
}
if(req.body.roll_no){
  updateEmployee.roll_no = req.body.roll;
}
Employee.findByIdAndUpdate(req.params.id,updateEmployee,{new:true},
  (err,data)=>{
    if(!err){
      res.send(data);
    }else{
      res.status(500).send("error");
    }
  })
})

app.delete('/employee/:id', (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.send("Employee deleted")
    } else {
      res.status(500).send("error happened")
    }
  })
})

app.listen(port,()=>{
  console.log("server is running");
})