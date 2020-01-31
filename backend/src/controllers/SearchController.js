const Dev = require("../models/Dev");

const parseString = require("../utils/ParseStringAsArray");

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techArray = parseString(techs);

    const devs = await Dev.find({
      techs: {
        $in: techArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json({ devs });
  }
};
