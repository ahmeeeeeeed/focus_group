'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route') 

Route.on('/').render('welcome') 
 

 /* Route.get('/', ()=>{
      return {greeting : "hello from JSON"}
  })*/

/*********************************Auth**************************** */
Route.post('/login', 'AuthController.login').middleware('guest')//.middleware('auth')
Route.post('/refreshToken', 'AuthController.refreshToken').middleware('guest')//.middleware('auth')
Route.post('/logout', 'AuthController.logout').middleware('guest')//.middleware('auth')


/*********************************Users**************************** */
Route.post('/register', 'UserController.register').middleware('guest')//.middleware('auth')
Route.get('/getUser/:id_user', 'UserController.getUser')//.middleware('guest')
Route.get('/listusers', 'UserController.listusers').middleware('guest')
Route.get('/listparticipants', 'UserController.listparticipants').middleware('guest')
Route.get('/listmoderators', 'UserController.listmoderators').middleware('guest')
Route.put('/updateUser/:id_user', 'UserController.updateUser').middleware('guest')
Route.put('/hide_unhide_User/:id_user', 'UserController.hide_unhide_User').middleware('guest')



/*********************************Groups**************************** */

Route.post('/addGroup','GroupController.addGroup').middleware('guest')
Route.get('/listgroups','GroupController.listgroups').middleware('guest')
Route.get('/getGroup/:id_group','GroupController.getGroup').middleware('guest')
Route.put('/updateGroup/:id_group','GroupController.updateGroup').middleware('guest')
Route.put('/hide_unhide_Group/:id_group','GroupController.hide_unhide_Group').middleware('guest')
Route.post('/affectModeratorToGroup/:id_mod/:id_group','GroupController.affectModeratorToGroup').middleware('guest')
Route.post('/affectParticipantToGroup/:id_part/:id_group','GroupController.affectParticipantToGroup').middleware('guest')

  
/*********************************Discussions**************************** */

Route.post('/addDiscussion','DiscussionController.addDiscussion').middleware('guest')
Route.get('/listdiscussions','DiscussionController.listdiscussions').middleware('guest')
Route.get('/getDiscussion/:id_disc','DiscussionController.getDiscussion').middleware('guest')
Route.put('/updateDiscussion/:id_disc','DiscussionController.updateDiscussion').middleware('guest')

//Route.put('/hide_unhide_Discussion/:id_disc','DiscussionController.hide_unhide_Discussion').middleware('guest')//visible_to_group
//Route.put('/enable_disable_Discussion/:id_disc','DiscussionController.enable_disable_Discussion').middleware('guest')//users_see_replies


/*********************************Polls**************************** */

Route.post('/addPoll','PollController.addPoll').middleware('guest')
Route.get('/listpolls','PollController.listpolls').middleware('guest')
Route.get('/getPoll/:id_poll','PollController.getPoll').middleware('guest')
Route.put('/answerOnPoll/:id_poll','PollController.answerOnPoll').middleware('guest')
Route.put('/updatePoll/:id_poll','PollController.updatePoll').middleware('guest') 
Route.put('/hide_unhide_Poll/:id_poll','PollController.hide_unhide_Poll').middleware('guest')
Route.get('/getPollPercentageByGroup/:id_group','PollController.getPollPercentageByGroup')

/*********************************Replies**************************** */

Route.post('/addReply','ReplyController.addReply').middleware('guest')
Route.get('/listreplies','ReplyController.listreplies').middleware('guest')
Route.get('/getRepliesOnDiscussion/:id_discussion','ReplyController.getRepliesOnDiscussion').middleware('guest')
Route.get('/getRepliesOnPostReply/:id_reply','ReplyController.getRepliesOnPostReply').middleware('guest')
Route.put('/hide_unhide_Reply/:id_reply','ReplyController.hide_unhide_Reply').middleware('guest')
Route.put('/validate_img/:id_reply','ReplyController.validate_img').middleware('guest')