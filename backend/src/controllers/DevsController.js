const Dev = require("../models/Dev");

const api = require("axios");

const parseString = require("../utils/ParseStringAsArray");

module.exports = {
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      let apiResponse = await api.get(
        "https://api.github.com/users/williamphilippe"
      );
      const { name = login, avatar_url, bio } = apiResponse.data;

      const techArray = parseString(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        name,
        avatar_url,
        bio,
        github_username,
        techs: techArray,
        location
      });
    }

    return response.json(dev);
  },

  async index(request, response) {
    const list = await Dev.find();

    return response.json(list);
  }
};
