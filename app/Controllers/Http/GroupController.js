'use strict'

const Group = use('App/Models/Group')
const User = use('App/Models/User')


class GroupController {

    async addGroup({request , response}){

        try{
            const group = await Group.create( request.all() ) 
            return response.json(group)
         }
         catch(err){
           console.log(err)
           return  response.send(err)
         }
    }

    async listgroups({ response }) {
        try{
            const x = await Group.all()
            if(x.rows.length)
            return response.json(x)
            else response.status(204).send("no content")
        }
        catch(err){
            console.log(err)
            return  response.send(err)
          } 
    }

async getGroup({ response ,request , params }) {
    try{
        return response.json(await Group.find(params.id_group))
    }
    catch(err){
        console.log(err)
        return  response.send(err)
      }
    
}
async updateGroup({ response ,request , params }) {
    try{
    const data = request.only(['name', 'desc'])
    const group  = await Group.find(params.id_group)
    group.name = data.name;
    group.desc = data.desc;
    group.save();
    return response.json(group)
    }
    catch(err){
        console.log(err)
        return  response.send(err)
      }
    
}
async hide_unhide_Group({ response ,request , params }) {
    try{
    const group =  await Group.find( params.id_group)
    let change ="";
    //console.log(user)
     if(group.state =="unhidden") change = "hidden"
    else change = "unhidden"
    group.state = change
    group.save()
    return response.json( group) 
    }
    catch(err){
        console.log(err)
        return  response.send(err)
      }
    
}


async affectModeratorToGroup({ response ,request , params }) {

    try {
        const moderator = await User.find(params.id_mod)
        const group = await Group.find(params.id_group)
        let exists = false
        // console.log(group.moderators)

        group.moderators.forEach(element => {
            if (element == params.id_mod || element == null) {
                exists = true;
                console.log("moderators already exists !!")
                return response.status(400).send("moderators already exists !!")
            }

        });
        if (exists == false) {

            group.moderators.push(params.id_mod)
            moderator.groupes.push(params.id_group)

            group.save();
            moderator.save();
            return response.json(group)
        }
    }
    catch (err) {
        console.log(err)
        return response.send(err)
    }



}
async affectParticipantToGroup({ response ,request , params }) {

        try {
            const participants = await User.find(params.id_part)
            const group = await Group.find(params.id_group)
            let exists = false

            group.participants.forEach(element => {
                if (element == params.id_part) {
                    exists = true;
                    console.log("participant already exists !!")
                    return response.status(400).send("participant already exists !!")
                }

            });
            if (exists == false) {

                group.participants.push(params.id_part)
                participants.groupes.push(params.id_group)

                group.save();
                participants.save();
                return response.json(group)
            }
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }

    }

}

module.exports = GroupController
