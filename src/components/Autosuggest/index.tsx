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

import React, {
    FunctionComponent,
    ReactNode,
    useEffect,
    useState,
    SyntheticEvent,
    useMemo,
    useCallback,
    ComponentType,
} from 'react';
import TextField from '@material-ui/core/TextField';
import MaterialUIAutocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import Link from '@material-ui/core/Link';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import TokenGroup from '../TokenGroup';
import Checkbox from '../Checkbox';
import Stack from '../../layouts/Stack';
import LoadingIndicator from '../LoadingIndicator';
import StatusIndicator from '../StatusIndicator';
import { AriaBaseProps } from '../../props/common';
import { SelectBaseProps, SelectOption, StatusType } from '../Select';
import { getFlattenOptions } from '../../utils/getFlattenOptions';
import useUniqueId from '../../hooks/useUniqueId';

export interface FilterOptionsState {
    inputValue?: string;
}

interface AutosuggestPropsBase extends SelectBaseProps, AriaBaseProps {
    /**
     * Determine whether it is MultiSelect or not.
     * */
    multiple: boolean;
    /**
     * Determines how filtering is applied to the list of options
     * */
    filteringType?: 'auto' | 'manual';
    /**
     * The name of the control used in HTML forms.
     * */
    name?: string;
    /**
     * Id of the internal input.<br/>
     * Use in conjunction with Form Field to relate a label element "for" attribute to this control for better web accessibility. <br/>
     * See example in <a href='/#/Components/FormField'>FormField</a> for more details. </a>
     * It defaults to an automatically generated id if not provided.
     * */
    controlId?: string;
    /**
     * Setting this to true will disable any native browser capabilities to
     * automatically correct user input, such as autocorrect and autocapitalize.
     * */
    disableBrowserAutocorrect?: boolean;
    /**
     * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
     */
    freeSolo?: boolean;
    /**
     * Define the Icon to be used for the text input. <br/>
     * By default, Search icon will be displayed. <br/>
     * If false, no icon will be displayed. <br/>
     * Or <a href='https://material-ui.com/components/material-icons/' target='_blank'>Material UI Icon Component Type</a> can be provided.
     */
    icon?: false | ComponentType<SvgIconProps>;
    /**
     * If `true`, the input can't be cleared.
     */
    disableClearable?: boolean;
    /**
     * Callback fired when the input value changes.
     * */
    onInputChange?: (e: React.ChangeEvent<{}>, value: string, reason: string) => void;
    /**
     * Callback fired when the popup requests to be opened
     * */
    onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
    /**
     * Callback fired when the popup requests to be closed
     * */
    onBlur?: (event?: React.FocusEvent<HTMLElement>) => void;
    /**
     * A filter function that determines the options that are eligible.
     */
    filterOptions?: (options: SelectOption[], state: FilterOptionsState) => SelectOption[];
}

interface AutosuggestPropsInternal extends AutosuggestPropsBase {
    multiple: false;
    checkboxes: false;
    /**
     * Text entered into the form element
     * */
    value?: SelectOption;
    /**
     * Callback fired when the value changes.
     * */
    onChange?: (value: SelectOption | null) => void;
}

interface MultiselectPropsInternal extends AutosuggestPropsBase {
    multiple: true;
    /**
     * The selected values
     * */
    value?: SelectOption[];
    /**
     * Whether to display checkboxes in dropdown options.
     * The default value is false, but we highly recommend to set this to true.
     */
    checkboxes?: boolean;
    /**
     * Callback fired when the value changes.
     * */
    onChange?: (value: SelectOption[]) => void;
}

const useStyles = makeStyles({
    input: {
        display: 'inline-block',
        marginRight: '20px',
    },
    recoveryLink: {
        pointerEvents: 'auto',
    },
    textfield: {
        paddingRight: '30px',
    },
});

type AutosuggestBaseProps = AutosuggestPropsInternal | MultiselectPropsInternal;

const covertStringValue = (value: string | SelectOption): SelectOption => {
    if (typeof value === 'string') {
        return {
            value,
            label: value,
        };
    }

    return value;
};

type ValueType =
    | {
          multiple: true;
          value?: (SelectOption | string)[];
      }
    | {
          multiple: false;
          value?: SelectOption | null | string;
      };

const getValue = (value: ValueType): (SelectOption | null) | SelectOption[] => {
    if (!value.value) {
        return value.multiple ? [] : null;
    }

    if (value.multiple) {
        return value.value.map(covertStringValue);
    }

    return covertStringValue(value.value);
};

/**
 * An autosuggest control is a normal text input enhanced by a panel of suggested options.
 * */
