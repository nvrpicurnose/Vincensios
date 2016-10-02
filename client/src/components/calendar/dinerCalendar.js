import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

class DinerCalendar extends Component {

	renderSubMeals(meal){
		return (
			<div key={meal._id}>
				{meal.name}
				{meal.deliveryDate}
				<img src={meal.cover_img} />
			</div>
		);
	}

	renderSubs(sub){
		return (
			<div key={sub._id}>
				{sub.chef_name}
			</div>
		);
	}

	render(){
		return (
			<div className='kzCalender'>
				<h2>CALENDER - Upcoming Meals</h2>
				{this.props.dinerSubMeals.map(meal=>this.renderSubMeals(meal))}
				<h3>Subscribed To</h3>
				{this.props.dinerSubs.map(sub=>this.renderSubs(sub))}
			</div>
		);
	}
}

export default connect()(DinerCalendar);