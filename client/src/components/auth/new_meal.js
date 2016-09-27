import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as actions from '../../actions/index';

class NewMeal extends Component {

	submitMeal(){
		const newMeal = {
			chef_id: this.props.chef._id,
			name: this.refs.name.value,
			cover_img: this.refs.cover_img.value,
			desc: this.refs.desc.value,
			ingredients: this.refs.ingredients.value,
			tags: this.refs.tags.value,
		};
		this.props.submitNewMeal(newMeal);
	}

	render(){
		return (
			<div className='card card-block'>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput">Meal Name</label>
				    <input ref='name' type="text" className="form-control" placeholder="Spicy Coleslaw" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Cover Image</label>
				    <input ref='cover_img' type="text" className="form-control" placeholder="http://soupzoup.com/345f54/24sd35_345.jpg" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Description</label>
				    <input ref='desc' type="text" className="form-control" placeholder="A fragrant blend of..." />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Ingredients</label>
				    <input ref='ingredients' type="text" className="form-control" placeholder="beans, rice, carrots" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Tags</label>
				    <input ref='tags' type="text" className="form-control" placeholder="veggie, spicy" />
				  </div>
				  <button className='btn btn-primary' onClick={this.submitMeal.bind(this)}>Submit Application</button>
			</div>
		);
	}
}


export default connect(null, actions)(NewMeal);