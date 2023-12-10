const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 6800;


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  var userMessage = ""
  res.render('index', userMessage);
});

app.post('/generateMessage', (req, res) => {
  const userMessage = req.body.userMessage;

  const gptOptions = {
    method: 'POST',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      "model": "gpt-4",
      "messages": [
        {
          "role": "user",
          "content": "Gere uma mensagem de natal agradecendo o colaborador da evoraIT uma empresa de tecnologia com 120 chars"
        }
      ]
    })
  };

  request(gptOptions, function (error, response, body) {
    if (error) throw new Error(error);

    try {

      const responseBody = JSON.parse(body);
      console.log(responseBody)
      const gptResponse = responseBody.choices[0].message.content;
      res.render('index', { userMessage, gptResponse });

    } catch (e) {
      console.log(e)
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});