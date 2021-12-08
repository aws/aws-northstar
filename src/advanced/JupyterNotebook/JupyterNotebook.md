# Example

**More examples** are available on <a href="http://localhost:9090/?path=/story/jupyter-notebook-viewer--simple-notebook-view" target="_blank">NorthStar Storybook</a>.

```jsx
import React from 'react';
import JupyterNotebook from '.';

import SampleNotebook from './sample-notebook';

export default {
    component: JupyterNotebook,
    title: 'Jupyter Notebook Viewer',
};

export const SimpleNotebookView = () => (
    <JupyterNotebook notebookData={JSON.stringify(SampleNotebook)}/>
);
```