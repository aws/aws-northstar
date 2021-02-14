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
import React, { FunctionComponent, useMemo, useState, useEffect } from 'react';
import { WizardInner, WizardStepInfo } from '../../../../../Wizard';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

export interface WizardStepProps {
    title: string;
    description?: string;
    fields: any[];
    stepsInfo: WizardStepInfo[];
    activeStepIndex: number;
    maxStepIndex: number;
    onNextButtonClick: () => void;
    onPreviousButtonClick: () => void;
    submitButtonText?: string;
}

const WizardStep: FunctionComponent<WizardStepProps> = ({
    activeStepIndex,
    maxStepIndex,
    title,
    description,
    fields,
    stepsInfo,
    onNextButtonClick,
    onPreviousButtonClick,
    submitButtonText,
}) => {
    const [showError, setShowError] = useState(false);
    const formOptions = useFormApi();
    const content = useMemo(() => {
        const editabledFields = fields.map((item: any) => ({
            ...item,
            showError,
        }));

        return formOptions.renderForm(editabledFields, formOptions);
    }, [fields, showError]);

    useEffect(() => {
        setShowError(false); // When steps change
    }, [activeStepIndex]);

    const handleNextButtonClick = () => {
        const state = formOptions.getState();
        setShowError(true);
        if (!(state.invalid || state.validating || state.submitting)) {
            onNextButtonClick();
        }
    };

    const handlePreviousButtonClick = () => {
        onPreviousButtonClick();
    };

    return (
        <WizardInner
            step={{
                title,
                description,
                content,
            }}
            activeStepIndex={activeStepIndex}
            maxStepIndex={maxStepIndex}
            stepsInfo={stepsInfo}
            stepCount={stepsInfo.length}
            submitButtonText={submitButtonText}
            onNextButtonClick={handleNextButtonClick}
            onPreviousButtonClick={handlePreviousButtonClick}
            onCancelButtonClick={formOptions.onCancel}
            onSubmitButtonClick={(event) => {
                event.preventDefault();
                formOptions.handleSubmit();
            }}
            disableStepNavigation={true}
        />
    );
};

export default WizardStep;
