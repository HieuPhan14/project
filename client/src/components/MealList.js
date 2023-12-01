import React, { useState, useEffect } from 'react';
import AnnouncementBox from './AnnouncementBox';

const MealList = (props) => {
  const { allMeals, mealType } = props;
  const [announcement, setAnnouncement] = useState(null);

  //add to favourite localStorage
    const addToFavorites = (meal) => {
      const favoriteMealsKey = meal.ingredient.toLowerCase().includes('chicken') ? 'favouriteChickenMeals' : 'favouriteBeefMeals';
      const favoriteMeals = JSON.parse(localStorage.getItem(favoriteMealsKey)) || [];
      const isAlreadyFavorite = favoriteMeals.some((favoriteMeal) => favoriteMeal.name === meal.name);

    if (!isAlreadyFavorite) {
      favoriteMeals.push(meal);
      localStorage.setItem(favoriteMealsKey, JSON.stringify(favoriteMeals));
      setAnnouncement('Meal added to favorites!');
    } else {
      setAnnouncement('Meal is already in favorites!');
    }
  };

  useEffect(() => {
    if (announcement) {
      const timeoutId = setTimeout(() => {
        setAnnouncement(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [announcement]);


    return (
      <div>
      {announcement && (
        <AnnouncementBox message={announcement} onClose={() => setAnnouncement(null)} />
      )}
      <div className='row'>
        <h2 className='deep-purple-text accent-4'>{mealType} meal</h2>
        {allMeals.map(meal => (
              <div key={meal.mealId} className="col s12 m4">
                <div className="card">
                  <div className="card-image">  
                    <img alt={meal.name} src={meal.img}/>
                    <a className="btn-floating halfway-fab waves-effect waves-light cyan pulse" onClick={() => addToFavorites(meal)}><i className="material-icons">add</i></a>
                  </div>
                  <div className="card-content">
                  <span className='card-title'>{meal.name}</span>
                    <span className="activator waves-effect">Click to check ingredients</span>
                  </div>
                  <div className="card-action">
                    <span>Meal ID: {meal.mealId}</span>

                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{meal.name}<i className="material-icons right">close</i></span>
                    <p>{meal.ingredient}</p>
                    
                    
                  </div>
                </div>
              </div>
        ))}
        
        </div>
        </div>
    )
}

export default MealList;
