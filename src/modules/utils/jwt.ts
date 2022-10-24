import jwt, { JwtPayload } from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  console.warn('NO JWT SECRET DEFINED!!');
}

export const createToken = (
  payload: string | object,
  options: jwt.SignOptions
) =>
  new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      options,
      (err, token) => {
        if (err) return reject(err);

        return resolve(token as string);
      }
    );
  });

export const verifyToken = (token: string) =>
  new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded as JwtPayload);
    });
  });
