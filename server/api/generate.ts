import { ofetch } from 'ofetch'
import { randomUUID } from 'crypto'
import { JsonDB, Config } from 'node-json-db';
export default defineEventHandler(async (event) => {
  var query = getQuery(event)
  if (query.language == undefined) {
    setResponseStatus(event, 400)
    return {
      error: 'Param not found'
    }
  }
  var key = process.env.OPENAI_KEY || null
  if (!key) {
    setResponseStatus(event, 500)
    return {
      error: 'Open AI query error'
    }
  }
  var gpt_message = null
  switch (query.language) {
    case 'en':
      gpt_message = 'Generate a Christmas message for the year 2023 thanking the employee of evoraIT, a technology company with 120 characters'
      break;
    case 'es':
      gpt_message = 'Genera un mensaje de Navidad para el año 2023 agradeciendo al empleado de evoraIT, empresa tecnológica con 120 caracteres'
      break;
    case 'pt':
      gpt_message = 'Gere uma mensagem de natal do ano de 2023 agradecendo o colaborador da evoraIT uma empresa de tecnologia com 120 chars'
      break;
    default:
      setResponseStatus(event, 400)
      return {
        error: 'Wrong language'
      }
  }
  var gpt_response = await ofetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + key.trim()
    },
    body: {
      "model": "gpt-4",
      "messages": [
        {
          "role": "user",
          "content": gpt_message
        }
      ]
    }
  })
  var response = gpt_response.choices[0].message.content as String
  response.substring(1, response.length - 1)
  var id = randomUUID()
  var db = new JsonDB(new Config("database", true, false, '/'))
  db.push('/message/' + id, {
    response,
    language:query.language
  })
  return {
    response,
    id
  }
})
