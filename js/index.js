'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function Card(props) {
  return React.createElement(
    'div',
    { style: { margin: '1em' } },
    React.createElement('img', { width: '75', src: props.avatar_url }),
    React.createElement(
      'div',
      { style: { display: 'inline-block', marginLeft: '10' } },
      React.createElement(
        'div',
        { style: { fontSize: '1.2em', fontWeight: 'bold' } },
        props.name
      ),
      React.createElement(
        'div',
        null,
        ' ',
        props.company
      )
    )
  );
};

var CardList = function CardList(props) {
  return React.createElement(
    'div',
    null,
    props.cards.map(function (card) {
      return React.createElement(Card, card);
    })
  );
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { userName: '' };
    return _this;
  }

  Form.prototype.handleSubmit = function handleSubmit(event) {
    var _this2 = this;

    console.log('username' + this.userNameInput.value);
    axios.get('https://api.github.com/users/' + this.state.userName).then(function (resp) {
      // console.log(resp)
      _this2.props.onSubmit(resp.data);
    });
  };

  Form.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      'form',
      { onSubmit: function onSubmit(event) {
          event.preventDefault(), _this3.handleSubmit();
        } },
      React.createElement('input', { ref: function ref(input) {
          return _this3.userNameInput = input;
        }, value: this.state.userName, onChange: function onChange(event) {
          return _this3.setState({ userName: event.target.value });
        }, type: 'text', placeholder: 'github Username', required: true }),
      React.createElement(
        'button',
        { type: 'submit' },
        'Add Card'
      )
    );
  };

  return Form;
}(React.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this4 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this4.state = {
      Cards: [] };
    return _this4;
  }

  App.prototype.addNewCard = function addNewCard(cardInfo) {
    console.log(cardInfo);

    this.setState(function (prevState) {
      return { Cards: prevState.Cards.concat(cardInfo) };
    });
  };

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(Form, { onSubmit: this.addNewCard.bind(this) }),
      React.createElement(CardList, { cards: this.state.Cards })
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));