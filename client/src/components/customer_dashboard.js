import React, {Component} from 'react';
import {connect} from 'react-redux';

class CustomerDashboard extends Component {
	
	render(){
		return (
			<div className='card card-block'>
				 CUSTOMER DASHBOARD
				 <h3>{this.props.currentCustomerUser.name}</h3>
				 <h5>{this.props.currentCustomerUser.email}</h5>
				 <h5>{this.props.currentCustomerUser.phone}</h5>
				 <img src={this.props.currentCustomerUser.profile_img} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		currentCustomerUser: state.auth.currentCustomerUser
	}
}

export default connect(mapStateToProps)(CustomerDashboard);