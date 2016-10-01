import React, {Component} from 'react';
import {connect} from 'react-redux';

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

	render(){
		return (
			<div className='card card-block'>
				<h4 className='card-title'>{this.props.chef.name}</h4>
				<img className='chefCardImg' src={this.props.chef.profile_img} />
				<h5>{this.props.chef.phone}</h5>
				<h6>{this.props.chef.email}</h6>
				{this.props.meals.map(this.renderMeals)}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		chef: state.content.current_chef,
		meals: state.content.meals
	}
}

export default connect(mapStateToProps)(ChefProfile);