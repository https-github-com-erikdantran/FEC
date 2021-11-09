import React from 'react';
import axios from 'axios';

class ClickTracker extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.wrapWithClass = this.wrapWithClass.bind(this);
    //this.handleChildMounted = this.handleChildMounted.bind(this);
  }

  onClick (e) {
    let time = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(e.timestamp);
    console.log('You clicked ', this.props.element, time, this.props.module)
    // axios.post('/api/user/interaction', {element: this.props.element, time: time, widget: this.props.module})
    //   .then(results => {
    //     console.log('You clicked ', this.props.element, time, this.props.module)
    //   })
  }

  wrapWithClass (component) {
    return (
      class Test extends React.Component {
        render() {
          return component;
        }
      }
    )
  }
  // handleChildMounted(el, child) {
  //   const DOMNode = ReactDOM.findDOMNode(el);
  //   if (DOMNode) {
  //     DOMNode.addEventListener("click", this.handleEvent);
  //   }
  //   if (typeof child.ref === "function") {
  //     child.ref(el);
  //   }
  // };


  remapChildren(children) {
    const { onClick } = this;

    return React.Children.map(children, (child) => {
      if (typeof child.type === 'string') {
        // first case handles lowest level element
        return React.cloneElement(child, { onClick });
      }
      // else if (React.Children.count(child.props.children)) {
      //   // second case handles react child components we think
      //   console.log('Second case')
      //   return React.cloneElement(child, {
      //     children: this.remapChildren(child.props.children),
      //   });
      // }
      // not sure if this would be necessary
      //else if (child.type.prototype.render) {
      //   return React.cloneElement(child, { onClick });
      // }
      else {
        // if component has no react child components, render component and add onClick
        return React.createElement(this.wrapWithClass(child), { onClick });
      }
    });
  }

  render() {
    return this.remapChildren(this.props.children);
  }
}


export default ClickTracker;