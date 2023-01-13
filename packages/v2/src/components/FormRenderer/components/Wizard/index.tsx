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
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import WizardComponent, { WizardProps as WizardComponentProps } from '@cloudscape-design/components/wizard';
import { Field } from '../../types';
import WizardSteps from './components/WizardSteps';
import { useFormRendererContext } from '../../formRendererContext';

export interface WizardProps {
    fields: Field[];
    allowSkipTo: WizardComponentProps['allowSkipTo'];
    i18nStrings: WizardComponentProps['i18nStrings'];
    activeStepIndex: WizardComponentProps['activeStepIndex'];
    isReadOnly?: boolean;
    isDisabled?: boolean;
}

const DEFAULT_RESOURCE_STRINGS: WizardComponentProps.I18nStrings = {
    stepNumberLabel: (stepNumber) => `Step ${stepNumber}`,
    collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
    skipToButtonLabel: (step, _stepNumber) => `Skip to ${step.title}`,
    navigationAriaLabel: 'Steps',
    cancelButton: 'Cancel',
    previousButton: 'Previous',
    nextButton: 'Next',
    submitButton: 'Submit',
    optional: 'optional',
};

const Wizard: FC<WizardProps> = ({ i18nStrings, allowSkipTo, fields, isReadOnly, isDisabled, ...props }) => {
    const [showError, setShowError] = useState(false);
    const formOptions = useFormApi();
    const { isSubmitting } = useFormRendererContext();
    const [activeStepIndex, setActiveStepIndex] = useState(props.activeStepIndex || 0);

    const resourceStrings = useMemo(() => {
        return {
            ...DEFAULT_RESOURCE_STRINGS,
            ...i18nStrings,
        };
    }, [i18nStrings]);

    const steps = useMemo(() => {
        return fields.map((field) => {
            const { title, info, description, isOptional, errorText, fields: fieldFields, ...rest } = field;
            return {
                title: title,
                info: info,
                description: field.description,
                isOptional: field.isOptional,
                errorText: field.errorText,
                content: (
                    <WizardSteps
                        isReadOnly={isReadOnly}
                        isDisabled={isDisabled}
                        showError={showError}
                        fields={fieldFields}
                        {...rest}
                    />
                ),
            };
        });
    }, [fields, showError, isReadOnly, isDisabled]);

    useEffect(() => {
        setShowError(false); // When steps change
    }, [activeStepIndex]);

    const handleNavigation = useCallback(
        ({ detail }: { detail: WizardComponentProps.NavigateDetail }) => {
            const requestedStepIndex = detail.requestedStepIndex;
            if (activeStepIndex < detail.requestedStepIndex) {
                const state = formOptions.getState();
                setShowError(true);
                if (!(state.invalid || state.validating || state.submitting)) {
                    setActiveStepIndex(requestedStepIndex);
                }
            } else {
                setActiveStepIndex(requestedStepIndex);
            }
        },
        [activeStepIndex, formOptions]
    );

    return (
        <WizardComponent
            {...props}
            i18nStrings={resourceStrings}
            onNavigate={handleNavigation}
            activeStepIndex={activeStepIndex}
            allowSkipTo={allowSkipTo}
            isLoadingNextStep={isSubmitting}
            steps={steps}
            onSubmit={formOptions.handleSubmit}
            onCancel={formOptions.onCancel}
        />
    );
};

export default memo(Wizard);
