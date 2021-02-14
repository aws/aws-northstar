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
import React, { FunctionComponent, useState } from 'react';
import {
    WizardStep as _WizardStep,
    StepClickDetail as _StepClickDetail,
    WizardStepInfo as _WizardStepInfo,
} from './types';
import WizardInner from './components/WizardInner';

export type WizardStepInfo = _WizardStepInfo;
export type WizardStep = _WizardStep;
export type StepClickDetail = _StepClickDetail;

export interface WizardProps {
    /**
     * Array of step objects. Each object represents a step in the wizard with the following properties: <br/>
     * title [string]: Text that serves as the title in the navigation pane as well as in the form header.
     * description [string]: Optional area below the form header for a page level descriptive text to further explain the purpose, goal, or main actions of the step.
     * content [Renderable]: Main content area to display form sections, form fields, and controls.
     * isOptional [boolean]: Whether the step is optional or required. If set to true, the text 'Optional' is rendered next to the navigation step label and the form header title.
     */
    steps: WizardStep[];
    /** Index of the active step or the step that is currently being displayed. The first step has index 0, which is also the default value. */
    activeStepIndex?: number;
    /** A function that accepts a number (1-based indexing), and returns a human-readable, localized string displaying the step number in the navigation pane. For example, "Step 1" or "Step 2". */
    getStepNumberLabel?: (stepNumber: number) => string;
    /** The text rendered on the button that allows the user to exit the flow. */
    cancelButtonText?: string;
    /** The text rendered on the button that allows the user to return to the previous step .*/
    previousButtonText?: string;
    /** The text rendered on the button that allows the user to move to the next step. */
    nextButtonText?: string;
    /** The text rendered on the button that allows the user to submit the form. */
    submitButtonText?: string;
    /** The text rendered next to the step title and form header title, if a step is declared optional. Do not include the "-". */
    optionalText?: string;
    /** Renders the next or submit button in a loading state. Use this if you need to wait for a response from the server before the user can proceed to the next step, such as during server-side validation or retrieving the next step's information.*/
    isLoadingNextStep?: boolean;
    /** Fired when a user clicks the cancel button. */
    onCancelButtonClick?: () => void;
    /**
     * Fired when a user clicks the previous button. The event detail includes the index of the requested step, which in this case, is one less than the activeStepIndex.<br/>
     * By default, this event decreases activeStepIndex by one and scrolls to the top of the requested page.
     */
    onPreviousButtonClick?: (stepClickDetail: StepClickDetail) => void;
    /**
     * Fired when a user clicks the next button. The event detail includes the index of the requested step, which in this case, is one more than the activeStepIndex. <br/>
     * By default, this event increases activeStepIndex by one and scrolls to the top of the requested page.
     */
    onNextButtonClick?: (stepClickDetail: StepClickDetail) => boolean;
    /** Fired when a user clicks the submit button. */
    onSubmitButtonClick?: () => void;
    /**
     * Fired when a user clicks an enabled step link in the navigation pane. The event detail includes the index of the requested step. <br/>
     * By default, this event sets the activeStepIndex equal to the requestedStepIndex and scrolls to the top of the requested page.
     */
    onStepNavigationClick?: (stepClickDetail: StepClickDetail) => void;
    /** Indicates whether the step navigation is disabled. When it is enabled, validation will need to take it into consideration. */
    disableStepNavigation?: boolean;
}

/** A wizard is a multipage form that guides a user through a complex flow or a series of interrelated tasks. It consists of a navigation pane, header, main content area, and action buttons. */
const Wizard: FunctionComponent<WizardProps> = ({
    steps,
    getStepNumberLabel = (stepNumber: number) => `Step ${stepNumber}`,
    cancelButtonText = 'Cancel',
    previousButtonText = 'Previous',
    nextButtonText = 'Next',
    submitButtonText = 'Submit',
    optionalText = 'optional',
    isLoadingNextStep = false,
    disableStepNavigation = false,
    onNextButtonClick = () => true,
    onPreviousButtonClick = () => {},
    onStepNavigationClick = () => {},
    onSubmitButtonClick = () => {},
    onCancelButtonClick = () => {},
    ...props
}) => {
    const [maxStepIndex, setMaxStepIndex] = useState(props.activeStepIndex || 0);
    const [activeStepIndex, setActiveStepIndex] = useState(props.activeStepIndex || 0);

    const handleStepNativationClick = (stepClickDetail: StepClickDetail) => {
        setActiveStepIndex(stepClickDetail.requestedStepIndex);
        onStepNavigationClick(stepClickDetail);
    };

    const handleNextButtonClick = () => {
        const target = activeStepIndex + 1;
        if (onNextButtonClick({ requestedStepIndex: target })) {
            setActiveStepIndex(target);
            if (target > maxStepIndex) {
                setMaxStepIndex(target);
            }
        }
    };

    const handlePreviousButtonClick = () => {
        const target = activeStepIndex - 1;
        if (target >= 0) {
            setActiveStepIndex(target);
            onPreviousButtonClick({ requestedStepIndex: target });
        }
    };

    const wizardProps = {
        key: activeStepIndex,
        step: steps[activeStepIndex],
        stepsInfo: steps.map((step) => ({
            title: step.title,
            isOptional: step.isOptional,
        })),
        stepCount: steps.length,
        activeStepIndex,
        maxStepIndex,
        getStepNumberLabel,
        cancelButtonText,
        previousButtonText,
        nextButtonText,
        submitButtonText,
        optionalText,
        isLoadingNextStep,
        disableStepNavigation,
        onNextButtonClick: handleNextButtonClick,
        onPreviousButtonClick: handlePreviousButtonClick,
        onStepNavigationClick: handleStepNativationClick,
        onSubmitButtonClick: onSubmitButtonClick,
        onCancelButtonClick: onCancelButtonClick,
    };

    return <WizardInner {...wizardProps} />;
};

export { WizardInner };
export default Wizard;
