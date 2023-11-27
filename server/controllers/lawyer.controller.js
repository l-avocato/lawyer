const sequalize = require("sequelize");
const { Lawyer, Category, Rating, User } = require("../models/index");
const { Op } = require("sequelize");
const haversine = require("haversine");
module.exports = {
  getAllLawyers: async (req, res) => {
    try {
      const allLawyers = await Lawyer.findAll({
        include: [
          {
            model: Rating,
          },
          {
            model: Category,
          },
        ],
        // include: [

        // ],
      });
      res.status(200).send(allLawyers);
    } catch (error) {
      throw error;
    }
  },
  getLawyerByOneCategory: async (req, res) => {
    try {
      const allLawyers = await Lawyer.findAll({
        include: [
          {
            model: Rating,
          },
          {
            model: Category,
          },
        ],
        // include: [
        where: { categoryId: req.params.id },
        // ],
      });
      res.status(200).send(allLawyers);
    } catch (error) {
      throw error;
    }
  },
  getLawyerId: async (req, res) => {
    try {
      const oneLawyer = await Lawyer.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send(oneLawyer);
    } catch (error) {
      throw error;
    }
  },
  getLawyerByEmail: async (req, res) => {
    try {
      const oneLawyer = await Lawyer.findOne({
        where: { email: req.params.email },
      });
      res.status(200).send(oneLawyer);
    } catch (error) {
      throw error;
    }
  },

  add: async (req, res) => {
    try {
      const newLawyer = await Lawyer.create(req.body);
      res.status(201).send(newLawyer);
    } catch (error) {
      throw error;
    }
  },
  deleteLawyer: async (req, res) => {
    try {
      const lawyerDeleted = await Lawyer.destroy({
        where: { id: req.params.id },
      });
      res.json(lawyerDeleted);
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      await Lawyer.update(req.body, {
        where: { id: req.params.id },
      });

      const updatedLawyer = await Lawyer.findByPk(req.params.id);

      res.send(updatedLawyer);
    } catch (error) {
      throw error;
    }
  },

  updateLawyer: async (req, res) => {
    try {
      const lawyerEmail = await Lawyer.findOne({where: { email: req.params.emailUpdate}});
        const result= await Lawyer.update(req.body, {
        where: { id: lawyerEmail.id},
      });

      res.send(result);
    } catch (error) {
      throw error;
    }
  },

  searchLawyer: async (req, res) => {
    try {
      const searchLawyer = await Lawyer.findAll({
        where: { fullName: req.params.fullName },
      });
      res.status(200).send(searchLawyer);
    } catch (error) {
      throw error;
    }
  },
  getLawyerByNearby: async (req, res) => {
    try {
      const getUser = await User.findOne({
        where: { email: req.params.email },
      });
      const searchLawyer = await Lawyer.findAll({
        include: [
          {
            model: Rating,
          },
          {
            model: Category,
          },
        ],
      });
      const filtred = searchLawyer.filter((lawyer) => {
        const start = {
          latitude: getUser.latitude,
          longitude: getUser.langitude,
        };
        const end = {
          latitude: lawyer.latitude,
          longitude: lawyer.langitude,
        };
        return haversine(start, end) <= 3;
      });
      // 36.856139, 10.201317
      //36.862963, 10.196272
      //36.853387, 10.206075
      //36.874649, 10.189052
      // 35.800095, 10.409405 oued laya
      // 36.891782, 10.188760

      res.status(200).send(filtred);
    } catch (error) {
      throw error;
    }
  },
  searchLawyerByfield: async (req, res) => {
    try {
      const searchLawyer = await Lawyer.findAll({
        where: { field: req.params.field },
      });
      res.status(200).send(searchLawyer);
    } catch (error) {
      throw error;
    }
  },
  verifyLawyer: async (req, res) => {
    try {
      const lawyerVerified = await Lawyer.update(
        {
          IsVerified: true,
        },
        {
          where: { id: req.params.id },
        },
      );
      res.status(200).send(lawyerVerified);
    } catch (error) {
      throw error;
    }
  },
  blockLawyer: async (req, res) => {
    try {
      const lawyerBlocked = await Lawyer.update(
        {
          IsBlocked: true,
        },
        {
          where: { id: req.params.id },
        },
      );
      res.status(200).send(lawyerBlocked);
    } catch (error) {
      throw error;
    }
  },
  updateAvailability: async (req, res) => {
    try {
      const lawyerAvailabilityUpdated = await Lawyer.update(
        {
          isAvailable: req.body.isAvailable,
        },
        {
          where: { id: req.params.id },
        },
      );
      res.status(200).send(lawyerAvailabilityUpdated);
    } catch (error) {
      throw error;
    }
  },
  getLawyersByCategory: async (req, res) => {
    try {
      const lawyersByCategory = await Lawyer.findAll({
        include: [
          {
            model: Category,
          },
          {
            model: Rating,
          },
        ],

        where: { categoryId: req.params.id },
      });

      if (req.params.rating) {
        const calculateRating = lawyersByCategory.map((lawyer) => {
          const { id } = lawyer;
          let rating = lawyer.ratings.reduce((acc, val) => {
            return acc + val.stars;
          }, 0);
          const length = lawyer.ratings.length || 1;
          rating = rating / length;
          // lawyer.stars = rating;
          return { id, rating };
        });
        const filterLawyer = calculateRating.filter((item) => {
          return item.rating >= req.params.rating;
        });

        const finalData = await Promise.all(
          filterLawyer.map(async (lawyer) => {
            try {
              const lawyers = await Lawyer.findOne({
                include: [
                  {
                    model: Category,
                  },
                  {
                    model: Rating,
                  },
                ],

                where: { id: lawyer.id },
              });
              return lawyers;
            } catch (error) {
              throw error;
            }
          }),
        );
        return res.status(200).send(finalData);
      }
      return res.status(200).send(lawyersByCategory);
    } catch (error) {
      throw error;
    }
  },
  topRatedLawyer: async (req, res) => {
    try {
      const lawyersByCategory = await Lawyer.findAll({
        include: [
          {
            model: Category,
          },
          {
            model: Rating,
          },
        ],
      });

      const calculateRating = lawyersByCategory.map((lawyer) => {
        const { id } = lawyer;
        let rating = lawyer.ratings.reduce((acc, val) => {
          return acc + val.stars;
        }, 0);
        const length = lawyer.ratings.length || 1;
        rating = rating / length;
        // lawyer.stars = rating;
        return { id, rating };
      });
      const filterLawyer = calculateRating.sort((a, b) => {
        return b.rating - a.rating;
      });

      const finalData = await Promise.all(
        filterLawyer.map(async (lawyer) => {
          try {
            const lawyers = await Lawyer.findOne({
              include: [
                {
                  model: Category,
                },
                {
                  model: Rating,
                },
              ],

              where: { id: lawyer.id },
            });
            return lawyers;
          } catch (error) {
            throw error;
          }
        }),
      );

      return res.status(200).send(finalData);
    } catch (error) {
      throw error;
    }
  },
  
};
