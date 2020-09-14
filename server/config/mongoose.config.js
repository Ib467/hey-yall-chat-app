const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});