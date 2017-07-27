require('./style.less');

const items = [
    {
        id:"p0",
        categoryTitle:"快速开始",
        items:[
            {id:"c0",title:"安装",url:"installation.html"},
            {id:"c1",title:"Hello World",url:"hello.html"},
            {id:"c2",title:"介绍JSX",url:"jsx.html"},
            {id:"c3",title:"渲染元素",url:"renderElement.html"},
            {id:"c4",title:"组件和Props",url:"component.html"},
            {id:"c5",title:"状态和生命周期",url:"statelife.html"},
            {id:"c6",title:"处理事件",url:"handleEvent.html"},
            {id:"c7",title:"条件渲染",url:"conditionalRender.html"},
            {id:"c8",title:"列表和keys",url:"list.html"},
            {id:"c9",title:"表单",url:"form.html"},
            {id:"c10",title:"提升state",url:"liftState.html"},
            {id:"c11",title:"组合和继承",url:"composition.html"},
            {id:"c12",title:"思考React",url:"think.html"}
        ]
    },
    {
        id:"p1",
        categoryTitle:"高级指导",
        items:[
            {id:"c0",title:"深层次的JSX",url:"depthjsx.html"},
            {id:"c1",title:"类型检查PropTypes",url:"proptypes.html"},
            {id:"c2",title:"Refs and the DOM",url:"refs.html"},
            {id:"c3",title:"Uncontrolled Components",url:"unchntrolled.html"},
            {id:"c4",title:"性能优化",url:"optimizing.html"},
            {id:"c5",title:"React Without ES6",url:""},
            {id:"c6",title:"React Without JSX",url:""},
            {id:"c7",title:"Reconciliation",url:""},
            {id:"c8",title:"Context",url:""},
            {id:"c9",title:"Web Components",url:""},
            {id:"c10",title:"Higher-Order Components",url:""}
        ]
    },
    {
        id:"p2",
        categoryTitle:"参考",
        items:[
            {id:"c0",title:"",url:""},
            {id:"c1",title:"",url:""},
            {id:"c2",title:"",url:""},
            {id:"c3",title:"",url:""},
            {id:"c4",title:"",url:""},
            {id:"c5",title:"",url:""},
        ]
    }
];

class Ul extends React.Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(item,e){
        return function(){
            e.preventDefault();
            console.log(item);
            location.href = item.url;
        }
    }
    render(){
        let listItems = this.props.items.map((item,index,arr) => 
            <li key={item.id} onClick={this.handleClick(item,event)}>{item.title}</li>
        );
        
        return <ul>{listItems}</ul>
    }
}

class Left extends React.Component{
    constructor(){
        super();
    }
    
    render(){
        let listItems = items.map((item,index,arr) => 
            <div key={item.id} className="section">
                <h3>{item.categoryTitle}</h3>
                <Ul items={item.items} />
            </div>
        );
        return <div className="left"><div className="items">{listItems}</div></div>
    }
}

module.exports = Left;