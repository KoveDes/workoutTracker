const {connectDB} = require('./config/dbConnection')
const BodyParam = require('./models/BodyParams');
connectDB();

async function run() {
    try {
        const bodyParams = await BodyParam.create({
            leftCalf: {
                date: new Date(),
                size: 12
            }
        })
        console.log(bodyParams);
    } catch (e) {
        console.log(e.message)
    }
}

run();