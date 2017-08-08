import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ToDoForm from './components/item/ToDoForm';
import ToDoEditForm from './components/item/ToDoEditForm';
import About from './components/about/About';
import ToDoList from './components/list/ToDoList';

const routes = [
  <IndexRoute component={ToDoList} key="listing"/>,
  <Route key="about"path="/about" component={About}/>,
  <Route key="create" path="/create" component={ToDoForm}/>,
  <Route key="edit" path="/edit/:id" component={ToDoEditForm}/>
];

export default routes;