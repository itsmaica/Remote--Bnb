const express = require("express");
// const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
// const { default: reducer } = require("../../../frontend/src/store/session");

//Might upload to images on a different form altogether!
// const {
//     multipleMulterUpload,
//     multiplePublicFileUpload
// } = require ("../../awsS3.js")

//Need below for error validation later on
// const { handleValidationErrors } = require("../../utils/validation");
// const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, Image, Review } = require("../../db/models");


// const Op = Sequelize.Op

const router = express.Router();

// need to write validations for spots
// const validateSpot = [
//     check("")
// ]


//Get all the spots
router.get(
    '/',
    asyncHandler(async (req,res) => {
        const spots = await Spot.findAll({
            include: [Image, Review]
        })
        return res.json(spots);
    })
);

//Get One Spot
router.get(
    '/:spotId',
    asyncHandler(async(req,res) => {
        const { spotId } = req.params;
        const oneSpot = await Spot.findByPk(spotId, {
            include: [Image, Review]
        });

        return res.json(oneSpot);
    })
);

// Get One User's Spots
// router.get(
//     '/:userId',
//     asyncHandler(async(req,res) => {
//         const { userId } = req.params;
//         const userSpots = await Spot.findAll({
//             where: { userId : { [Op.eq]: userId} }
//         })
//     })
// )


//Create A Spot - MUST VALIDATE CREATION
router.post(
    '/new',
    // multipleMulterUpload("files"),
    // validateSpot,
    asyncHandler(async(req, res) => {
        const spot = await Spot.create({
            userId: req.body.userId,
            name: req.body.name,
            description: req.body.description,
            guests: req.body.guests,
            beds: req.body.beds,
            baths: req.body.baths,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            price: req.body.price
        })
        return res.json(spot)
    })
)


module.exports = router;
