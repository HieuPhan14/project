import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favourite from './pages/Favourite'
import Documentation from './pages/Documentation'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar/>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/fav' component={Favourite} />
          <Route path='/documentation' component={Documentation} />
          <Route component={NotFound}></Route>
        </Switch>
    </>
  );

}
export default App;
