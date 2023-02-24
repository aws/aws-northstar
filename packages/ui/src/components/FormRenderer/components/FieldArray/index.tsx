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
import FormField from '@cloudscape-design/components/form-field';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import { FieldArray as FieldArrayBase } from '@data-driven-forms/react-form-renderer';
import getErrorText from '../../utils/getErrorText';
import useUniqueId from '../../../../hooks/useUniqueId';
import { Field } from '../../types';

const DEFAULT_ADD_BUTTON_TEXT = 'Add new item';
const DEFAULT_REMOVE_BUTTON_TEXT = 'Remove';

const FieldArray: FC<UseFieldApiConfig> = ({ ...props }) => {
    const { renderForm } = useFormApi();
    const {
        label,
        description,
        helperText,
        info,
        i18nStrings,
        stretch,
        secondaryControl,

        input,
        fields: formFields,

        isReadOnly,
        isDisabled,

        arrayValidator,

        maxItems = Number.MAX_SAFE_INTEGER,
        defaultItem,

        'data-testid': testId = 'field-array',

        validateOnMount,
        meta: { error, submitFailed },
        showError,

        ...rest
    } = useFieldApi<object[]>(props);
    const controlId = useUniqueId(input.name);
    const errorText = getErrorText(validateOnMount, submitFailed, showError, error);

    const definition = useMemo(() => {
        const fieldArrayItems = formFields.map((field: Field) => {
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
        return fieldArrayItems;
    }, [formFields, renderForm, input.name, isReadOnly, isDisabled, testId]);

    return (
        <FormField
            label={label}
            description={description}
            errorText={errorText}
            constraintText={helperText}
            info={info}
            i18nStrings={i18nStrings}
            stretch={stretch}
            secondaryControl={secondaryControl}
        >
            <FieldArrayBase key={controlId} name={controlId} validate={arrayValidator}>
                {({ fields }) => {
                    const { length, push, remove } = fields;

                    return (
                        <AttributeEditor
                            addButtonText={DEFAULT_ADD_BUTTON_TEXT}
                            removeButtonText={DEFAULT_REMOVE_BUTTON_TEXT}
                            disableAddButton={isDisabled || isReadOnly || (!!length && length >= maxItems)}
                            {...rest}
                            {...input}
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
        </FormField>
    );
};

export default memo(FieldArray);
