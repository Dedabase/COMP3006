const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

//Routes

/**
 * GET /
 * HOME
 */
router.get('', async (req, res) => {
    try{
        const locals = {
            title:"Hotel System",
            description:"Hotel Sytem for COMP 3006 Project",
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: {rating: -1} } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();


        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);


        
        res.render('index', { 
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    }   catch(error){
        console.log(error);
    }
});


/**
 * GET /
 * Post :id
 */

router.get('/post/:id', async (req, res) => {
    try{
        const locals = {
            title:"Hotel System",
            description:"Hotel Sytem for COMP 3006 Project",
        }

        let slug = req.params.id;

        const data = await Post.findById({_id: slug});
        res.render('post', {locals, data});
    }catch(error) {
        console.log(error);
    }
});

/**
 * POST /
 * Post :searchterm
 */

router.post('/search', async (req, res) => {
    try{   
        const locals = {
            title: "Search",
            desc: "Search Desc"
        }

        let searchterm = req.body.searchterm;
        const searchNoSpecChar = searchterm.replace(/[^a-zA-Z0-9]/g, "");

        const data = await Post.find({
            $or: [
                { title: {$regex: new RegExp(searchNoSpecChar, 'i') }},
                { body: {$regex: new RegExp(searchNoSpecChar, 'i') }},
            ]
        })

        res.render("search", {
            data,
            locals
        });

        //const data = await Post.find();
    }catch(error){
        console.log(error);
    }
})


/*function insertPostData() {
    Post.insertMany([
        {
            HotelName: "Test Hotel",
            HotelLocation: "Test Location",
            HotelDesc: "Test Description",
            rating: 5,
            rooms: 100,
        }
        ,
        {
            HotelName: "Test Hotel2",
            HotelLocation: "Test Location2",
            HotelDesc: "Test Description2",
            rating: 4,
            rooms: 101,
            }
    ])
}
insertPostData();
*/


router.get('/about', (req, res) => {
    res.render('about');
});


module.exports = router;