
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');


const auth = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('invalid authorization')
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user= { userId: payload.userId, name: payload.user }
     next()   
    } catch (error) {
        throw new UnauthenticatedError('invalid authorization')
    }

}

module.exports= auth