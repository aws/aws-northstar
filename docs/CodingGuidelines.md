This documentation includes guidelines, best practices, programming styles and conventions that developers should adhere to when contributing to AWS NorthStar.

## General Guidelines

- Prettier and Eslint settings

We have setup [Prettier](https://prettier.io/) and [Eslint](https://eslint.org/) to maintain code quality. Please refer to `.prettierrc.json` and `.eslintrc.json` for detailed code format requirements. 

- Strict Mode

We have enabled Strict Mode in our top React scope to highlight potential problems in our codebase. Please address all the warnings that originate from our codebase. 

## React Components

- Use React FunctionComponent, React hooks and the Context API whenever possible

- Naming conventions
    - Props interfaces: `<ComponentName>Props`
    - Actions: 
        - Use `on<Action>` for component props
        - Use `handle<Action>` for action handlers

- Import dependencies in order: React -> external import -> internal import

    Example: 

    ```jsx static
    import React from 'react';
    import Box from '@material-ui/core/Box';
    ...
    import Button from '../Button';
    ...
    ```

- Use named default export for components

    ```jsx static
    export interface ComponentNameProps {
        prop1: type1;
        prop2: type2;
    }

    const ComponentName: React.FunctionComponent<ComponentNameProps> = ({prop1, prop2}) => {
        ...
        return ...;
    }

    export default ComponentName;
    ```

- Export the `<Component>Props` interface

- Support secondary level import

    If you expect consumers to import nested components, make sure you import and export nested components in your main component file. 

- Add an export in the file `src/components/index.tsx`

## CSS

- Update global theme file `src/themes/default.ts` to override default Material UI component styling so that all the components maintain consistent styling. 

    Please refer to [Material UI global theme customization documentation](https://material-ui.com/customization/globals/#css)

- Use the CSS settings from the theme whenever possible: No Magic Numbers

- Use px instead of rem for simplicity

- Responsive

    You can use the viewport plugin on our storybook to check whether the component is displayed correctly across different screen sizes. 

## Accessibility

We are working hard to ensure our components compliant with [WCAG2.1 standards and practices](https://www.w3.org/TR/WCAG21/). 

You can use the Accessibility plugin on our storybook to check whether there are violations in your component. 

We understand sometimes it is difficult to be 100% compliant due to limitations of third party dependencies or user experience design requirements. But we would like to know the gaps. Please include the identified gaps in your component description and your PR. 

Also, accessibility tests should be part of your unit tests. 

## Commit messages

We use [semantic-release](https://github.com/semantic-release/semantic-release) to automatically determine semantic version number and generate changelog. We follow [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). Please ensure your commit messages follow the conventions. Otherwise, our precommit hook will stop you from committing your code. 

## Before you create a PR

Please ensure that:

- There are descriptions for the component and all the props. 
- There are different test cases to unit test the components and accessibility. 
- A variety of examples are included to show users how they could use the component in the `<Component>.md` file.
- If applicable, general guidelines for the component are provided in the  `<Component>.md` file.
- Storybook entries cover different use cases
- If you add shared utility methods, methods and parameter lists need to be documented.
- Run command `npm run check:all` to ensure all the tests pass, code builds, storybook builds, and documentation builds. 
