const bcrypt = require('bcrypt');

//data for bcrypt
const saltRounds = 10;


const hashPass = async (dataPass) => {

    const hash = bcrypt.hashSync(dataPass, saltRounds);
    console.log("da vao hash: " + hash)
    return hash;
}
const comparePass = async (dataPass, authorPasss) => {
    return bcrypt.compareSync(dataPass, authorPasss);
}
module.exports = { hashPass, comparePass };