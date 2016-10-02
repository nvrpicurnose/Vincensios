import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { loadAsyncPastSubscriptions, loadAsyncFutureSubscriptions } from '../../actions/auth_user_actions';

class DinerCalendar extends Component {

	componentWillMount(){
		this.props.loadAsyncPastSubscriptions(this.props.currentUser);
	}

	
	render(){
		return (
			<div className='kzCalender'>
				CALENDER
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		currentUser: state.auth.currentUser,
		dinerSubs: state.auth.dinerSubs
	}
}

export default connect(mapStateToProps, {loadAsyncPastSubscriptions, loadAsyncFutureSubscriptions })(DinerCalendar);