import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    //jwt: jsonwebtoken
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        Admin: user.Admin
    }, process.env.JWT_SECRET || 'hiddentext', {
        expiresIn: '30d',
    });
}

//middleware to authenticate user
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'hiddentext',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token Exists' });
    }
  };