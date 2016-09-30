import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewMeal from './auth/new_meal';
import {delChef, delMeal} from '../actions/auth_chef_actions';
import { browserHistory } from 'react-router';

class ChefDashboard extends Component {

	deleteChef(){
		console.log(this.props.currentChefUser);
		this.props.delChef(this.props.currentChefUser);
		browserHistory.push('/');
	}
	
	renderMeals(meal){
		return (
			<div key={meal._id}>
				<h3>{meal.name}</h3>
				<img src={meal.cover_img} />
				<button onClick={()=>this.props.delMeal(meal)}>Delete Meal</button>
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
				 <button onClick={this.deleteChef.bind(this)} className='btn btn-danger'>Delete</button>
				 <img src={this.props.currentChefUser.profile_img} />
				<NewMeal chef={this.props.currentChefUser} />
				{
					this.props.currentChefMeals.map(this.renderMeals.bind(this))
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

export default connect(mapStateToProps, {delChef, delMeal})(ChefDashboard);