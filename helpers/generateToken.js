import jwt from 'jsonwebtoken'

export const GenerateToken = (uid) => {
    return new Promise ((resolve, reject) => {
        const payload = {uid}
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('It was not possible to generate the token')
            }
            resolve(token)
        })
    })
}