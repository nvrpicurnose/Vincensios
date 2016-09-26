// ES6 syntax
// a function that returns a function that returns a function
// all middleware follow a similar pattern of a {dispatch} and nested returned functions
export default function({dispatch}){
	return next => action => {
		if(!action.payload || !action.payload.then){
			next(action);
		}else{
			// Make sure the action's promise resolves
			action.payload
				.then(function(response){
					console.log(response);
					const newAction = {
						...action,
						payload: response
					}
					dispatch(newAction);
				});
		}
		
	}
}

// ES5 syntax
/*
export default function({dispatch}){
	return function(next){
		return function(action){
			console.log(action);
			next(action);
		}
	}
}
*/