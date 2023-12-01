const sequalize = require("sequelize");
const { User, Lawyer, Fave } = require("../models/index");

module.exports = {
  getFaveByUserId: async (req, res) => {
    console.log("balkis said you are the ONE");
    try {
      const getUser = await User.findOne({ where:
        
        { email: req.params.email }});

      const userLawyerRelations = await Fave.findAll( {
        where: { userId: getUser.id },
        include: [
          {
            model: Lawyer,
            order: [["id", "ASC"]],
          },
        ],
      }
      );
      res.json(userLawyerRelations);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  add: async (req, res) => {
    try {
      const getUser = await User.findOne({ email: req.params.email });
      const addFave = await Fave.create({ ...req.body, userId: getUser.id });
      res.status(201).send(addFave);
    } catch (error) {
      throw error;
    }
  },
  removeFave: async (req, res) => {
    try {
      const getUser = await User.findOne({ email: req.params.email });
      const deleteFave = await Fave.destroy({
        where: { userId: getUser.id, lawyerId: req.params.lawyerId },
      });
      res.json(deleteFave);
    } catch (error) {
      console.log(error);
    }
  },
  checkHeart: async (req, res) => {
    try {
      const getUser = await User.findOne({ email: req.params.email });
      console.log({ userId: getUser.id, lawyerId: req.params.lawyerId });
      const response = await Fave.findOne({
        where: {
          userId: getUser.id,
          lawyerId: req.params.lawyerId,
        },
      });

      // console.log("the response", response);

      // const deleteFave = await Fave.destroy({
      //   where: { userId: getUser.id, lawyerId: req.params.lawyerId },
      // });
      if (response?.userId) {
        res.json(true);
      } else {
        res.json(false);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
