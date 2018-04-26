import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { toggleDrawer, selectCharity } from "../redux/actions";

import CardPage from "../components/CardPage";

import CharityCard from "../components/CharityCard";
import {
  DonorPreButtons,
  DonorActionButtons
} from "../components/CardComponents";
import DrawerFactory from "../components/DrawerFactory";
import { ImageLibrary } from "../components/ImageLibrary";

import "../style/DonorHome.css";

class DonorHome extends Component {
  render() {
    const storeState = this.props.store.getState();
    console.log("Charity");
    console.log(storeState.selectedCharity);

    const selectDonate = charity => () => {
      this.props.showRequest(true, charity);
    };
    const learnMore = recipient => () => {
      this.props.history.push({
        pathname: "/gift/" + recipient.gifts[0].ethGiftAddr,
        state: { recipient }
      });
    };

    const recipients = storeState.globalData.recipients;
    const cards = recipients.map((r, i) => {
      const gift = r.gifts[0];
      return (
        <CharityCard
          key={i}
          title={gift.title}
          description={gift.summary}
          image={ImageLibrary(r.image)}
          onImageClick={learnMore(gift)}
          preButtons={DonorPreButtons(gift.tags)}
          buttons={DonorActionButtons(learnMore(r), selectDonate(r))}
          postButtons={[]}
        />
      );
    });

    const drawerCharity = () => {
      if (Object.keys(storeState.updateDrawer.selectedCharity).length === 0) {
        return undefined;
      }
      return storeState.selectedCharity;
    };
    const drawer = (
      <DrawerFactory
        store={this.props.store}
        charity={drawerCharity()}
        type="donate"
      />
    );

    return <CardPage cards={cards} drawer={drawer} />;
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

DonorHome = connect(null, mapDispatchToProps)(DonorHome);

export default withRouter(DonorHome);
