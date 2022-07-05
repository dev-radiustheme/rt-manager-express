const mongoose = require('mongoose');
const dbConfig = require('./dbConfig');

mongoose.connect(dbConfig.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, res) => {
    console.log('mongodb connected')
});