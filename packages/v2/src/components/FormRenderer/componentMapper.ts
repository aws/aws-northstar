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
import { componentTypes } from './types';
import TextField from './components/TextField';
import Textarea from './components/Textarea';
import Checkbox from './components/Checkbox';
import DatePicker from './components/DatePicker';
import Radio from './components/Radio';
import Switch from './components/Switch';
import Select from './components/Select';
import Custom from './components/Custom';
import Subform from './components/Subform';
import ExpandableSection from './components/ExpandableSection';
import DateRangePicker from './components/DateRangePicker';
import TimeInput from './components/TimeInput';
import Review from './components/Review';
import PlainText from './components/PlainText';
import Wizard from './components/Wizard';
import FieldArray from './components/FieldArray';

const componentMapper = {
    [componentTypes.CHECKBOX]: Checkbox,
    [componentTypes.CUSTOM]: Custom,
    [componentTypes.DATE_PICKER]: DatePicker,
    [componentTypes.RADIO]: Radio,
    [componentTypes.SELECT]: Select,
    [componentTypes.SUB_FORM]: Subform,
    [componentTypes.SWITCH]: Switch,
    [componentTypes.TEXT_FIELD]: TextField,
    [componentTypes.TEXTAREA]: Textarea,
    [componentTypes.EXPANDABLE_SECTION]: ExpandableSection,
    [componentTypes.DATA_RANGE_PICKER]: DateRangePicker,
    [componentTypes.TIME_INPUT]: TimeInput,
    [componentTypes.REVIEW]: Review,
    [componentTypes.PLAIN_TEXT]: PlainText,
    [componentTypes.WIZARD]: Wizard,
    [componentTypes.FIELD_ARRAY]: FieldArray,
};

export default componentMapper;
