const Router = require('koa-router');
const Dog = require('../models/dogs');

const router = new Router();

router.get('/dogs', async (ctx) => {
    ctx.body = await Dog.find();
});

router.get('/dogs/:chip', async (ctx) => {
    const dog = await Dog.findOne({ chipId: ctx.params.chip });
    if (dog) ctx.body = dog;
    else ctx.status = 404;
});

router.post('/dogs', async (ctx) => {
    try {
        const dogData = ctx.request.body;
        const newDog = new Dog(dogData);
        await newDog.save();
        ctx.body = newDog;

    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error', error: error.message };
    }
});

router.put('/dogs/:id', async (ctx) => {
    try {
        const dogId = ctx.params.id;
        const updates = ctx.request.body;
        const updatedDog = await Dog.findByIdAndUpdate(dogId, updates, { new: true });

        if (updatedDog) {
            ctx.status = 200;
            ctx.body = updatedDog;
        } else {
            ctx.status = 404;
            ctx.body = { message: 'Dog not found' };
        }
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error', error: error.message };
    }
});

router.delete('/dogs/:id', async (ctx) => {
    try {
        const dogId = ctx.params.id;
        const dog = await Dog.deleteOne({ _id: dogId });

        if (dog) {
            ctx.body = dog;

        } else {
            ctx.status = 404;
            ctx.body = { message: 'Dog not found' };
        }

    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error', error: error.message };
    }
});

module.exports = router;
