import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register'
import Home from './components/Home';
import Move from './components/Move';
import ProductRegister from './components/ProductRegister';
import { Route, Switch} from 'react-router-dom';
import ProductByCategory from './components/ProductByCategory'
import Top from './components/Top'
import Banner from './components/Banner'
import CategoryBanner from './components/CategoryBanner';
import ProductDetail from './components/ProductDetail'
import OrderList from './components/OrderList';
import PurchasePage from './components/PurchasePage';

function App() {
  return (

    
   <div>
    {/* <Login></Login> */}
    {/* <Logout></Logout> */}
    {/* <Register></Register> */}
    {/* <Home/> */}
    {/* <ProductRegister/> */}

    <Top/>
    <Banner/>
    <CategoryBanner/>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/product/register" component={ProductRegister}/>
    <Route exact path="/logout" component={Logout}/>
    <Route exact path="/category/:number" component={ProductByCategory}/>
    <Route exact path="/product/:number" component={ProductDetail}/>
    <Route exact path="/orderlist" component={OrderList}/>
    <Route exact path="/purchase" component={PurchasePage}/>
    </Switch>
   
    
    <Move/>
    
   </div>
  );
}

export default App;
