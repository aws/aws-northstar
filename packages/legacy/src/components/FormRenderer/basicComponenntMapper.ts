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

import Checkbox from './components/Checkbox';
import Custom from './components/Custom';
import Datepicker from './components/Datepicker';
import ExpandableSection from './components/ExpandableSection';
import FieldArray from './components/FieldArray';
import Radio from './components/Radio';
import Review from './components/Review';
import Select from './components/Select';
import Subform from './components/Subform';
import Switch from './components/Switch';
import TreeView from './components/TreeView';
import Textarea from './components/Textarea';
import TextField from './components/TextField';
import TimePicker from './components/TimePicker';
import Wizard from './components/Wizard';

const basicComponentMapper = {
    [componentTypes.CHECKBOX]: Checkbox,
    [componentTypes.CUSTOM]: Custom,
    [componentTypes.DATE_PICKER]: Datepicker,
    [componentTypes.EXPANDABLE_SECTION]: ExpandableSection,
    [componentTypes.FIELD_ARRAY]: FieldArray,
    [componentTypes.RADIO]: Radio,
    [componentTypes.REVIEW]: Review,
    [componentTypes.SELECT]: Select,
    [componentTypes.SUB_FORM]: Subform,
    [componentTypes.SWITCH]: Switch,
    [componentTypes.TEXT_FIELD]: TextField,
    [componentTypes.TEXTAREA]: Textarea,
    [componentTypes.TIME_PICKER]: TimePicker,
    [componentTypes.TREE_VIEW]: TreeView,
    [componentTypes.WIZARD]: Wizard,
};

export default basicComponentMapper;
