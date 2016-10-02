import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import NewMeal from './auth/new_meal';
import {delChef, delMeal, myKitchenMeals, loadAsyncPastPublications, loadAsyncFuturePublications} from '../actions/auth_chef_actions';
import ChefCalendar from './calendar/chefCalendar';

class ChefDashboard extends Component {
	constructor(props) {
	    super(props);
	    this.state = { mealForm: false };
	}
	componentWillMount(){
		this.props.myKitchenMeals(this.props.currentUser);
		this.props.loadAsyncFuturePublications(this.props.currentUser);
	}

	triggerMealForm(){
		this.setState({mealForm: !this.state.mealForm});
	}

	deleteChef(){
		console.log(this.props.currentUser);
		this.props.delChef(this.props.currentUser);
		browserHistory.push('/');
	}
	
	renderMeals(meal){
		return (
			<div key={meal._id}>
				<h3>{meal.name}</h3>
				<img src={meal.cover_img} />
				{meal.deliveryDate}
				<button onClick={()=>this.props.delMeal(meal)}>Delete Meal</button>
			</div>
		);
	}

	renderMealForm(){
		if(this.state.mealForm){
			return (
				<NewMeal chef={this.props.currentUser} triggerMealForm={this.triggerMealForm.bind(this)} />
			);
		}else{
			return (
				<button onClick={this.triggerMealForm.bind(this)} className='btn btn-primary btn-block'>New Meal</button>
			);
		}
	}

	renderDiners(pub){
		if(typeof pub !== 'undefined'){
			return (
				<div className='subbedChef' key={pub._id}>
					{pub.name}
				</div>
			);
		}else{
			return;
		}
	}

	render(){
		return (
			<div className='card card-block'>
				<div className='chefProfileSummary'>
				 	<img className='chefProfileImg' src={this.props.currentUser.profile_img} />
					<div className='chefProfileInfo'>
						 <h3>{this.props.currentUser.name}</h3>
						 <h5>{this.props.currentUser.email}</h5>
						 <h5>{this.props.currentUser.phone}</h5>
					</div>
				</div>
				{/*<button onClick={this.deleteChef.bind(this)} className='btn btn-danger'>Delete User</button>*/}
				<div className='pubServing'>
					<h5>This week serving..</h5>
					{this.props.chefPubs.map(pub=>this.renderDiners(pub))}
				</div>
				{this.renderMealForm()}
				{this.renderDiners()}
				<ChefCalendar chefPubs={this.props.chefPubs} chefPubMeals={this.props.chefPubMeals} />
				{/*ALL MEALS
								{
									this.props.currentCookedMeals.map(this.renderMeals.bind(this))
								}*/}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		currentUser: state.auth.currentUser,
		currentCookedMeals: state.auth.currentCookedMeals,
		chefPubs: state.calendar.chefPubs,
		chefPubMeals: state.calendar.chefPubMeals
	}
}

export default connect(mapStateToProps, {delChef, delMeal, myKitchenMeals, loadAsyncPastPublications, loadAsyncFuturePublications})(ChefDashboard);