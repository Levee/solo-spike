const express = require('express');
const { default: Axios } = require('axios');
const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Axios
    .get(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${id}&count=25`)
    .then(result => res.send(result.data))
    .catch(error => res.send(error).status(500));
});

router.get('/', (req, res) => {
  Axios
    .get(`https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json`)
    .then(result => res.send(result.data))
    .catch(error => res.send(error).status(500));
})

module.exports = router;