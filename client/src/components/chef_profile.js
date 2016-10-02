import React, {Component} from 'react';
import {connect} from 'react-redux';
import {subscribeChef} from '../actions/auth_user_actions';
import {getSubscriptionInterval} from '../apis/userDetailsAPI'
import moment from 'moment';

class ChefProfile extends Component {

	renderMeals(meal){
		return (
			<div className='card card-block' key={meal._id}>
				<div className='mealTitle'>
					<h5>{meal.name}</h5>
					{moment(meal.deliveryDate).fromNow()}
				</div>
				<img className='mealImg' src={meal.cover_img} />
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
				<div className='chefProfileSummary'>
					<img className='chefProfileImg' src={this.props.chef.profile_img} />
					<div className='chefProfileInfo'>
						<h4 className='card-title'>{this.props.chef.name}</h4>
						<h5>{this.props.chef.phone}</h5>
						<h6>{this.props.chef.email}</h6>
					</div>
				</div>
					{
						this.props.chef._id !== this.props.currentUser._id ?
						<button className='btn btn-primary btn-block' onClick={this.subscribeToChef.bind(this)}>Subscribe For Next Week</button> :
						null
					}
					{this.props.subscriptionMessage}
				<div className='mealList'>
					{this.props.meals.map(this.renderMeals.bind(this))}
				</div>
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