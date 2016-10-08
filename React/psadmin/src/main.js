$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./Components/homePage');
var About = require('./Components/about/aboutPage');
var Header = require('./Components/common/header');
var Authors = require('./Components/authors/authorPage');

var App = React.createClass({
    render: function() {
        var Child;

        switch (this.props.route) {
            case 'about': Child = About; break;
            case 'authors': Child = Authors; break;          
            default: Child = Home; break;
        }
        return (
            <div>
                <Header/>
                <Child/>
            </div>
        );
    }
});

function render() {
    var route = window.location.hash.substr(1);
    React.render(<App route ={route} />, document.getElementById('app'));
}

window.addEventListener('hashchange', render);
render();
