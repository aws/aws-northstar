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
import { FC, memo, useMemo } from 'react';
import AttributeEditor from '@cloudscape-design/components/attribute-editor';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import { FieldArray as FieldArrayBase } from '@data-driven-forms/react-form-renderer';
import { Field } from '../../types';
import withDataDrivenFormField, { DataDrivenFormFieldProps } from '../../withDataDrivenFormField';

const DEFAULT_ADD_BUTTON_TEXT = 'Add new item';
const DEFAULT_REMOVE_BUTTON_TEXT = 'Remove';

const FieldArray: FC<DataDrivenFormFieldProps> = ({ ...props }) => {
    const { renderForm } = useFormApi();

    const {
        input,
        fields,
        isReadOnly,
        isDisabled,
        arrayValidator,
        maxItems = Number.MAX_SAFE_INTEGER,
        defaultItem,
        'data-testid': testId = 'field-array',
        controlId,
    } = props;

    const definition = useMemo(() => {
        return fields.map((field: Field) => {
            const { label, name, ...rest } = field;
            return {
                label: label,
                control: (_item: any, itemIndex: number) => {
                    return renderForm([
                        {
                            ...rest,
                            isReadOnly,
                            isDisabled,
                            name: `${input.name}[${itemIndex}].${name}`,
                            'data-testid': `${testId}[${itemIndex}].${name}`,
                        },
                    ]);
                },
            };
        });
    }, [fields, renderForm, input.name, isReadOnly, isDisabled, testId]);

    return (
        <FieldArrayBase key={controlId} name={controlId} validate={arrayValidator}>
            {({ fields }) => {
                const { length, push, remove } = fields;

                return (
                    <AttributeEditor
                        addButtonText={DEFAULT_ADD_BUTTON_TEXT}
                        removeButtonText={DEFAULT_REMOVE_BUTTON_TEXT}
                        disableAddButton={isDisabled || isReadOnly || (!!length && length >= maxItems)}
                        {...props}
                        {...props.input}
                        isItemRemovable={() => {
                            return !isDisabled && !isReadOnly;
                        }}
                        items={input.value || []}
                        definition={definition}
                        onAddButtonClick={() => push(defaultItem || {})}
                        onRemoveButtonClick={({ detail: { itemIndex } }) => remove(itemIndex)}
                    />
                );
            }}
        </FieldArrayBase>
    );
};

export default memo(withDataDrivenFormField(FieldArray));
