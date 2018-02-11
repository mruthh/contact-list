import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import ContactView from './contact-view';
import ContactList from './contact-list';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      contacts: [
        {id: 0, name: 'bart', email: 'hi@bart.com'},
        {id: 1, name: 'bat', email: 'notBart@bats.com'},
      ]
    }

  this.addContact = this.addContact.bind(this)
  }

  deleteContact = (contactToDelete) => {
    let confirm = window.confirm(`Are you sure you want to delete ${contactToDelete.name}?`);
    if (!confirm) {
      return
    } else {
      //first, use ID to find the index of the contact to be deleted in our state array
      let indexToUpdate = this.state.contacts.findIndex((contact) => {return contact.id === contactToDelete.id});

      //then make a copy array and remove the contact at the found index.
      let newContacts = this.state.contacts.slice();
      newContacts.splice(indexToUpdate, 1);
      this.setState({contacts: newContacts})
    }

  }

  updateContact = (updatedContact) => {
    //first, use ID to find the index of the contact to be updated in our state array
    let indexToUpdate = this.state.contacts.findIndex((contact) => {return contact.id === updatedContact.id});

    //then make a copy array and update the contact at the found index.
    let newContacts = this.state.contacts.slice();
    newContacts.splice(indexToUpdate, 1, updatedContact);

    //set the spliced array as the new value of state.contacts
    this.setState({contacts: newContacts})

  }

  addContact = (contact) => {
    this.setState({
      contacts: this.state.contacts.concat([contact])
    })
  }





  render () {
    return (
      <Switch>
        {/* render functions inside Route tags pass props to components */}
        <Route exact path='/' render = {() => <ContactList contacts={this.state.contacts} deleteContact={this.deleteContact} />}/>

        {/* Use spread operator to pass Router's match props to component page. The match props allow the component page to access its own id, which will be used to determine which contact to show. */}
        <Route path='/add' render = {(props) => <ContactView contacts={this.state.contacts} addContact={this.addContact} {...props} />} />

        <Route path='/:id' render = {(props) => <ContactView contacts={this.state.contacts} updateContact={this.updateContact} {...props} />} />

      </Switch>

    )
  }
}

/*WISHLIST
Prettier styling on contact view

When updating imageURL, do something nicer than broken image. Maybe don't have that one update on every change? (be sure to deal with submit function) - use img onerror (see MDN) for broken link handling

Page Headers for contact list and contact view
DRY up update and delete buttons
Router should send edit to contacts/id, not just /id
Default display when contact list first opens
VALIDATION

*/

const root = document.getElementById('root');

ReactDOM.render(
<BrowserRouter>
    <App />
</BrowserRouter>,
  root
);
