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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import { FieldArray as FieldArrayBase } from '@data-driven-forms/react-form-renderer';
import { makeStyles } from '@material-ui/core/styles';
import FormField from '../../../FormField';
import Text from '../../../Text';
import Button from '../../../Button';
import Stack from '../../../../layouts/Stack';
import FieldArrayItem from './components/FieldArrayItem';
import { getErrorText } from '../../utils/getErrorText';
import useUniqueId from '../../../../hooks/useUniqueId';
import Container from '../../../../layouts/Container';

const DEFAULT_BUTTON_LABELS = {
    add: 'Add new item',
    remove: 'Remove',
};

const useStyles = makeStyles({
    grid: {
        marginTop: '-10px',
        '&>*': {
            marginTop: '10px',
        },
    },
});

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
        displayLablePerItem = false,
        minItems = 0,
        maxItems = Number.MAX_SAFE_INTEGER,
        buttonLabels,
        renderContainer = false,
        noItemsMessage,
        validateOnMount,
        input,
        isReadOnly = false,
        ...rest
    } = useFieldApi(props);
    const controlId = useUniqueId(input.name);
    const errorText = getErrorText(validateOnMount, submitFailed, showError, error);
    const renderedButtonLabels = { ...DEFAULT_BUTTON_LABELS, ...buttonLabels };
    const theme = useTheme();
    const matched = useMediaQuery(theme.breakpoints.down('xs'));
    const styles = useStyles();

    const testId = rest['data-testid'] || 'form-array';

    return (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            hintText={helperText}
            errorText={errorText}
            data-testid={testId}
        >
            <FieldArrayBase key={controlId} name={controlId} validate={arrayValidator}>
                {({ fields }) => {
                    const { length, map, push, remove } = fields;
                    return (
                        <Stack spacing="s">
                            {length === 0 && <Text>{noItemsMessage}</Text>}
                            {map((name: string, index: number) => {
                                const item = (
                                    <FieldArrayItem
                                        gridStyle={styles.grid}
                                        layout={layout}
                                        key={`Item-${name}`}
                                        fields={formFields}
                                        name={name}
                                        fieldIndex={index}
                                        showError={showError}
                                        displayLablePerItem={displayLablePerItem}
                                        onRemove={remove}
                                        length={length}
                                        minItems={minItems}
                                        removeLabel={renderedButtonLabels.remove}
                                        isReadOnly={isReadOnly}
                                        collapse={layout === 'stack' || matched}
                                        data-testid={`${testId}-${name}`}
                                    />
                                );

                                return renderContainer ? <Container key={`Container-${name}`}>{item}</Container> : item;
                            })}
                            {!isReadOnly && (
                                <Button
                                    onClick={() => push(defaultItem)}
                                    disabled={!!length && length >= maxItems}
                                    data-testid={`${testId}-add-button`}
                                >
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
