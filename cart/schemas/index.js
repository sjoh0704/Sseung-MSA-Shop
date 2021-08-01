const mongoose = require('mongoose');

const connect = () => {
    mongoose
      .connect("mongodb://172.17.0.3/db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ignoreUndefined: true
      })
      .then(()=>{
          console.log('Mongodb connection success')
      })
      .catch(err => console.log(err))
  
  };
  mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
  });
  
  module.exports = connect;