import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

class ChefCalendar extends Component {

	renderPubs(pub){
		return (
			<div key={pub._id}>
				{pub.diner_name}
			</div>
		);
	}

	renderPubMeals(meal){
		return (
			<div key={meal._id}>
				{meal.name}
				<img src={meal.cover_img} />
			</div>
		);
	}

	render(){
		return (
			<div className='kzCalender'>
				<h2>CHEF CALENDER - Upcoming Meals</h2>
				{this.props.chefPubs.map((pub)=>this.renderPubs(pub))}
				{this.props.chefPubMeals.map((meal)=>this.renderPubMeals(meal))}
			</div>
		);
	}
}

export default connect()(ChefCalendar);