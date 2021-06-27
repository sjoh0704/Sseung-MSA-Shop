import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register'
import Home from './components/Home';
import Move from './components/Move';
import ProductRegister from './components/ProductRegister';
import { Route} from 'react-router-dom';
function App() {
  return (

    
   <div>
    {/* <Login></Login> */}
    {/* <Logout></Logout> */}
    {/* <Register></Register> */}
    {/* <Home/> */}
    {/* <ProductRegister/> */}
    <Move/>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/product/register" component={ProductRegister}/>
    <Route exact path="/logout" component={Logout}/>
    
   </div>
  );
}

export default App;
