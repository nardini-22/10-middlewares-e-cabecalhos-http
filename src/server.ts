import express from "express";
import routes from './config/routes';

const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.listen(port, () => {
    // console.log(`Listening on port ${port}`)
})