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
import React from 'react';
import { render, fireEvent, cleanup, act, waitFor } from '@testing-library/react';
import FormRenderer, { componentTypes, validatorTypes } from '.';
import { isYesterday } from 'date-fns';
import { debug } from 'console';

describe('FormRenderer', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    const handleCancel = jest.fn();
    const handleSubmit = jest.fn();

    const baseSchema = {
        header: 'header',
        description: 'description',
    };

    describe('Form basic ', () => {
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.TEXT_FIELD,
                    name: 'name',
                    label: 'Name',
                    isRequired: true,
                },
            ],
        };

        it('should render header and description', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            expect(getByText('header')).toBeVisible();
            expect(getByText('description')).toBeVisible();
        });

        it('should trigger cancel event when user clicks the Cancel button', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            fireEvent.click(getByText('Cancel'));
            expect(handleCancel).toHaveBeenCalled();
        });

        it('should trigger submit with the data', () => {
            const { getByLabelText, getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            act(() => {
                fireEvent.change(getByLabelText('Name'), { target: { value: 'my name' } });
                fireEvent.click(getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith({ name: 'my name' }, expect.any(Object), expect.any(Function));
        });

        it('should render custom label for cancel and submit button', () => {
            const customLabelsSchema = {
                ...schema,
                submitLabel: 'Custom Submit Label',
                cancelLabel: 'Custom Cancel Label',
            };
            const { getByText } = render(
                <FormRenderer schema={customLabelsSchema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            expect(getByText('Custom Submit Label')).toBeVisible();
            expect(getByText('Custom Cancel Label')).toBeVisible();
        });
    });

    describe('Checkbox', () => {
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.CHECKBOX,
                    name: 'checkbox',
                    label: 'Checkbox',
                    options: [
                        {
                            label: 'Option 1',
                            value: '1',
                        },
                        {
                            label: 'Option 2',
                            value: '2',
                        },
                        {
                            label: 'Option 3',
                            value: '3',
                        },
                    ],
                    isRequired: true,
                    validate: [
                        {
                            type: validatorTypes.REQUIRED,
                        },
                    ],
                },
            ],
        };
        it('should render checkboxes', () => {
            const { getByLabelText, getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            fireEvent.click(getByLabelText('Option 1'));
            fireEvent.click(getByLabelText('Option 3'));
            fireEvent.click(getByText('Submit'));

            expect(handleSubmit).toHaveBeenCalledWith(
                { checkbox: ['1', '3'] },
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should trigger validation', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            fireEvent.click(getByText('Submit'));
            expect(getByText('Required')).toBeVisible();
        });
    });

    describe('Treeview', () => {
        const treeItems = {
            id: '1',
            label: 'Tree Root',
            children: [
                {
                    id: '2',
                    label: 'Node 1.0',
                    children: [
                        { id: '3', label: 'Node 1.1' },
                        { id: '4', label: 'Node 1.3' },
                    ],
                },
                {
                    id: '5',
                    label: 'Node 2.0',
                    children: [
                        {
                            id: '6',
                            label: 'Node 2.1.0',
                            children: [{ id: '7', label: 'Node 2.1.2' }],
                        },
                        { id: '8', label: 'Node 2.2' },
                    ],
                },
            ],
        };

        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.TREE_VIEW,
                    label: 'this is a tree',
                    helperText: 'this is a hint',
                    description: 'this is a description',
                    name: 'tree',
                    treeItems: treeItems,
                    multiSelect: true,
                    defaultExpanded: ['1', '2', '5'],
                    validate: [
                        {
                            type: validatorTypes.REQUIRED,
                        },
                    ],
                },
            ],
        };

        it('should render Treeview', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            act(() => {
                fireEvent.click(getByText('Node 1.1'));
                fireEvent.click(getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith({ tree: ['3'] }, expect.any(Object), expect.any(Function));
        });

        it('should trigger validation', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            fireEvent.click(getByText('Submit'));
            expect(getByText('Required')).toBeVisible();
        });
    });

    describe('Wizard', () => {
        const ReviewTemplate = ({ data }: any) => {
            return (
                <>
                    {data.name}-{data.textarea}
                </>
            );
        };
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.WIZARD,
                    name: 'wizard',
                    submitButtonText: 'Custom Submit Label',
                    fields: [
                        {
                            name: 'step-1',
                            title: 'Step 1',
                            description: 'Descrirption for Step 1',
                            fields: [
                                {
                                    component: componentTypes.TEXTAREA,
                                    name: 'textarea',
                                    label: 'Textarea',
                                    validate: [
                                        {
                                            type: validatorTypes.REQUIRED,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: 'step-2',
                            title: 'Step 2',
                            fields: [
                                {
                                    component: componentTypes.TEXT_FIELD,
                                    name: 'name',
                                    label: 'Name',
                                    validate: [
                                        {
                                            type: validatorTypes.REQUIRED,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: 'step-3',
                            title: 'Review',
                            fields: [
                                {
                                    component: componentTypes.REVIEW,
                                    name: 'review',
                                    Template: ReviewTemplate,
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        it('should render Wizard', () => {
            const { getByText, getAllByText, getByLabelText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            expect(getAllByText('Step 1')).toHaveLength(3);
            expect(getByText('Descrirption for Step 1')).toBeVisible();
            act(() => {
                fireEvent.change(getByLabelText('textarea'), { target: { value: 'my content' } });
                fireEvent.click(getByText('Next'));
            });

            expect(getAllByText('Step 2')).toHaveLength(3);

            act(() => {
                fireEvent.change(getByLabelText('Name'), { target: { value: 'my name' } });
                fireEvent.click(getByText('Next'));
            });

            expect(getAllByText('Review')).toHaveLength(2);
            expect(getByText('my name-my content')).toBeVisible();
            fireEvent.click(getByText('Custom Submit Label'));
            expect(handleSubmit).toHaveBeenCalledWith(
                { name: 'my name', textarea: 'my content' },
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should trigger validation', () => {
            const { getByText, getAllByText, getByLabelText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            expect(getAllByText('Step 1')).toHaveLength(3);
            expect(getByText('Descrirption for Step 1')).toBeVisible();
            act(() => {
                fireEvent.click(getByText('Next'));
            });
            expect(getByText('Required')).toBeVisible();
            act(() => {
                fireEvent.change(getByLabelText('textarea'), { target: { value: 'my content' } });
                fireEvent.click(getByText('Next'));
            });
            expect(getAllByText('Step 2')).toHaveLength(3);
        });
    });

    describe('Subform', () => {
        const schema = {
            fields: [
                {
                    component: componentTypes.SUB_FORM,
                    title: 'Subform 1',
                    description: 'This is a subform',
                    name: 'subform1',
                    fields: [
                        {
                            component: componentTypes.TEXT_FIELD,
                            name: 'name',
                            label: 'Name',
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        it('should render Subform', () => {
            const { getByText, getByLabelText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            expect(getByText('Subform 1')).toBeVisible();
            expect(getByText('This is a subform')).toBeVisible();
            act(() => {
                fireEvent.change(getByLabelText('Name'), { target: { value: 'my name' } });
                fireEvent.click(getByText('Submit'));
            });
            expect(handleSubmit).toHaveBeenCalledWith({ name: 'my name' }, expect.any(Object), expect.any(Function));
        });

        it('should trigger validate', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            fireEvent.click(getByText('Submit'));
            expect(getByText('Required')).toBeVisible();
        });
    });

    describe('ExpandableSection', () => {
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.EXPANDABLE_SECTION,
                    title: 'Additional information',
                    description: 'This is for additional information',
                    name: 'additionalInfo',
                    fields: [
                        {
                            component: componentTypes.TEXT_FIELD,
                            name: 'name',
                            label: 'Name',
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        it('should render ExpandableSection', () => {
            const { getByText, getByLabelText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            expect(getByText('Additional information')).toBeVisible();
            expect(getByText('This is for additional information')).toBeVisible();
            expect(getByLabelText('Name')).not.toBeVisible();
            act(() => {
                fireEvent.click(getByText('Additional information'));
                fireEvent.change(getByLabelText('Name'), { target: { value: 'my name' } });
                fireEvent.click(getByText('Submit'));
            });
            expect(handleSubmit).toHaveBeenCalledWith(
                {
                    additionalInfo: {
                        name: 'my name',
                    },
                },
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should trigger valiation', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            expect(getByText('Additional information')).toBeVisible();
            expect(getByText('This is for additional information')).toBeVisible();
            fireEvent.click(getByText('Submit'));
            expect(getByText('Required')).toBeVisible();
        });
    });

    describe('Switch', () => {
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.SWITCH,
                    name: 'switch',
                    label: 'Switch',
                    initialValue: false,
                },
            ],
        };
        it('should render Switch', async () => {
            const { getByLabelText, getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            expect(getByLabelText('Switch')).toBeInTheDocument();
            fireEvent.click(getByText('Submit'));
            expect(handleSubmit).toHaveBeenCalledWith({ switch: false }, expect.any(Object), expect.any(Function));
        });
    });

    describe('Datepicker', () => {
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.DATE_PICKER,
                    name: 'datePicker',
                    label: 'Date picker',
                    isRequired: true,
                    validate: [
                        {
                            type: validatorTypes.REQUIRED,
                        },
                    ],
                },
            ],
        };

        it('should render Datepicker', () => {
            const { getByLabelText, getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            expect(getByText('Date picker')).toBeVisible();
            act(() => {
                fireEvent.change(getByLabelText('Date picker'), { target: { value: '20200101' } });
            });

            fireEvent.click(getByText('Submit'));
            expect(handleSubmit).toHaveBeenCalledWith(
                { datePicker: expect.any(Date) },
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should trigger validation', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            fireEvent.click(getByText('Submit'));
            expect(getByText('Required')).toBeVisible();
        });
    });

    describe('TimePicker', () => {
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.TIME_PICKER,
                    name: 'timePicker',
                    label: 'Time picker',
                    isRequired: true,
                    validate: [
                        {
                            type: validatorTypes.REQUIRED,
                        },
                    ],
                },
            ],
        };

        it('should render a TimePicker', () => {
            const { getByLabelText, getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            expect(getByText('Time picker')).toBeVisible();
            act(() => {
                fireEvent.change(getByLabelText('Time picker'), { target: { value: '10:35 AM' } });
            });

            fireEvent.click(getByText('Submit'));
            expect(handleSubmit).toHaveBeenCalledWith(
                { timePicker: expect.stringMatching(/.*T10:35:.*Z$/) },
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should trigger validation', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            fireEvent.click(getByText('Submit'));
            expect(getByText('Required')).toBeVisible();
        });
    });

    describe('Radio', () => {
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.RADIO,
                    name: 'radio',
                    label: 'Radio',
                    options: [
                        {
                            label: 'Option 1',
                            value: '1',
                        },
                        {
                            label: 'Option 2',
                            value: '2',
                        },
                        {
                            label: 'Option 3',
                            value: '3',
                        },
                    ],
                    isRequired: true,
                    validate: [
                        {
                            type: validatorTypes.REQUIRED,
                        },
                    ],
                },
            ],
        };
        it('should render radio buttons', () => {
            const { getByLabelText, getByText, getAllByRole } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            expect(getByText('Radio')).toBeVisible();
            expect(getAllByRole('radio')).toHaveLength(3);

            fireEvent.click(getByLabelText('Option 3'));
            fireEvent.click(getByText('Submit'));

            expect(handleSubmit).toHaveBeenCalledWith({ radio: '3' }, expect.any(Object), expect.any(Function));
        });

        it('should trigger validation', () => {
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            fireEvent.click(getByText('Submit'));
            expect(getByText('Required')).toBeVisible();
        });
    });

    describe('Select', () => {
        const field = {
            component: componentTypes.SELECT,
            name: 'select',
            label: 'Select',
            placeholder: 'Choose an option',
            options: [
                {
                    label: 'Option 1',
                    value: '1',
                },
                {
                    label: 'Option 2',
                    value: '2',
                },
                {
                    label: 'Option 3',
                    value: '3',
                },
            ],
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        };

        it('should render Select', () => {
            const schema = {
                ...baseSchema,
                fields: [field],
            };

            const { getByText, getByTestId } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            expect(getByText('Select')).toBeVisible();
            expect(getByTestId('select')).toBeInTheDocument();
        });

        it('should render Autosuggest when isSearchable is true', () => {
            const schema = {
                ...baseSchema,
                fields: [{ ...field, isSearchable: true }],
            };
            const { getByTestId } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            expect(getByTestId('autosuggest')).toBeInTheDocument();
        });

        it('should render Multiselect when multiSelect is true', () => {
            const schema = {
                ...baseSchema,
                fields: [{ ...field, multiSelect: true }],
            };
            const { getByTestId } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            expect(getByTestId('multiselect')).toBeInTheDocument();
        });

        it('should trigger validation', () => {
            const schema = {
                ...baseSchema,
                fields: [field],
            };
            const { getByText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );
            fireEvent.click(getByText('Submit'));
            expect(getByText('Required')).toBeVisible();
        });
    });

    describe('FieldArray', () => {
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: componentTypes.FIELD_ARRAY,
                    label: 'Attribute Editor',
                    description: 'This is a form array',
                    name: 'fieldArray',
                    helperText: 'You can add up to 6 more items.',
                    minItems: 1,
                    maxItems: 3,
                    noItemsMessage: 'Please add new item',
                    defaultItem: {
                        key: 'key',
                        value: 'value',
                    },
                    validate: [
                        {
                            type: validatorTypes.MIN_ITEMS,
                            threshold: 1,
                        },
                        {
                            type: validatorTypes.REQUIRED,
                        },
                    ],
                    fields: [
                        {
                            component: componentTypes.TEXT_FIELD,
                            name: 'key',
                            label: 'Key',
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                        {
                            component: componentTypes.TEXT_FIELD,
                            name: 'value',
                            label: 'Value',
                            validate: [
                                {
                                    type: validatorTypes.REQUIRED,
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        it('should render FieldArray', () => {
            const { getByText, getAllByRole, getByLabelText } = render(
                <FormRenderer schema={schema} onSubmit={handleSubmit} onCancel={handleCancel} />
            );

            expect(getByText('Attribute Editor')).toBeVisible();
            expect(getByText('This is a form array')).toBeVisible();
            expect(getByText('You can add up to 6 more items.')).toBeVisible();
            expect(getByText('Please add new item'));

            act(() => {
                fireEvent.click(getAllByRole('button')[0]);
            });

            expect(getByText('Key')).toBeVisible();
            expect(getByText('Value')).toBeVisible();

            act(() => {
                fireEvent.change(getByLabelText('Key'), { target: { value: 'key' } });
                fireEvent.change(getByLabelText('Value'), { target: { value: 'value' } });
                fireEvent.click(getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith(
                {
                    fieldArray: [
                        {
                            key: 'key',
                            value: 'value',
                        },
                    ],
                },
                expect.any(Object),
                expect.any(Function)
            );
        });
    });
});
