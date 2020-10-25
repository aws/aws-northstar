### Examples

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
