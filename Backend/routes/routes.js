const Router = require('koa-router');
const Dog = require('../models/dogs');

const router = new Router();

const handleServerError = (ctx, error, status = 500) => {
    console.error(error);
    ctx.status = status;
    ctx.body = { message: 'Internal Server Error', error: error.message };
};

// Get all the dogs
router.get('/dogs', async (ctx) => {
    try {
        ctx.body = await Dog.find();

    } catch (error) {
        handleServerError(ctx, error);
    }
});

// Get a dog by chipId
router.get('/dogs/:chip', async (ctx) => {
    try {
        const dog = await Dog.findOne({ chipId: ctx.params.chip });

        if (dog) {
            ctx.body = dog;

        } else {
            ctx.status = 404;
            ctx.body = { message: 'Dog not exist' };
        }

    } catch (error) {
        handleServerError(ctx, error);
    }
});

// Create new dog
router.post('/dogs', async (ctx) => {
    try {
        const dogData = ctx.request.body;
        const newDog = new Dog(dogData);
        await newDog.save();
        ctx.status = 201;
        ctx.body = newDog;

    } catch (error) {
        handleServerError(ctx, error);
    }
});

// Update existing dog
router.put('/dogs/:id', async (ctx) => {
    try {
        const dogId = ctx.params.id;
        const updates = ctx.request.body;
        const updatedDog = await Dog.findByIdAndUpdate(dogId, updates, { new: true });

        if (updatedDog) {
            ctx.body = updatedDog;

        } else {
            ctx.status = 404;
            ctx.body = { message: 'Dog not exist' };
        }

    } catch (error) {
        handleServerError(ctx, error);
    }
});

// Delete a dog by ID
router.delete('/dogs/:id', async (ctx) => {
    try {
        const dog = await Dog.deleteOne({ _id: ctx.params.id });

        if (dog.deletedCount > 0) {
            ctx.body = { message: 'Dog deleted successfully!' };

        } else {
            ctx.status = 404;
            ctx.body = { message: 'Dog not exist' };
        }

    } catch (error) {
        handleServerError(ctx, error);
    }
});

module.exports = router;
