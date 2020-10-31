'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with Mongodb databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'mongodb'),
  /*-------------------------------------------------------------------------*/

     mongodb: {//mongodb+srv://mahdi:mahdi@cluster0.wltad.mongodb.net/dbname?retryWrites=true&w=majority
    client: 'mongodb',
    connectionString:  'mongodb+srv://root:root@cluster0.w982s.mongodb.net/focus-group?retryWrites=true&w=majority',
  
  }   

    /* mongodb: {
    client: 'mongodb',
    connectionString: Env.get('DB_CONNECTION_STRING', ''),
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', 27017),
      username: Env.get('DB_USER', ''),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'Questions-framework'),
      options: {
      }
    }
  }  */ 
}