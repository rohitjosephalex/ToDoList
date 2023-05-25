const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const helmet = require("helmet");
const port = 8080 ;




app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).send(`SERVER IS RUNNING ¯\\_(ツ)_/¯`);

});

app.use('/api', indexRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));


