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
import FormRenderer, { Schema } from '../../../FormRenderer';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import useSubmitCallback from '../../hooks/useSubmitCallback';

export interface GenericViewProps<TData> {
    schema: Schema;
    validate?: (values: any) => any;
    onSubmit: (data: TData) => Promise<unknown>;
    onBackToSignIn?: () => void;
}

const GenericView = <TData extends Record<string, any>>({
    schema,
    onSubmit,
    onBackToSignIn,
    validate,
}: GenericViewProps<TData>) => {
    const { handleSubmit, isSubmitting, errorMessage } = useSubmitCallback(onSubmit);
    return (
        <SpaceBetween direction="vertical" size="xl">
            <FormRenderer
                schema={schema}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                errorText={errorMessage}
                validate={validate}
            />
            {onBackToSignIn && (
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Button variant="link" onClick={onBackToSignIn}>
                        Back to Sign In
                    </Button>
                </div>
            )}
        </SpaceBetween>
    );
};

export default GenericView;
