'use strict'
const Reply = use('App/Models/Reply')
const Discussion = use('App/Models/Discussion')



class ReplyController {

    async addReply({ request, response }) {

        const { discussion_id, reply_id } = request.only(['discussion_id', 'reply_id'])
        try {
            if (reply_id) {//if it's a subreply on a reply


                request.all().discussion_id = null
                const postreply = await Reply.create(request.all())
                const reply = await Reply.find(reply_id)

                reply.comments.push(postreply._id)
                reply.save()
                return response.json(postreply)
            }
            else { //if it's a simple reply on post
                const discussion = await Discussion.find(discussion_id)
                console.log(discussion)
                const reply = await Reply.create(request.all())

                discussion.replies.push(reply._id)
                discussion.save();
                return response.json(reply)
            }

        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }
    }

    async listreplies({ response }) {
        try{
            const x = await Reply.all()
            if(x.rows.length)
            return response.json(x)
            else response.status(204).send("no content")
        }
        catch(err){
            console.log(err)
            return  response.send(err)
          } 

    }


    async getRepliesOnDiscussion({ response, request, params }) {
        try {
            let repliesOnDiscussion = []
            const replies = await Reply.where("discussion_id", params.id_discussion).fetch()

            for (let index = 0; index < replies.toJSON().length; index++) {

                let subreplies = []
                for (let i = 0; i < replies.toJSON()[index].comments.length; i++) {
                    subreplies.push(await Reply.find(replies.toJSON()[index].comments[i]))
                }
                repliesOnDiscussion.push({ reply: replies.toJSON()[index], subreplies: subreplies })
            }
            return response.json(repliesOnDiscussion)
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }


    }

    async getRepliesOnPostReply({ response, request, params }) {
        try {
            const reply = await Reply.find(params.id_reply)
            const postreplies = []

            for (let index = 0; index < reply.comments.length; index++) {
                postreplies.push(await Reply.find(reply.comments[index]))
            }

            return response.json(postreplies)
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }

    }

    async hide_unhide_Reply({ response, request, params }) {
        try {
            const reply = await Reply.find(params.id_reply)
            let change = "";
            //console.log(user)
            if (reply.state == "unhidden") change = "hidden"
            else change = "unhidden"
            reply.state = change
            reply.save()
            return response.json(reply)
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }



    }

    async validate_img({ response, request, params }) {
        try {
            const reply = await Reply.find(params.id_reply)
            reply.img.validate = "true"
            reply.save()
            return response.json(reply)
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }


    }


}

module.exports = ReplyController
