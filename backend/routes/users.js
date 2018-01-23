var express = require('express');
var router = express.Router();
const fs = require('fs');

const createStars = times => '*'.repeat(times) || '-';
const generateFunPoints = skills => [skills.brewing, skills.humor, skills.coffee, skills.snooker].map(skill => Number(skill)).reduce((acc, val) => acc + val, 0);

const parseUserDataToStringRepresentation = userData =>
  `
    #############################################
    
    Name:  ${userData.contactInfo.name}
    Email: ${userData.contactInfo.email}

    Java:       ${createStars(userData.skills.java)}
    C++:        ${createStars(userData.skills.cpp)}
    JavaScript: ${createStars(userData.skills.js)}

    React:   ${userData.skills.react}
    Android: ${userData.skills.android}

    Fun points: ${generateFunPoints(userData.skills)} / 4
  `;

/* write a user to a file */
router.post('/', function(req, res, next) {
  console.log(parseUserDataToStringRepresentation(req.body));

  fs.appendFile('answers.txt', parseUserDataToStringRepresentation(req.body),
  function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  res.send('respond with a resource');
});

module.exports = router;
