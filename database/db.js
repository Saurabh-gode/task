const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connected')
}).catch((e)=>{
    console.log('no connection' , e)
})