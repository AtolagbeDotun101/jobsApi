const express = require('express');

const router = express.Router();

const { getAllJobs, updateJob, createJob, deleteJob, getJob } = require('../controllers/jobs')

router.route('/').post(createJob).get(getAllJobs);

router.route('/:id').patch(updateJob).get(getJob).delete(deleteJob)


module.exports = router