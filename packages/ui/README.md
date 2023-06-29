# NorthStar - Prototyping Design System

NorthStar is an open source design system with reusable React components for rapidly prototyping intuitive, meaningful and accessible user experience. It simplifies your work and ensures consistent, predictable user experience at scale for your customers. With NorthStar, you can focus on innovation and do more with less.

Whether you are a developer or a designer, NorthStar will help you delight your customers from inception to prototype.

NorthStar v2 improves upon the previous version by leveraging [Cloudscape Design System](https://cloudscape.design/) and with updates to the existing components with new features that make the development experience even better.  

## Before you start

Before you start using NorthStar for your project, please note that:

* NorthStar currently only supports the React framework. It supports the most recent versions of React, starting from 18.

* NorthStar supports the latest, stable releases of modern browsers - Chrome, Firefox and Safari.

* NorthStar is shipped with the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Installation

### Use in your React Project

```bash 
// with npm
npm install @aws-northstar/ui
npm install @cloudscape-design/components

// with yarn
yarn add @aws-northstar/ui
yarn add @cloudscape-design/components
```

## Setup

At the very top of your application, import the NorthStarThemeProvider component and render the NorthStarThemeProvider component.

```jsx static
import NorthStarThemeProvider from '@aws-northstar/v2/components/NorthStarThemeProvider';

export default () => (
    <NorthStarThemeProvider>
        ...redux provider, Apollo client provider, react router...
    </NorthStarThemeProvider>
);
```

## Usage
Here is a quick example to get you started to add a form with one input field to your app:

```jsx static
import React, { FC } from 'react';
import FormRenderer, { componentTypes, validatorTypes } from '@aws-northstar/ui/components/FormRenderer';

const MyComponent: FC = () => (
    <FormRenderer 
        onSubmit={console.log} 
        onCancel={console.log}
        schema={
            header: 'Submission Form',
            fields: [
                {
                    component: componentTypes.TEXT_FIELD,
                    name: 'email',
                    label: 'Email',
                    description: 'Email Address',
                    helperText: 'Enter a valid email address',
                    isRequired: true,
                    validate: [
                        {
                            type: validatorTypes.REQUIRED,
                        },
                        {
                            type: validatorTypes.PATTERN,
                            message: 'Invalid email address',
                            pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
                        },
                    ],
                },
            ],
        }
    />
);

export default MyComponent; 
```

This [documentation website](https://aws.github.io/aws-northstar/) has detailed examples on how to use each component. 

To learn React, check out the [React documentation](https://reactjs.org/).

## Support

We use [GitHub Issues](https://github.com/aws/aws-northstar/issues) as a bug tracker. If you think you have found a bug, please follow the **Submitting bugs** section in the [Contribution Guide](https://github.com/aws/aws-northstar/blob/main/CONTRIBUTING.md) and open an issue with detailed information about the issue.

## Sourcecode

If you are interested in our source code, our repo is at [https://github.com/aws/aws-northstar](https://github.com/aws/aws-northstar).

## Changelog

Check out the [Changelog](https://github.com/aws/aws-northstar/releases)
