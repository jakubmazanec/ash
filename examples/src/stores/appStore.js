import ash from 'ash';
import Immutable from 'immutable';



export default ash.Stream.from(new Immutable.Map({
	appShadow: false,
	list1Shadow: false,
	list2Shadow: false
}));
