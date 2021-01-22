### Examples

Log the item when dismissed
```jsx
const items = [
  { label: 'A token', value: '1' },
  { label: 'Another token', value: '2' },
];

<TokenGroup items={items} onDismiss={(item) => console.log('Item was dismissed', item)} />
```

An example of adding and removing tokens
```jsx
import { useState } from 'react';
import Inline from "aws-northstar/layouts/Inline";
import Stack from "aws-northstar/layouts/Stack";
import Button from "aws-northstar/components/Button";
import Input from "aws-northstar/components/Input";

const WithManagedState = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([
    { label: 'A token', value: 'A token' },
    { label: 'Another token', value: 'Another token' },
  ]);

  return (
      <Stack>
          <Inline>
              <Input value={inputValue} onChange={setInputValue} placeholder="Add a token..." />
              <Button variant="primary" onClick={() => setItems([ ...items, { label: inputValue, value: inputValue } ])}>Add Token</Button>
          </Inline>
          <TokenGroup items={items} onDismiss={(item) => {
              const index = items.indexOf(item);
              setItems([...items.slice(0, index), ...items.slice(index + 1)])
          }} />
      </Stack>
  );
};

<WithManagedState />
```
