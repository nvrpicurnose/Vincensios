import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewMeal from './auth/new_meal';

class ChefDashboard extends Component {
	
	renderMeals(meal){
		return (
			<div>
				<h3>{meal.name}</h3>
				<img src={meal.cover_img} />
			</div>
		);
	}
	
	render(){
		return (
			<div className='card card-block'>
				 CHEF DASHBOARD
				 <h3>{this.props.currentChefUser.name}</h3>
				 <h5>{this.props.currentChefUser.email}</h5>
				 <h5>{this.props.currentChefUser.phone}</h5>
				 <img src={this.props.currentChefUser.profile_img} />
				<NewMeal chef={this.props.currentChefUser} />
				{
					this.props.currentChefMeals.map(this.renderMeals)
				}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		currentChefUser: state.auth.currentChefUser,
		currentChefMeals: state.auth.currentChefMeals
	}
}

export default connect(mapStateToProps)(ChefDashboard);