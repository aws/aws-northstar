# Example

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/advanced-components-jupyter-notebook-viewer--simple-notebook-view" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import React from 'react';
import JupyterNotebook from 'aws-northstar/advanced/JupyterNotebook';
import SampleNotebook from './sample-notebook';

<JupyterNotebook notebookData={JSON.stringify(SampleNotebook)}/>
```