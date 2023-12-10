const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  var userMessage = ""
  res.render('index',userMessage);
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

    const responseBody = JSON.parse(body);
    const gptResponse = responseBody.choices[0].message.content;

    res.render('index', { userMessage, gptResponse });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});