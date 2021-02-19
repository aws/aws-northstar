With NorthStar, you can easily design and develop your UI applications.

## Before you start

Before you start using NorthStar for your project, please note that:

* NorthStar currently only supports the React framework. It supports the most recent versions of React, starting from 16.12.0.

* NorthStar supports the latest, stable releases of modern browsers - Chrome, Firefox and Safari.

* NorthStar should be used as a rapid prototyping and design tool to ensure a consistent and repeatable design for your applications. Whilst NorthStar has been built from the ground up using best practices, you should carefully consider the use of NorthStar in a production environment.

* NorthStar is shipped with the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Installation

### Use in your React Project

```bash 
// with npm
npm install aws-northstar

// with yarn
yarn add aws-northstar
```

Please refer to the **Examples** session for an example project built by [Create React App](https://reactjs.org/docs/create-a-new-react-app.html).

## Setup

At the very top of your application, import the NorthStarThemeProvider component and render the NorthStarThemeProvider component.

```jsx static
import NorthStarThemeProvider from 'aws-northstar/components/NorthStarThemeProvider';

export default () => (
    <NorthStarThemeProvider>
        ...redux provider, Apollo client provider, react route...
    </NorthStarThemeProvider>
);
```

### Font Family

The default font family at NorthStar is `"Roboto", "Helvetica Neue", "HelveticaNeue", "Helvetica", "Arial", sans-serif`. The Roboto font will **not** be automatically loaded by NorthStar. `Roboto` is used if it has been installed in users' browsers. Otherwise, the next fallback font `Helvetica Neue` is used. If you want to ensure `Roboto` font is in place, you can add:

```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

to the header of your public index.html file to instruct the browser to load the font from CDN. 

## Usage
Here is a quick example to get you started:

```jsx static
import React, { FunctionComponent } from 'react';
import Button from 'aws-northstar/components/Button';

const MyComponent: FunctionComponent = () => (
    <Button variant="primary">Hello World</Button>
);

export default MyComponent; 
```

This documentation website has detailed examples on how to use each component. 

To learn React, check out the [React documentation](https://reactjs.org/).

## Examples

### Create React App

This example demonstrates how you can setup NorthStar in a React application created by [Create React App](https://reactjs.org/docs/create-a-new-react-app.html).  

Download the example:

```markdown
mkdir northstar && cd northstar
curl https://northstar.aws-prototyping.cloud/examples/create-react-app.tar.gz | tar -xz && cd create-react-app
```

Install it and run:

```markdown
npm install
npm start
```

## Support

We use [GitHub Issues](https://github.com/aws/aws-northstar/issues) as a bug tracker. If you think you have found a bug, please follow the **Submitting bugs** section in the [Contribution Guide](https://northstar.aws-prototyping.cloud/#/Contribution%20Guide) and open an issue with detailed information about the issue.

## Sourcecode

If you are interested in our source code, our repo is at [https://github.com/aws/aws-northstar](https://github.com/aws/aws-northstar).

We welcome your contribution to NorthStar. Please check our [Contribution Guide](https://northstar.aws-prototyping.cloud/#/Contribution%20Guide) for more details. As a community run project, we rely on your contribution.

## Changelog

Check out the [Changelog](https://github.com/aws/aws-northstar/releases)
