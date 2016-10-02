import React, {Component} from 'react';
import {connect} from 'react-redux';
import {subscribeChef} from '../actions/auth_user_actions';
import {getSubscriptionInterval} from '../apis/userDetailsAPI'

class ChefProfile extends Component {

	renderMeals(meal){
		return (
			<div key={meal._id}>
				<h3>{meal.name}</h3>
				{meal.deliveryDate}
				<img src={meal.cover_img} />
			</div>
		);
	}
	
	subscribeToChef(){
		// get the subscription interval for this chef
		const subInterval = this.props.getSubscriptionInterval(this.props.currentUser);
		this.props.subscribeChef(
			this.props.chef, 
			this.props.currentUser,
			subInterval.startDate,
			subInterval.endDate
		)
	}

	render(){
		return (
			<div className='card card-block'>
				<h4 className='card-title'>{this.props.chef.name}</h4>
				<img className='chefCardImg' src={this.props.chef.profile_img} />
				<h5>{this.props.chef.phone}</h5>
				<h6>{this.props.chef.email}</h6>
				{
					this.props.chef._id !== this.props.currentUser._id ?
					<button onClick={this.subscribeToChef.bind(this)}>Subscribe For Next Week</button> :
					null
				}
				{this.props.subscriptionMessage}
				{this.props.meals.map(this.renderMeals.bind(this))}
			</div>
		);
	}
}
	
function mapStateToProps(state){
	return {
		chef: state.content.current_chef,
		meals: state.content.meals,
		currentUser: state.auth.currentUser,
		subscriptionMessage: state.calendar.subscriptionMessage,
		getSubscriptionInterval: getSubscriptionInterval
	}
}

export default connect(mapStateToProps, {subscribeChef})(ChefProfile);