  import jwt from 'jsonwebtoken';
  const auth = async (req, res, next) => {
    try{
       //getting token sent over by the request
        const token = req.headers.authorization.split(" ")[1];
       
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.LOGIN);
            req.roles = decodedData?.roles;
        }else{
            req.roles = [2001]
        }
        next();
    }catch(err){
        return res.status(400).json({message: err});
    }
}
export default auth;