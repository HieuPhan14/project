const express = require('express');
const router = express.Router();
const { chicken, beef } = require('../../Meal');
const uuid = require('uuid');

/**
 * @route GET api/meal
 * @desc Retrieve all meals
 * @return JSON object containing all meals
 **/
router.get('/', (req, res) => {
  const allMeals = {
    chicken,
    beef,
  };
  res.json(allMeals);
});

/**
 * @route GET api/meal/random
 * @desc Retrieve a random meal
 * @return JSON object containing a random meal
 **/
router.get('/random', (req, res) => {
  const allMeals = [...chicken, ...beef]; // Combine both collections

  const randomIndex = Math.floor(Math.random() * allMeals.length);
  const randomMeal = allMeals[randomIndex];

  if (randomMeal) {
    res.json(randomMeal);
  } else {
    res.status(404).json({ msg: 'No random meal available' });
  }
});


/**
 * @route GET api/meal/collection
 * @desc Retrieve a specific collection of meals
 * @return JSON object containing a specific collection of meals
 **/
router.get('/:collection', (req, res) => {
  // Define your logic to retrieve a specific collection
  const allMeals = {
    chicken,
    beef,
  };
  const collectionName = req.params.collection.toLowerCase(); 
  const selectedCollection = allMeals[collectionName];

  if (selectedCollection) {
    res.json(selectedCollection);
  } else {
    res.status(400).json({ msg: `No collection with the name ${req.params.collection}` });
  }

});

/**
 * @route GET api/meal/:id
 * @desc Retrieve a specific meal by ID
 * @return JSON object containing the specified meal
 **/
router.get('/:collection/:id', (req, res) => {
  const allMeals = {
    chicken,
    beef,
  };
  const collectionName = req.params.collection.toLowerCase(); 
  const selectedCollection = allMeals[collectionName];

  const foundMeal = selectedCollection.find(meal => meal.mealId === parseInt(req.params.id));

  if (foundMeal) {
    res.json(foundMeal);
  } else {
    res.status(404).json({ msg: `No meal with the id of ${req.params.id}` });
  }
});

/**
 * @route POST api/meal
 * @desc Create a new meal
 * @return JSON object containing the newly created meal
 **/
router.post('/', (req, res) => {
  const { name, ingredient } = req.body;

  if (!name || !ingredient) {
    return res.status(400).json({ message: 'Name and ingredients are required' });
  }

  // Create a new meal
  const newMeal = {
    mealId: uuid.v4(),
    name,
    ingredient,
  };

  // Determine the collection based on the meal name
  let targetCollection;
  if (ingredient.toLowerCase().includes('chicken')) {
    targetCollection = chicken;
  } else if (ingredient.toLowerCase().includes('beef')) {
    targetCollection = beef;
  } else {
    return res.status(400).json({ message: 'Invalid ingredient. Should contain "chicken" or "beef".' });
  }

  // Add the new meal to the appropriate collection
  targetCollection.push(newMeal);

  res.status(201).json(newMeal);
});

module.exports = router;
