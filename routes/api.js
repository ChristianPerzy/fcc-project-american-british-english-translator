'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let text = req.body.text;
      let locale = req.body.locale;

      if (locale === undefined || text === undefined || locale === '') {
        res.json({ error: 'Required field(s) missing' });
        return;
      }

      if (text === '') {
        res.json({ error: 'No text to translate' });
        return;
      }

      let dir;
      if (locale === 'american-to-british') {
        dir = 'ab';
      } else if (locale === 'british-to-american') {
        dir = 'ba';
      } else {
        res.json({ error: 'Invalid value for locale field' });
        return;
      }

      let translation = translator.translate(text,dir);

      let answer = { text };

      if (translation.translated.length === 0) {
        answer.translation = "Everything looks good to me!";
      } else {
        answer.translation = translator.highlightText(translation);
      }

      res.json(answer);
      
    });
};
