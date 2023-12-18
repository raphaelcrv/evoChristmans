
import { JsonDB, Config } from 'node-json-db'
export default defineEventHandler(async (event) => {
  var query = getQuery(event)
  var db = new JsonDB(new Config("database", true, false, '/'))
  var message = await db.getData('/message/' + query.uid)

  return message

})
