const jwt = require('jsonwebtoken');

const madeToken = async (userID, expiresIn) => {
    const privateKey = "sakata1301";
    console.log("da vao jwt func")
    const token = jwt.sign({ id: userID }, privateKey, { expiresIn }, { algorithm: 'RS256' });
    console.log(token)
    return token;
}

module.exports = { madeToken };