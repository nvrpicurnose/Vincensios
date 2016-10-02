import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

class ChefCalendar extends Component {

	renderPubs(pub){
		return (
			<div className='card card-block' key={pub._id}>
				<div className='mealTitle'>
					<h5>{pub.diner_name}</h5>
				</div>
			</div>
		);
	}

	renderPubMeals(meal){
		return (
			<div className='card card-block' key={meal._id}>
				<div className='mealTitle'>
					<h5>{meal.name}</h5>
				</div>
				<img className='mealImg' src={meal.cover_img} />
			</div>
		);
	}

	render(){
		return (
			<div className='kzCalender'>
				<div className='upcomingMeals'><h2>Planned Meals</h2></div>
				{/*{this.props.chefPubs.map((pub)=>this.renderPubs(pub))}*/}
				{this.props.chefPubMeals.map((meal)=>this.renderPubMeals(meal))}
			</div>
		);
	}
}

export default connect()(ChefCalendar);