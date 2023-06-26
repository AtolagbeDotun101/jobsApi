const Job = require('../models/Job')
const{StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors')
const { isValidObjectId } = require('mongoose')

const getAllJobs = async (req, res) => {
const jobs =await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const jobs = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({jobs})
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    
    const jobs = await Job.findOne({ _id: jobId, createdBy: userId })

    if (!jobs) {
        throw new NotFoundError(`NO JOB WITH ID ${jobId}`)
    } 
        res.status(StatusCodes.OK).json({ jobs })
}

const updateJob = async (req, res) => {
    const { body: { company, position }, user: { userId }, params: { id: jobId } } = req;

    
    if (company === ''|| position === '') {
        throw new BadRequestError('Company or Position does not exsist')
    }
    const job = await Job.findByIdAndUpdate(
       { _id:jobId, createdBy:userId}, req.body,{new:true ,runValidators:true}
    )
     if (!job) {
        throw new NotFoundError(`NO JOB WITH ID ${jobId}`)
    } 
        res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
const { user: {userId}, params: { id: jobId } } = req;

    const job = await Job.findByIdAndRemove({_id:jobId, createdBy:userId})


     if (!job) {
        throw new NotFoundError(`NO JOB WITH ID ${jobId}`)
    } 
        res.status(StatusCodes.OK).json({ job })
}


module.exports = {
    getAllJobs, getJob, updateJob, deleteJob, createJob
}