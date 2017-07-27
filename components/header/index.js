require('./style.less');

class Header extends React.Component{
    constructor(){
        super();
    }
    render(){
        let bgImage = require('./images/logo.jpg')
        let bg = {
            background: `url(${bgImage})`
        }
        return <div className="header" style={bg} >React教程-曽宪龙</div>
    }
}

module.exports = Header;
