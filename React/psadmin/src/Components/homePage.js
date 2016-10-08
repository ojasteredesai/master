  "use strict";

  var React = require('react');

  var Home = React.createClass({
    render: function() {
      return (
        <div className="jumbotron">
          <h1>Plural Sight Administration</h1>
          <p>React, React Router and Flux for ultra responsive web apps. Now from VSCode.</p>
        </div>
      );
    }
  });

  module.exports = Home;
