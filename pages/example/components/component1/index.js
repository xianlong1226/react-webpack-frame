import { Provider, connect } from 'react-redux';

import { ActionType, CreateAction } from '../../action.js'

class Component1 extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { dispatch, list1, list2 } = this.props;
        return <div onClick={ text => CreateAction(ActionType.empty) }>子组件</div>
    }
}

function mapStateToProps(state){
  return { list1: state.todos1, list2: state.todos2 }
}
export default connect(mapStateToProps)(Component1);