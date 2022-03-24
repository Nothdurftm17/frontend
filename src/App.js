import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch,Route,Link} from "react-router-dom"
import Main from './views/Main';
import Create from './views/Create';

function App() {
  return (
    <div className="App">
      <Switch>

    <Route exact path="/">
      <Main/>
    </Route>

    <Route exact path="/products/create">
      <Create/>
    </Route>


      </Switch>

    </div>
  );
}

export default App;
