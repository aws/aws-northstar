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
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import { RenderProps, componentTypes } from '../../types';
import { useFormRendererContext } from '../../formRendererContext';

const FormTemplate: FC<RenderProps> = ({ formFields, schema }) => {
    const { handleSubmit, onCancel, onReset } = useFormApi();
    const {
        cancelLabel = 'Cancel',
        canCancel = true,
        submitLabel = 'Submit',
        resetLabel = 'Reset',
        canReset = false,
        fields,

        header,
        headerVariant = 'h1',
        info,
        description,

        ...rest
    } = schema;
    const { isSubmitting } = useFormRendererContext();

    const actions = (
        <SpaceBetween direction="horizontal" size="xs">
            {canCancel && (
                <Button variant="link" onClick={onCancel} disabled={isSubmitting}>
                    {cancelLabel}
                </Button>
            )}
            {canReset && (
                <Button variant="normal" onClick={onReset} disabled={isSubmitting}>
                    {resetLabel}
                </Button>
            )}
            <Button
                variant="primary"
                loading={isSubmitting}
                onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }}
            >
                {submitLabel}
            </Button>
        </SpaceBetween>
    );

    const actionsVisible = useMemo(() => {
        return !(fields.length > 0 && fields[0].component === componentTypes.WIZARD);
    }, [fields]);

    const testId = rest['data-testid'] || 'form-renderer';

    const formHeader = useMemo(() => {
        if (typeof header === 'string' || description || headerVariant || info) {
            const headerInfo =
                info && typeof info === 'string' ? (
                    <Link variant="info" href={info}>
                        Info
                    </Link>
                ) : (
                    info
                );
            return (
                <Header variant={headerVariant} description={description} info={headerInfo}>
                    {header}
                </Header>
            );
        }

        return header;
    }, [header, description, info, headerVariant]);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Form header={formHeader} actions={actionsVisible ? actions : undefined} data-testid={testId}>
                <SpaceBetween direction="vertical" size="s">
                    {formFields}
                </SpaceBetween>
            </Form>
        </form>
    );
};

export default memo(FormTemplate);
