/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.                                                                              *
 ******************************************************************************************************************** */
import { ComponentType, FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NorthStarThemeProvider from 'aws-northstar/components/NorthStarThemeProvider';
import AppLayout from './components/AppLayout';
import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard';
import OrderForm from './components/OrderForm';

const withLayout =
    (Component: ComponentType): FunctionComponent =>
    (props) =>
        (
            <AppLayout>
                <Component {...props} />
            </AppLayout>
        );

const App = () => {
    return (
        <NorthStarThemeProvider>
            <Router>
                <Switch>
                    <Route exact path="/data" component={withLayout(Analytics)}></Route>
                    <Route exact path="/createOrder" component={withLayout(OrderForm)}></Route>
                    <Route exact path="/" component={withLayout(Dashboard)}></Route>
                </Switch>
            </Router>
        </NorthStarThemeProvider>
    );
};

export default App;
