import React, { ComponentType, FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NorthStarThemeProvider from 'aws-northstar/components/NorthStarThemeProvider';
import AppLayout from './components/AppLayout';
import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard';
import OrderForm from './components/OrderForm';

const withLayout = (Component: ComponentType): FunctionComponent => (props) => (
  <AppLayout>
    <Component {...props} />
  </AppLayout>);

const App = () => {
  return (
      <NorthStarThemeProvider>
        <Router>
          <Switch>
            <Route exact path='/data' component={withLayout(Analytics)}></Route>
            <Route exact path='/createOrder' component={withLayout(OrderForm)}></Route> 
            <Route exact path='/' component={withLayout(Dashboard)}></Route>
          </Switch>
        </Router>
      </NorthStarThemeProvider>
  );
}

export default App;
