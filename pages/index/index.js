let Main = require('components/main');

require('./style.less');

class App extends React.Component{
  constructor(){
    super();
  }
  render(){
    return <Main><div>
    <h1>Hello World</h1>
    <p>该框架中，我已经将React和ReactDOM配置为全局变量了，你可以在模块中直接使用。</p>
    <p>上面的代码将h1标签渲染到id为root的标签中，所以你的html文件中需要一个id为root的标签。</p>
    </div></Main>
  }
}

$(function(){
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});