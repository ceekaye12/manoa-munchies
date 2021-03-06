import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Vendors } from '/imports/api/vendor/vendor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Vendor from '../components/Vendor';

const textStyle = {
  fontSize: '40px',
  fontFamily: 'Quicksand',
};

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class VendorHome extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="vendorhome-format">
          <Container>
            <Header as="h2" textAlign="center" style={textStyle} inverted>
              Vendor Home
            </Header>
            <Header as="h2" textAlign="center" inverted>
              <p className="consistent-font">Welcome back, {this.props.currentUser}</p>
            </Header>
            <Card.Group>
              {this.props.vendors.map((vendor, index) => <Vendor key={index}
                                                                 vendor={vendor}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Vendor documents in the props. */
VendorHome.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Vendor documents.
  const subscription = Meteor.subscribe('Vendors');
  return {
    vendors: Vendors.find({}).fetch(),
    ready: subscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
  };
})(VendorHome);
