const app = require('./app');
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3000;

require('./db').once('open', () => {
    app.listen(port, () => {
        console.log(`Server is up on port ${port}.`);
    });
});