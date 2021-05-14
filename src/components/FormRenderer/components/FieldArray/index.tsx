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
import React, { FunctionComponent } from 'react';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import { FieldArray as FieldArrayBase } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import FormField from '../../../FormField';
import Text from '../../../Text';
import Button from '../../../Button';
import Stack from '../../../../layouts/Stack';
import FieldArrayItem from './components/FieldArrayItem';

const DEFAULT_BUTTON_LABELS = {
    add: 'Add new item',
    remove: 'Remove',
};

const FieldArrayMapping: FunctionComponent<UseFieldApiConfig> = (props) => {
    const {
        arrayValidator,
        label,
        description,
        helperText,
        fields: formFields,
        defaultItem = {},
        showError,
        meta: { submitFailed, error },
        layout,
        minItems = 0,
        maxItems = Number.MAX_SAFE_INTEGER,
        buttonLabels,
        noItemsMessage,
        validateOnMount,
        input,
        isReadOnly = false,
    } = useFieldApi(props);

    const errorText =
        (validateOnMount || submitFailed || showError) && error && typeof error === 'string' ? error : undefined;
    const controlId = input.name ? input.name : uuidv4();
    const renderedButtonLabels = { ...DEFAULT_BUTTON_LABELS, ...buttonLabels };

    return (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            hintText={helperText}
            errorText={errorText}
        >
            <FieldArrayBase key={controlId} name={controlId} validate={arrayValidator}>
                {({ fields }) => {
                    const { length, map, push, remove } = fields;
                    return (
                        <Stack spacing="s">
                            {length === 0 && <Text>{noItemsMessage}</Text>}
                            {map((name: any, index: number) => {
                                return (
                                    <FieldArrayItem
                                        layout={layout}
                                        key={name}
                                        fields={formFields}
                                        name={name}
                                        fieldIndex={index}
                                        showError={showError}
                                        onRemove={remove}
                                        length={length}
                                        minItems={minItems}
                                        removeLabel={renderedButtonLabels.remove}
                                        isReadOnly={isReadOnly}
                                    />
                                );
                            })}
                            {!isReadOnly && (
                                <Button onClick={() => push(defaultItem)} disabled={!!length && length >= maxItems}>
                                    {renderedButtonLabels.add}
                                </Button>
                            )}
                        </Stack>
                    );
                }}
            </FieldArrayBase>
        </FormField>
    );
};

export default FieldArrayMapping;
