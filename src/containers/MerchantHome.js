import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { toggleDrawer, selectCharity } from "../redux/actions";

import CardPage from "../components/CardPage";

import CharityCard from "../components/CharityCard";
import {
  MerchantPreButtons,
  MerchantActionButtons,
  MerchantPostButtons
} from "../components/CardComponents";
import DrawerFactory from "../components/DrawerFactory";
import { ImageLibrary } from "../components/ImageLibrary";

import "../style/DonorHome.css";

class MerchantHome extends Component {
  render() {
    const storeState = this.props.store.getState();
    const selectDonate = charity => () => {
      this.props.selectCharity(true, charity);
    };
    const learnMore = request => () => {
      this.props.history.push({
        pathname: "/gift/" + request.id,
        state: { request }
      });
    };

    const requests = storeState.globalData.requests;
    const cards = requests.map((r, i) => {
      return (
        <CharityCard
          key={i}
          title={r.charity.title}
          description={r.summary}
          image={ImageLibrary(r.charity.image)}
          onImageClick={learnMore(r)}
          preButtons={MerchantPreButtons(r)}
          buttons={MerchantActionButtons(learnMore(r), selectDonate(r))}
          postButtons={MerchantPostButtons(r)}
        />
      );
    });

    const drawerCharity = () => {
      const selectedCharity = storeState.updateDrawer.selectedCharity;
      if (Object.keys(selectedCharity).length === 0) {
        return undefined;
      }
      return selectedCharity;
    };
    const drawer = (
      <DrawerFactory
        store={this.props.store}
        charity={drawerCharity()}
        type="bid"
      />
    );

    return <CardPage cards={cards} drawer={drawer} />;
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showRequest: (showDrawer, request = {}) => {
      dispatch(selectCharity(request));
      dispatch(toggleDrawer(showDrawer));
    }
  };
};

MerchantHome = connect(null, mapDispatchToProps)(MerchantHome);

export default withRouter(MerchantHome);
