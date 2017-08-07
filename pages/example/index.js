import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers/index.js';
import { ActionType, CreateAction } from './action.js'

import Component1 from './components/component1/index.js';

require('./style.less');

const store = createStore(rootReducer);

class App extends React.Component{
  	constructor(props){
    	super(props);
    	console.log(props);
    	this.asyncHandle = this.asyncHandle.bind(this)
  	}
  	asyncHandle(){
    	const { dispatch, list1, list2 } = this.props;
    	setTimeout(function(){
      		dispatch(CreateAction(ActionType.init, [{name: 'name1', value: 'value1'},{name: 'name2', value: 'value2'}]))
    	},2000)
  	}
  	render(){
    	const { dispatch, list1, list2 } = this.props;
    	let lis = [];
    	list1.forEach(function(element) {
      		lis.push(<li key={element.value}>{element.name}</li>);
    	})
    	return <div>
      		<Component1></Component1>
      		<ul>
        	{ lis }
      		</ul>
      		<button onClick={ btn => dispatch(CreateAction(ActionType.add, { name: 'zeng', value: 1 })) }>add</button>
      		<button onClick={ btn => dispatch(CreateAction(ActionType.empty)) }>empty</button>
      		<button onClick={ this.asyncHandle }>asyncHandle</button>
    	</div>
  	}
}
function mapStateToProps(state){
  	return { list1: state.todos1, list2: state.todos2 }
}
const App1 = connect(mapStateToProps)(App);

$(function(){
  	ReactDOM.render(
    	<Provider store={store}>
      		<App1 />
    	</Provider>,
    	document.getElementById('root')
  	);

  	setTimeout(function(){
    	store.dispatch({type: 'init', data: [{name: 'name0', value: 'value0'}]});
  	},1000)
});