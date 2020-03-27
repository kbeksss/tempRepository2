const mongoose = require('mongoose');
const config = require('./config');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');
const nanoid = require('nanoid');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections){
        await mongoose.connection.db.dropCollection(coll.name);
    }
    await User.create({
        username: 'user',
        password: '123',
        token: nanoid()
    }, {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        token: nanoid()
    });
    const [cpus, hdds, gpus] = await Category.create({
        title: 'CPUs',
        description: 'Central Processing Units'
    },{
        title: 'HDDs',
        description: 'Hard Disk Drive'
    },{
        title: 'GPUs',
        description: 'Graphical Processing Unit'
    });

    await Product.create({
        title: "Inter Core i7",
        price: 400,
        category: cpus,
        image: 'fixtures/cpu.jpg'
    },{
        title: 'Seagate Barracuda',
        price:70,
        category: hdds,
        image: 'fixtures/hdd.jpg'
    },{
        title: 'Asus Geforce',
        price: 1000,
        category: gpus,
        image: 'fixtures/gpu.jpg'
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});
