const jwt = require('jsonwebtoken')

exports.authenticationToken = async (request, response, next) => {
    let jwtToken
    const authHeader = request.headers['authorization']

    if (authHeader !== undefined) {
        jwtToken = authHeader.split(' ')[1]
    }

    if (jwtToken === undefined) {
        return response.status(401).json({message: 'Authentication Error'})
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return response.status(401).json({message: 'Invalid JWT token'})
        } 
        
        request.user = payload
        next()
    })
}

exports.roleVerification = (...roles) => {
    return (request, response, next) => {
        if (!roles.includes(request.user.role)) {
            return response.status(403).json({message: 'Access denied'})
        }

        next()
    }
}