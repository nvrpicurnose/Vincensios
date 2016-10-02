import moment from 'moment';

export function getSubscriptionInterval(currentUser){
	// use currentUser if we want to get custom user defined intervals

	// otherwise just get the upcoming week (starting on Monday) as intervals
	const currentWeek = moment(new Date()).isoWeek();
	const currentMonth = moment(new Date()).month();
	const startDate = moment(new Date()).month(currentMonth).week(currentWeek+2).startOf('day').toISOString();
	const endDate = moment(new Date()).month(currentMonth).week(currentWeek+3).startOf('day').toISOString();
	return {
		startDate: startDate,
		endDate: endDate
	}
}
