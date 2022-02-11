const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/game-blog', {
    useUnifedTopology: true
});

