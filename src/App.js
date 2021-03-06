import React, { Component } from "react";
import { connect } from "react-redux";
import {
  HashRouter,
  Route,
  Switch // Displays the first route that matches
} from "react-router-dom";

import { ParallaxProvider } from "react-skrollr";

import Home from './containers/Home'
import Howitworks from './containers/Howitworks'
import Whoops404 from './containers/Whoops404'
import CharityHome from './containers/CharityHome'
import DonorHome from './containers/DonorHome'
import MerchantHome from './containers/MerchantHome'
import CreateRequest from './containers/CreateRequest'
import ThankYou from './containers/ThankYou'
import GiftPage from './containers/GiftPage'
import GetAllStats from './ethereum/components/GetAllStats'
import SelectMerchant from './containers/SelectMerchant'
import ItemReceived from './ethereum/components/ItemReceived'
import GetActiveGifts from "./containers/GetActiveGifts";
import Team from './containers/Team'
import {PollUserAddress, CancelPollUserAddress} from './components/User'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
    	light: "#49BBFF",
    	main: "#317EAC",
    	dark: "#245D7F",
    	contrastText: 'white',
    },
    secondary: {
    	light: "#FFBB49",
    	main: "#EDAE44",
    	dark: "#7F5E25",
    	contrastText: 'white',
    },
  },
  status: {
    danger: 'orange',
  },
});


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {
		PollUserAddress((account) => {
			this.setState({account})
		})
	}
	componentWillUnmount() {
		CancelPollUserAddress()
	}
	render() {
		return (
		  <MuiThemeProvider theme={theme}>
			<ParallaxProvider
				init={{
					smoothScrolling: true,
					smoothScrollingDuration: 1000,
					forceHeight: false
				}}
			>
				<HashRouter>
					<div className="main">
						<Switch>
							<Route
								exact
								path="/"
								component={Home} />

							<Route path="/home/team" component={Team} />

							<Route path="/home/howitworks" component={Howitworks} />
							
							<Route
								path="/home/donor"
								component={() => <DonorHome store={this.props.store} account={this.state.account}/>}
							/>

							<Route
								path="/home/charity"
								component={() => <CharityHome store={this.props.store} />}
							/>

							<Route
								path="/home/merchant"
								component={() => <MerchantHome store={this.props.store} account={this.state.account}/>}
							/>
							<Route
								path="/charity/:charityID/:userType"
								component={() => <GiftPage store={this.props.store} />}
							/>
							<Route
								path="/thanks"
								component={() => <ThankYou store={this.props.store} />}
							/>
							<Route
								path="/createrequest"
								component={() => <CreateRequest store={this.props.store} />}
							/>
							<Route
								path="/getallstats"
								component={() => <GetAllStats store={this.props.store} />}
							/>
							<Route
								path="/selectmerchant/:charityID"
								component={() => <SelectMerchant store={this.props.store} />}
							/>
							<Route
								path="/itemreceived"
								component={() => <ItemReceived store={this.props.store} />}
							/>
							<Route
								path="/getActiveGifts"
								component={() => <GetActiveGifts store={this.props.store} />}
							/>
							<Route component={Whoops404} />
						</Switch>
					</div>
				</HashRouter>
			</ParallaxProvider>
		  </MuiThemeProvider>
		)
	}
}

const mapStateToProps = state => {
  return state;
};

App = connect(mapStateToProps, null)(App);

export default App



