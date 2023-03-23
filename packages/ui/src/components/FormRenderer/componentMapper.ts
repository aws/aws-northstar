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
import { ComponentMapper } from '@data-driven-forms/react-form-renderer';
import { componentTypes } from './types';
import Alert from './components/Alert';
import Checkbox from './components/Checkbox';
import CodeEditor from './components/CodeEditor';
import ColumnLayout from './components/ColumnLayout';
import Custom from './components/Custom';
import CustomLayout from './components/CustomLayout';
import DateInput from './components/DateInput';
import DatePicker from './components/DatePicker';
import DateRangePicker from './components/DateRangePicker';
import ExpandableSection from './components/ExpandableSection';
import FieldArray from './components/FieldArray';
import FieldGroup from './components/FieldGroup';
import PlainText from './components/PlainText';
import Radio from './components/Radio';
import Review from './components/Review';
import Select from './components/Select';
import Subform from './components/Subform';
import Switch from './components/Switch';
import Textarea from './components/Textarea';
import TextField from './components/TextField';
import TimeInput from './components/TimeInput';
import Wizard from './components/Wizard';

const componentMapper: ComponentMapper = {
    [componentTypes.ALERT]: Alert,
    [componentTypes.CHECKBOX]: Checkbox,
    [componentTypes.CODE_EDITOR]: CodeEditor,
    [componentTypes.COLUMN_LAYOUT]: ColumnLayout,
    [componentTypes.CUSTOM]: Custom,
    [componentTypes.CUSTOM_LAYOUT]: CustomLayout,
    [componentTypes.DATA_RANGE_PICKER]: DateRangePicker,
    [componentTypes.DATE_INPUT]: DateInput,
    [componentTypes.DATE_PICKER]: DatePicker,
    [componentTypes.EXPANDABLE_SECTION]: ExpandableSection,
    [componentTypes.FIELD_ARRAY]: FieldArray,
    [componentTypes.FIELD_GROUP]: FieldGroup,
    [componentTypes.PLAIN_TEXT]: PlainText,
    [componentTypes.RADIO]: Radio,
    [componentTypes.REVIEW]: Review,
    [componentTypes.SELECT]: Select,
    [componentTypes.SUB_FORM]: Subform,
    [componentTypes.SWITCH]: Switch,
    [componentTypes.TEXT_FIELD]: TextField,
    [componentTypes.TEXTAREA]: Textarea,
    [componentTypes.TIME_INPUT]: TimeInput,
    [componentTypes.WIZARD]: Wizard,
};

export default componentMapper;
