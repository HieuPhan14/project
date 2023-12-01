import React from 'react';
import MealList from './MealList'
import { useState } from 'react';

const MealGallery = (props) => {
  const { meal, isLoading } = props;
  const [searchText, setSearchText] = useState('');

  if (!meal || Object.keys(meal).length === 0) {
    return (<p>No meal to display</p>)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filterMeals = (meals) => {
    return meals.filter((meal) =>
      meal.ingredient.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  
  return (
    <div>
      <h2 className="card-panel list-head light-blue-text darken-1 yellow lighten-1 center">Authentic Dishes</h2>
      <div>
      <nav style={{ marginBottom: "3-px" }} className='purple'>
        <div className='nav-wrapper'>
          <form>
            <div className='input-field'>
              <input
                id='search'
                type='search'
                placeholder='Type the ingredients you have...'
                onChange={handleSearchChange}
              />
              <label className='label-icon' htmlFor='search'>
                <i className='material-icons'>search</i>
              </label>
              <i className='material-icons' onClick={() => setSearchText('')}>close</i>
            </div>
          </form>
        </div>
      </nav>

      </div>


    <div className="container row">
        {!isLoading && Object.entries(meal).map(([type, meals]) => {
            return (
                  <MealList key={type} allMeals={filterMeals(meals)} mealType={type}/>
            );
        })
        }
    </div>

    </div>
  );
};
export default MealGallery;
