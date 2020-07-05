const express = require('express');
const { default: Axios } = require('axios');
const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Axios
    .get(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${id}&count=3`)
    .then(result => {console.log(result.data); res.send(result.data)})
    .catch(error => {console.log(error); res.send(500)});
});

module.exports = router;