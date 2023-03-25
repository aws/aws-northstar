### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-modal--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import { useState } from 'react';
import Button from 'aws-northstar/components/Button';

const ModalViewer = () => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Modal title="Modal" visible={visible} onClose={() => setVisible(false)}>
                Modal content goes here
            </Modal>
            <Button onClick={() => setVisible(true)}>Show Modal</Button>
        </>
    );
};

<ModalViewer />
```