const AutosuggestBase: FunctionComponent<AutosuggestBaseProps> = ({
    options = [],
    filteringType = 'auto',
    loadingText = 'Loading ...',
    errorText = 'Error fetching',
    recoveryText,
    name,
    empty,
    disabled,
    placeholder,
    invalid,
    icon,
    ariaRequired = false,
    freeSolo = false,
    disableClearable = false,
    ariaDescribedby,
    ariaLabelledby,
    onInputChange,
    onFocus,
    onBlur,
    onRecoveryClick,
    disableBrowserAutocorrect = false,
    statusType = 'finished',
    filterOptions,
    value,
    ...props
}) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState<SelectOption | null | SelectOption[]>(
        getValue({
            multiple: props.multiple,
            value,
        } as ValueType)
    );
    const [open, setOpen] = React.useState(false);
    const controlId = useUniqueId(props.controlId);
    const autoCompleteString = disableBrowserAutocorrect ? 'off' : 'on';

    useEffect(() => {
        setInputValue(
            getValue({
                multiple: props.multiple,
                value,
            } as ValueType)
        );
    }, [props.multiple, value, setInputValue]);

    const onRecoveryClickHandler = useCallback(
        (event: SyntheticEvent) => {
            event.preventDefault();
            onRecoveryClick?.(event);
            event.stopPropagation();
        },
        [onRecoveryClick]
    );

    const flattenOptions = useMemo((): SelectOption[] => {
        return getFlattenOptions(options);
    }, [options]);

    const handleOnChange = useCallback(
        (_: React.ChangeEvent<{}>, value?: SelectOption | string | null | (SelectOption | string)[]): void => {
            const newValue = getValue({
                multiple: props.multiple,
                value,
            } as ValueType);
            setInputValue(newValue);
            props.onChange?.(newValue as SelectOption & SelectOption[]);
        },
        [props, setInputValue]
    );

    const handleOnInput = useCallback(
        (event: React.ChangeEvent<{}>, value: string, reason: string): void => {
            if (filteringType === 'manual') {
                onInputChange?.(event, value, reason);
            }
        },
        [onInputChange, filteringType]
    );

    const getOptionsSelected = useCallback((option: SelectOption, value: SelectOption) => {
        return option.value === value.value;
    }, []);

    const loadingAndErrorText = useMemo(
        () => (
            <>
                {statusType === 'loading' && <LoadingIndicator label={loadingText} />}

                {statusType === 'error' && (
                    <StatusIndicator statusType="negative">
                        {errorText}.
                        {recoveryText && (
                            <span>
                                <Link href="#" onClick={onRecoveryClickHandler} className={classes.recoveryLink}>
                                    {recoveryText}
                                </Link>
                            </span>
                        )}
                    </StatusIndicator>
                )}
            </>
        ),
        [statusType, classes.recoveryLink, errorText, recoveryText, loadingText, onRecoveryClickHandler]
    );

    const iconComponent = useMemo(() => {
        if (icon) {
            const IconComponent = icon as ComponentType<SvgIconProps>;
            return <IconComponent color="action" />;
        }

        return <SearchIcon color="action" />;
    }, [icon]);

    const textfield = useCallback(
        (params: AutocompleteRenderInputParams): React.ReactNode => (
            <TextField
                autoCorrect={autoCompleteString}
                placeholder={placeholder}
                required={ariaRequired}
                error={!!(statusType === 'error' || invalid)}
                {...params}
                variant="outlined"
                size="small"
                margin="normal"
                name={name}
                InputProps={{
                    'aria-required': ariaRequired,
                    'aria-describedby': ariaDescribedby,
                    'aria-labelledby': ariaLabelledby,
                    ...params.InputProps,
                    className: classes.textfield,
                    type: 'search',
                    startAdornment: icon !== false && <InputAdornment position="start">{iconComponent}</InputAdornment>,
                }}
            />
        ),
        [
            ariaDescribedby,
            ariaLabelledby,
            ariaRequired,
            autoCompleteString,
            classes.textfield,
            invalid,
            name,
            placeholder,
            statusType,
            icon,
            iconComponent,
        ]
    );

    const renderOption = useCallback(
        (option: SelectOption): ReactNode => {
            if (props.multiple && props.checkboxes) {
                return (
                    <Checkbox
                        checked={(inputValue as SelectOption[]).map((input) => input.value).includes(option.value)}
                        value={option.value}
                    >
                        {props.renderOption?.(option) || option.label}
                    </Checkbox>
                );
            }

            return props.renderOption?.(option) || option.label;
        },
        [props, inputValue]
    );

    const handleDeleteOption = useCallback(
        (option) => {
            if (props.multiple) {
                const tempData = (inputValue as SelectOption[]).filter((o) => o.value !== option.value);
                setInputValue(tempData);
                props.onChange?.(tempData);
            }
        },
        [inputValue, setInputValue, props]
    );

    return (
        <Stack>
            <MaterialUIAutocomplete
                multiple={props.multiple}
                data-testid={props.multiple ? 'multiselect' : 'autosuggest'}
                disabled={disabled}
                autoHighlight
                popupIcon={null}
                freeSolo={freeSolo}
                disableClearable={disableClearable}
                open={statusType === 'error' || statusType === 'loading' ? true : open}
                id={controlId}
                value={inputValue}
                noOptionsText={empty}
                options={flattenOptions}
                groupBy={(option) => option.group || ''}
                loadingText={loadingAndErrorText}
                getOptionSelected={getOptionsSelected}
                onChange={handleOnChange}
                onInputChange={handleOnInput}
                onFocus={onFocus}
                onBlur={onBlur}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                loading={statusType !== 'finished'}
                renderOption={renderOption}
                filterOptions={filterOptions}
                getOptionLabel={(option) => option.label || ''}
                renderInput={textfield}
            />
            {props.multiple && (
                <TokenGroup items={(inputValue || []) as SelectOption[]} onDismiss={handleDeleteOption} />
            )}
        </Stack>
    );
};

export interface AutosuggestProps extends Omit<AutosuggestPropsInternal, 'multiple' | 'checkboxes'> {}

const Autosuggest: FunctionComponent<AutosuggestProps> = (props) => {
    return <AutosuggestBase multiple={false} checkboxes={false} {...props} />;
};

export interface MultiselectProps extends Omit<MultiselectPropsInternal, 'multiple'> {}

export default Autosuggest;

export { AutosuggestBase };

export type { SelectOption, StatusType };
