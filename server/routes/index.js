import express from 'express';

const indexRouter = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
indexRouter.get('/', (req, res, _next) => {
  counter += 1;
  numbers.push(counter);
  res.render('index', {
    title: 'Ivan Rivalcoba',
    counter,
    numbers,
  });
});

// module.exports = router;
export default indexRouter;
