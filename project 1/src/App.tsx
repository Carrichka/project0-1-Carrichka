import React from 'react';
import './App.css';
import  AllUsers  from './components/all-users/all-users.component';
import Reimbursements from './components/all-reimbursements/all-reimbursements.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavComponent } from './components/app-nav/app-nav.component';
import { HomeComponent } from './components/home/home.component';
import { SignIn } from './components/sign-in/signin.component';
import Cards from './components/cards/cards.component';
import  PendingReimbursements  from './components/pending-reimbursements/pending-reimbursements.components';
import { ChuckNorrisComponent } from './components/norris/chucknorris.component';
import { Pokemon } from './components/pokemon/pokemon.component';
import { Clicker } from './components/clicker/clicker.component';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div className="App">
    <NavComponent />
    {/* The switch will only render the first route to match */}
    <Switch>
      <Route path ="/home" component = {HomeComponent}/>
      <Route path ="/sign-in" component = {SignIn}/>
      <Route path ="/allusers" component = {AllUsers}/>
      <Route path ="/reimbursements" component = {Reimbursements}/>
      <Route path ="/clicker" component = {Clicker}/>
      <Route path ="/cards" component = {Cards}/>
      <Route path ="/pending" component = {PendingReimbursements}/>
      <Route path ="/chuck-norris" component = {ChuckNorrisComponent}/>
      <Route path ="/pokemon" component = {Pokemon}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
