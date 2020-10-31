'use strict'

const User = use('App/Models/User')
class UserController {

  async register({ request, response, auth }) {
    //const {first_name , last_name , email , password } = request.all()

    ////use uuid to generate random uid of 6 numbers

    try {
      const user = await User.create(/* {
          first_name,
          last_name,
          email,
          password
        } */
        request.all()
      )

      let accessToken = await auth.generate(user)
      return response.json({ "user": user, "access_token": accessToken })

    }
    catch (err) {
      console.log(err)
      return response.send(err)
    }

  }


  async getUser({ response, params }) {
    try {
      const users = await User.find( params.id_user )
      console.log(users)
      return response.json(users)
    }
    catch (err) {
      console.log(err)
      return response.send(err)
    }

    // return response.json(await User.find(params.id))
  }

  async listusers({ response }) {
    try{
      const x = await User.all()
      if(x.rows.length)
      return response.json(x)
      else response.status(204).send("no content")
  }
  catch(err){
      console.log(err)
      return  response.send(err)
    } 

  }


  async listparticipants({ response, request }) {
    try{
      const x = await User.where({ role: "participant" }).fetch()
      if(x.rows.length)
      return response.json(x)
      else response.status(204).send("no content")
  }
  catch(err){
      console.log(err)
      return  response.send(err)
    } 

  }
  async listmoderators({ response, request }) {
    try{
      const x = await User.where({ role: "moderator" }).fetch()
      if(x.rows.length)
      return response.json(x)
      else response.status(204).send("no content")
  }
  catch(err){
      console.log(err)
      return  response.send(err)
    } 
  }
  async updateUser({ response, request, params }) {
    try {
      const { username, contact, password } = request.all()
      const user = await User.find(params.id_user)
      user.username = username;
      user.contact = contact;
      user.password = password;
      user.save()

      return response.json(user)
    }
    catch (err) {
      console.log(err)
      return response.send(err)
    }



  }
  async hide_unhide_User({ response, request, params }) {
    try {
      const user = await User.find(params.id_user)
      let change = "";
      //console.log(user)
      if (user.state == "active") change = "inactive"
      else change = "active"
      return response.json(await User.where({ _id: params.id_user }).update({ state: change }))
    }
    catch (err) {
      console.log(err)
      return response.send(err)
    }

  }

}

module.exports = UserController
