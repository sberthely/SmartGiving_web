import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { toggleDrawer, selectCharity } from "../redux/actions";

import DonationDrawer from "../components/DonationDrawer";
import BidDrawer from "../components/BidDrawer";
import { Bid } from "../ethereum/components/Bid";

class DrawerFactory extends Component {
  render() {
    const drawerData = props => {
      const storeState = props.store.getState();
      const onPrimary = () => {
        Bid(error => {
          if (error !== undefined) {
            console.log(`ERROR: ${error}`);
          } else {
            console.log("Great success!");
          }
        });
        props.showRequest(false);
        props.history.push("/thanks");
      };
      const onClose = () => props.showRequest(false);
      const onSecondary = onClose;
      let data = {
        onClose,
        onPrimary,
        onSecondary,
        open: storeState.updateDrawer.donationDrawerOpen
      };
      return data;
    };
    const storeState = this.props.store.getState();
    const data = drawerData(this.props);

    if (this.props.type === "donate") {
      return (
        <DonationDrawer
          store={this.props.store}
          data={data}
          donationValue={storeState.updateDrawer.donationValue}
          request={this.props.charity.gifts[0]}
          charity={this.props.charity}
        />
      );
    } else if (this.props.type === "bid") {
      return (
        <BidDrawer
          store={this.props.store}
          data={data}
          request={this.props.charity.gifts[0]}
          charity={this.props.charity}
        />
      );
    } else {
      console.warn(`Uh oh! Bad drawer prop type: ${this.props.type}`);
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showRequest: (showDrawer, charity = {}) => {
      dispatch(selectCharity(charity));
      dispatch(toggleDrawer(showDrawer));
    }
  };
};

DrawerFactory.propTypes = {
  request: PropTypes.object
};

DrawerFactory = connect(null, mapDispatchToProps)(DrawerFactory);

export default withRouter(DrawerFactory);
