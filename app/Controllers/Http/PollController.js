'use strict'
const Poll = use('App/Models/Poll')
const Group = use('App/Models/Group')


class PollController {

    async addPoll({ request, response }) {

        const group_id = request.only(['group_id'])
        try {
            const group = await Group.find(group_id.group_id)
            const poll = await Poll.create(request.all())

            group.polls.push(poll._id)
            group.save();
            return response.json(poll)
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }
    }

    async listpolls({ response }) {
        try{
            const x = await Poll.all()
            if(x.rows.length)
            return response.json(x)
            else response.status(204).send("no content")
        }
        catch(err){
            console.log(err)
            return  response.send(err)
          } 

    }
    async getPoll({ response, request, params }) {
        try {
            return response.json(await Poll.find(params.id_poll))
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }

    }

    async answerOnPoll({ response, request, params }) {
        try {
            const poll = await Poll.find(params.id_poll)
            const new_answers = poll.answers.concat(request.all().answers) /*   { "answers" : ["yes", "no", "yes"]  } */
            poll.answers = new_answers

            poll.save()
            return response.json(poll)
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }


    }

    async updatePoll({ response, request, params }) {
        try {
            const data = request.only(['type', 'question', 'choices'])
            const poll = await Poll.find(params.id_poll)
            poll.type = data.type;
            poll.question = data.question;
            poll.choices = data.choices

            poll.save()
            return response.json(poll)
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }


    }

    async hide_unhide_Poll({ response, request, params }) {
        try {
            const poll = await Poll.find(params.id_poll)
            let change = "";
            //console.log(user)
            if (poll.state == "unhidden") change = "hidden"
            else change = "unhidden"
            poll.state = change
            poll.save()
            return response.json(poll)
        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }


    }

    async getPollPercentageByGroup({ response, request, params }) {

        try {
            const polls = await Poll.where("group_id", params.id_group).fetch()

            let pollsPercentage = []

            polls.toJSON().forEach(element1 => {
                let data = []
                element1.choices.forEach(element2 => {

                    let per = element1.answers.reduce((total, x) => (x == element2 ? total + 1 : total), 0)//.filter(function(x){return x==2}).length
                    data.push({ choice: element2, percentage: (per / element1.answers.length) * 100 })

                });
                pollsPercentage.push({ id_poll: element1._id, data })
            });
            return response.json(pollsPercentage)

        }
        catch (err) {
            console.log(err)
            return response.send(err)
        }

    }
}

module.exports = PollController
