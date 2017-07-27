require('./style.less');

class Main extends React.Component{
    constructor(){
        super();
    }
    
    render(){
        return <div className="right">{this.props.children}</div>
    }
}

module.exports = Main;