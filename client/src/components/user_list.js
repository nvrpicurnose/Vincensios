import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { fetchUsers, fetchMeals } from '../actions/content_actions';
import { goToChef } from '../actions/ui_actions';

class UserList extends Component {

	componentWillMount(){
		this.props.fetchUsers();		
	}

	goToChef(chef){
		this.props.goToChef(chef);
		this.props.fetchMeals(chef);
		browserHistory.push('/chef/'+chef._id);
	}


	renderUser(chef){
		return (
			<div className='card card-block' onClick={()=>this.goToChef(chef)} key={chef._id} >
				<h4 className='card-title'>{chef.name}</h4>
				<img className='chefCardImg' src={chef.cover_img} />
			</div>
		);
	}

	render(){
		return (
			<div className='user-list'>
				{this.props.chefs.map(this.renderUser.bind(this))}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		chefs: state.content.chefs
	}
}

/*function mapDispatchToProps(dispatch){
	fetchUsers: dispatch(fetchUsers)
}*/

export default connect(mapStateToProps, {fetchUsers, fetchMeals, goToChef})(UserList);