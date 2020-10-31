'use strict'

const Discussion = use('App/Models/Discussion')
const Group = use('App/Models/Group')


class DiscussionController {
    //aasas
    async addDiscussion({ request, response }) {

        const group_id = request.only(['group_id'])

        try {
            const group = await Group.find(group_id.group_id)
            const discussion = await Discussion.create(request.all())

            group.discussions.push(discussion._id)
            group.save();
            return response.json(discussion)

        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }
    }

    async listdiscussions({ response }) {
        try {
            const x = await Discussion.all()
            if (x.rows.length)
                return response.json(await Discussion.all())
            else response.status(204).send("no content")
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }

    }


    async getDiscussion({ response, request, params }) {
        try {
            return response.json(await Discussion.find(params.id_disc))
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }

    }

    async updateDiscussion({ response, request, params }) {
        try {
            const data = request.only(['name', 'desc', 'visible_to_group', 'users_see_replies'])
            const discussion = await Discussion.find(params.id_disc)
            discussion.name = data.name;
            discussion.desc = data.desc;
            discussion.visible_to_group = data.visible_to_group
            discussion.users_see_replies = data.users_see_replies

            discussion.save()
            return response.json(discussion)
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }

    }

}

module.exports = DiscussionController
