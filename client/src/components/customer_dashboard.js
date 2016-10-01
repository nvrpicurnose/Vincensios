import React, {Component} from 'react';
import {connect} from 'react-redux';
import DinerCalendar from './calendar/calendar';

class CustomerDashboard extends Component {
	
	render(){
		return (
			<div className='card card-block'>
				 CUSTOMER DASHBOARD
				 <h3>{this.props.currentUser.name}</h3>
				 <h5>{this.props.currentUser.email}</h5>
				 <h5>{this.props.currentUser.phone}</h5>
				 <img src={this.props.currentUser.profile_img} />
				 <DinerCalendar />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		currentUser: state.auth.currentUser
	}
}

export default connect(mapStateToProps)(CustomerDashboard);