const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
   company: {
        type: String,
        required: [true, 'please provide company name'],
        maxlength:50
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status:{
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default:'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:[true,'please provide user']
   } 
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)