import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListContacts.jsx. */
class FoodDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleClick(id) {
    this.setState(prevState => ({ isToggleOn: !prevState.isToggleOn }));
    this.onClick(id);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete Failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  /** On submit, insert the data. */
  onClick(id) {
    Meteor.call('removeFood', { id });
  }


  render() {
    return (
        <Card centered>
          <Image centered src={this.props.food.image} id={'picSize'}/>
          <Card.Content>
            <Card.Header>{this.props.food.name} </Card.Header>
            <Card.Meta>{this.props.food.location}</Card.Meta>
            <Card.Description>
              {this.props.food.description}
            </Card.Description>
            <Button style={ { marginTop: '25px' } }
                    negative={true}
                    attached={'bottom'}
                    content={'Delete'}
                    onClick={() => { this.handleClick(this.props.food._id); } }>

            </Button>
          </Card.Content>
        </Card>
    );
  }
}


/** Require a document to be passed to this component. */
FoodDelete.propTypes = {
  food: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(FoodDelete);
