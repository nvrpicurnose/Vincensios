import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

class DinerCalendar extends Component {

	renderSubMeals(meal){
		return (
			<div className='card card-block' key={meal._id}>
				<div className='mealTitle'>
					<h5>{meal.name}</h5>
					Cooked by {meal.chef_name} {moment(meal.deliveryDate).fromNow()}
				</div>
				<img className='mealImg' src={meal.cover_img} />
			</div>
		);
	}

	renderSubs(sub){
		return (
			<div className='subbedChef' key={sub._id}>
				<h5>{sub.chef_name}</h5>
			</div>
		);
	}

	render(){
		return (
			<div className='kzCalender'>
				{/*<div className='subscribedTo'><h4>Subscribed To</h4></div>
				{this.props.dinerSubs.map(sub=>this.renderSubs(sub))}*/}
				<div className='upcomingMeals'><h2>Upcoming Meals</h2></div>
				{this.props.dinerSubMeals.map(meal=>this.renderSubMeals(meal))}
			</div>
		);
	}
}

export default connect()(DinerCalendar);