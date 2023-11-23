const sequalize = require("sequelize");
const { Lawyer, Category } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
  getAllLawyers: async (req, res) => {
    try {
      const allLawyers = await Lawyer.findAll();
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
  getLawyerByEmail:  async (req, res) => {
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
      await User.update(req.body, {
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
  filterLawyers: async (req, res) => {
    try {
      const { category, price, rating, location } = req.body;

      // Build the filter object based on provided parameters
      const filter = {};
      if (category) {
        filter.category = category;
      }
      if (price) {
        filter.price = { [Op.between]: price };
        console.log(filter.price, "price"); // Assuming hourlyRate is the field for price
      }
      if (rating) {
        filter.rating = { [Op.gte]: rating }; // Assuming rating is the field for user ratings
      }
      if (location) {
        filter.location = { [Op.iLike]: `%${location}%` }; // Case-insensitive search for location
      }

      // Perform the query with the applied filters
      const filteredLawyers = await Lawyer.findAll({
        where: filter,
        include: [{ model: Category, as: "categories" }], // Assuming a many-to-many relationship between Lawyer and Category
      });

      res.status(200).send(filteredLawyers);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
