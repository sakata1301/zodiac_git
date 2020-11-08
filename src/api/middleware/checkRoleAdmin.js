
const _ROLE_ADMIN = 1;
const _ROLE_MANAGER = 2;


const checkRoleAdmin = (req, res, next) => {
    if (req.user.role == _ROLE_MANAGER) {
        return res.status(401).json({
            "msg": "unAuthor, role must be ADMIN"
        })
    }

    next();
}

module.exports=checkRoleAdmin;