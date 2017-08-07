let Header = require('components/header');
let Left = require('components/left');
let Right = require('components/right');
let Footer = require('components/footer');

require('./style.less');

class Main extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return <div><Header /><div className="main"><Left /><Right>{this.props.children}</Right></div><Footer /></div>
    }
}

module.exports = Main;