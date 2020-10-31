'use strict'
const User = use('App/Models/User')
const Token = use('App/Models/Token');
const Encryption = use('Encryption');


class AuthController {

    async login ({auth, request,response}) {
        //const {email, password} = request.all();
        const {email, password} = request.only(['email','password'])

         try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken =await auth.withRefreshToken().attempt(email, password);// await auth.generate(user)
            
           // console.log(await Token.findBy('token')) 
            return response.json({"user":user, "access_token": accessToken})
          }

        }
        catch (e) {
          console.log(e)
          return response.status(401).send({ error: "bad crendentials" })
        }
      } 

      async refreshToken({ request, response, auth }) {
        const { refresh_token } = request.only(['refresh_token']);

        /* const decrypted = Encryption.decrypt(refresh_token);
        const refreshToken = await Token.findBy('token', decrypted);
        console.log(refreshToken) */
        try {
          return await auth.newRefreshToken().generateForRefreshToken(refresh_token);
        } catch (err) {
          console.log(err)
          response.status(401).send({ error: 'Invalid refresh token' });
        }
       // response.status(200).send({ status: 'ok' });
      }



      async logout({ request, response, auth }) {
    
        const { refresh_token } = request.only(['refresh_token']);
        const decrypted = Encryption.decrypt(refresh_token);
          try {
            const refreshToken = await Token.findBy('token', decrypted);
           // console.log(refreshToken)
            if (refreshToken) {
              refreshToken.delete();
              response.status(200).send({ status: 'ok' });
            } else {
              response.status(401).send({ error: 'Invalid refresh token' });
            }
          } catch (err) {
            response.status(401).send({ error: 'something went wrong' });
          }
       
      }
              
}

module.exports = AuthController
