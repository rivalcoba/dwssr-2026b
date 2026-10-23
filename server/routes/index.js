import express from 'express';

const router = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', (req, res, _next) => {
  counter += 1;
  numbers.push(counter);
  res.render('index', {
    title: 'Ivan Rivalcoba',
    counter,
    numbers,
  });
});

// module.exports = router;
export default router;
