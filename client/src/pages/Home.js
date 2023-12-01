import React, { useEffect, useState } from 'react';
import MealGallery from '../components/MealGallery';
import Spinner from '../components/Spinner';




function Home() {

  const [appState, setAppState] = useState({
    loading: false,
    meal: [],
  });

  
  useEffect( () => {
    setAppState({ loading: true });
    const apiURL =  'http://localhost:3500/api/meal';
    setTimeout(() => {
    fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
        setAppState({loading: false, meal: data});
    });
  },1500);
  }, [setAppState]);

  return (
    <div>
      {appState.loading ? (<Spinner/>) : (
      <MealGallery isLoading={appState.loading} meal={appState.meal}/>
      )}
      </div>
  );

}
export default Home;
