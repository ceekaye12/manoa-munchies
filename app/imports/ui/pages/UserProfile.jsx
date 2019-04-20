import React from 'react';
import ReactDOM from 'react-dom';
import '/client/style.css';
import 'semantic-ui-css/semantic.min.css';
import CuisineType from '../components/CuisineType';
import Price from '../components/Price';
import FoodTags from '../components/FoodTags';
import HealthOptions from '../components/HealthOptions';
import { Button, Form } from 'semantic-ui-react';


export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.Tracker = {
      foodTypeOne: String,    //favorite food types such as: Middle Eastern, Japanese, Cajun, Classic American, etc.
      foodTypeTwo: String,
      foodTypeThree: String,
      vegan: Boolean,         //boolean values for whether the user cares about vegan, GF and healthy options.
      glutenFree: Boolean,
      healthy: Boolean,
      ToGo: Boolean,
      FoodTruck: Boolean,
      MadeToOrder: Boolean,
      Buffet: Boolean,
      restaurantPrice1: Boolean, //typical price range student wants.
      restaurantPrice2: Boolean,
      restaurantPrice3: Boolean,
      location: String,       //usual place on campus.
      owner: String           //user account
    }
  }
  setUp() {
    this.Tracker.ToGo = true;
    this.Tracker.FoodTruck = false;
    this.Tracker.MadeToOrder = true;
    this.Tracker.Buffet = true;
    this.Tracker.foodTypeOne = "Chinese";
    this.Tracker.foodTypeTwo = "Korean";
    this.Tracker.foodTypeThree = "American";
    this.Tracker.vegan = false;
    this.Tracker.healthy = false;
    this.Tracker.glutenFree = true;
    this.Tracker.restaurantPrice1 = true;
    this.Tracker.restaurantPrice2 = true;
    this.Tracker.restaurantPrice3 = true;
  }

  render() {
    this.setUp();
    return (
        <div className={'EditPrefs'}>
            <CuisineType
                getTG={this.Tracker.ToGo}
                getB={this.Tracker.Buffet}
                getFT={this.Tracker.FoodTruck}
                getMTO={this.Tracker.MadeToOrder}
            />
            <Price
                getPP1={this.Tracker.restaurantPrice1}
                getPP2={this.Tracker.restaurantPrice2}
                getPP3={this.Tracker.restaurantPrice3}
            />
            <FoodTags
                FT1={this.Tracker.foodTypeOne}
                FT2={this.Tracker.foodTypeTwo}
                FT3={this.Tracker.foodTypeThree}
            />
            <HealthOptions
                getV={this.Tracker.vegan}
                getGF={this.Tracker.glutenFree}
                getH={this.Tracker.healthy}
            />
            <Button>Edit Preferences</Button>
        </div>
    );
  }
}
ReactDOM.render(<UserProfile/>, document.getElementById('root'));