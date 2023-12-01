import React from 'react';
import { useState } from 'react';

const Favourite = () => {
  const [favouriteChickenMeals, setFavouriteChickenMeals] = useState(
    JSON.parse(localStorage.getItem('favouriteChickenMeals')) || []
  );
  
  const [favouriteBeefMeals, setFavouriteBeefMeals] = useState(
    JSON.parse(localStorage.getItem('favouriteBeefMeals')) || []
  );
  
    const [randomMeal, setRandomMeal] = useState(null);

    //make a GET request to the specified API endpoint to randomly choose and display a meal
    const handleRandomClick = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/meal/random');
        if (!response.ok) {
          throw new Error('Failed to fetch random meal');
        }
  
        const data = await response.json();
        setRandomMeal(data);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    const Delete = (name, ingredient) => {
      const favoriteMealsKey = ingredient.toLowerCase().includes('chicken')
        ? 'favouriteChickenMeals'
        : 'favouriteBeefMeals';
    
      try {
        const storedMeals = JSON.parse(localStorage.getItem(favoriteMealsKey)) || [];
    
        // Check if storedMeals is an array before using filter
        if (Array.isArray(storedMeals)) {
          const updatedMeals = storedMeals.filter((meal) => meal.name !== name);
    
          if (favoriteMealsKey === 'favouriteChickenMeals') {
            setFavouriteChickenMeals(updatedMeals);
            localStorage.setItem(favoriteMealsKey, JSON.stringify(updatedMeals));
          } else {
            setFavouriteBeefMeals(updatedMeals);
            localStorage.setItem(favoriteMealsKey, JSON.stringify(updatedMeals));
          }
        } else {
          console.error('Stored meals is not an array:', storedMeals);
          setFavouriteChickenMeals([]);
          setFavouriteBeefMeals([]);
          localStorage.setItem('favouriteChickenMeals', JSON.stringify([]));
          localStorage.setItem('favouriteBeefMeals', JSON.stringify([]));
        }
      } catch (error) {
        console.error('Error parsing stored meals JSON:', error);
      }
    };
    

  return (
    <div>
      <div>
        <h2 className='card-panel pink accent-1 center'>Favourite Meals</h2>
      </div>

      <div>
        <button className="waves-effect waves-light btn-large" onClick={handleRandomClick}>
          <i className="material-icons right">airline_seat_flat</i>Randomly select a dish for today
        </button>
      </div>

      <div>
        {randomMeal && (
          <div className="row">
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img alt={randomMeal.name} src={randomMeal.img} />
                </div>
                <div className="card-content">
                  <span className='card-title'>{randomMeal.name}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
      {favouriteChickenMeals.length > 0 || favouriteBeefMeals.length > 0 ? (
        <div className='row'>
          {favouriteChickenMeals.concat(favouriteBeefMeals).map((meal) => (
            <div key={meal.mealId} className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img alt={meal.name} src={meal.img} />
                </div>
                <div className="card-content">
                  <span className='card-title'>{meal.name}</span>
                  <button
                    type='submit'
                    className='btn'
                    onClick={() => Delete(meal.name, meal.ingredient)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h4>No favourite meal selected.</h4>
        )}
      </div>
    </div>
  );
};

export default Favourite;