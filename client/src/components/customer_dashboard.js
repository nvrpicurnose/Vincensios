import React, {Component} from 'react';
import {connect} from 'react-redux';
import DinerCalendar from './calendar/dinerCalendar';
import { loadAsyncPastSubscriptions, loadAsyncFutureSubscriptions } from '../actions/auth_user_actions';

class CustomerDashboard extends Component {
	
	componentWillMount(){
		this.props.loadAsyncFutureSubscriptions(this.props.currentUser);
	}

	render(){
		return (
			<div className='card card-block'>
				<div className='chefProfileSummary'>
					 <img className='chefProfileImg' src={this.props.currentUser.profile_img} />
					 <div className='chefProfileInfo'>
						 <h3>{this.props.currentUser.name}</h3>
						 <h5>{this.props.currentUser.email}</h5>
						 <h5>{this.props.currentUser.phone}</h5>
					 </div>
				</div>
				<DinerCalendar dinerSubs={this.props.dinerSubs} dinerSubMeals={this.props.dinerSubMeals} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		currentUser: state.auth.currentUser,
		dinerSubs: state.calendar.dinerSubs,
		dinerSubMeals: state.calendar.dinerSubMeals
	}
}

export default connect(mapStateToProps, {loadAsyncPastSubscriptions, loadAsyncFutureSubscriptions})(CustomerDashboard);