const verifyRoles = (...allowedRoles) => {
return async (req, res, next) => {
    if(!req?.roles) return res.sendStatus(401);
    let roles = req.roles;
    let rolesArray = [...allowedRoles];
  const result =  roles.map((role) => {
       return  rolesArray.includes(role);
    }).find(val => val === true);
    
    if(!result) return res.sendStatus(401);
    next();
}
}
export default verifyRoles;