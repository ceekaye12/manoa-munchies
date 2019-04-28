import React from 'react';
import { Vendors, VendorsSchema } from '/imports/api/vendor/vendor';
import { Grid, Segment, Header, Form, Radio } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import BoolField from 'uniforms-semantic/BoolField';
import SelectField from 'uniforms-semantic/SelectField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

const foodOptions = [
  {
    label: 'Chinese',
    value: 'Chinese',
  },
  {
    label: 'American',
    value: 'American',
  },
  {
    label: 'Vietnamese',
    value: 'Vietnamese',
  },
  {
    label: 'Hawaiian',
    value: 'Hawaiian',
  },
  {
    label: 'BBQ',
    value: 'BBQ',
  },
  {
    label: 'Mongolian',
    value: 'Mongolian',
  },
  {
    label: 'Breakfast',
    value: 'Breakfast',
  },
  {
    label: 'Donuts',
    value: 'Donuts',
  },
  {
    label: 'Coffee',
    value: 'Coffee',
  },
  {
    label: 'French',
    value: 'French',
  },
  {
    label: 'Egyptian',
    value: 'Egyptian',
  },
  {
    label: 'Greek',
    value: 'Greek',
  },
  {
    label: 'Vegetarian',
    value: 'Vegetarian',
  },
  {
    label: 'Health',
    value: 'Health',
  },
  {
    label: 'Sandwiches',
    value: 'Sandwiches',
  },
  {
    label: 'Japanese',
    value: 'Japanese',
  },
  {
    label: 'Korean',
    value: 'Korean',
  },
];

const locationOptions = [
  {
    label: 'Paradise Palms',
    value: 'Paradise Palms',
  },
  {
    label: 'Campus Center',
    value: 'Campus Center',
  },
  {
    label: 'Athletic Complex',
    value: 'Athletic Complex',
  },
  {
    label: 'Sustainability Courtyard',
    value: 'Sustainability Courtyard',
  },
];

const priceOptions = [
  {
    label: '$: $0-10 Entrees',
    value: '$',
  },
  {
    label: '$$: $10-20 Entrees',
    value: '$$',
  },
  {
    label: '$$$: $20+ Entrees',
    value: '$$$',
  },
];

/** Renders the Page for adding a document. */
class AddVendor extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, foodTypeOne, foodTypeTwo, foodTypeThree, vegan, glutenFree, healthy,
      vendorPrice, vendorType, location, image, description } = data;
    const owner = Meteor.user().username;
    Vendors.insert({ name, foodTypeOne, foodTypeTwo, foodTypeThree, vegan, glutenFree,
      healthy, vendorPrice, vendorType, location, image, description, owner }, this.insertCallback);
  }

  render() {
    return (
        <div className="center-padding">
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Restaurant</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }}
                      schema={VendorsSchema} onSubmit={this.submit}>
              <Segment inverted>
                <TextField name='name'/>
                <Form.Group inline widths='equal' style={{ paddingLeft: '10%' }}>
                  <SelectField name='foodTypeOne'
                               placeholder='Food Type One'
                               label=''
                               options={foodOptions}
                  />
                  <SelectField name='foodTypeTwo'
                               placeholder='Food Type Two'
                               label=''
                               options={foodOptions}
                  />
                  <SelectField name='foodTypeThree'
                               placeholder='Food Type Three'
                               label=''
                               options={foodOptions}
                               style={{ color: 'white' }}
                  />
                </Form.Group>
                <SelectField name='vendorPrice' options={priceOptions}/>
                <TextField name='vendorType'/>
                <SelectField name='location' options={locationOptions}/>
                <TextField name='image' label='Image URL (Please link a square image!)'/>
                <Form.Group inline>
                  <BoolField name='vegan'/>
                  <BoolField name='glutenFree'/>
                </Form.Group>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={Meteor.user().username}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
        </div>
    );
  }
}

export default AddVendor;
