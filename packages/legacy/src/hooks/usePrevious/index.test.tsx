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
import usePrevious from '.';
import { render } from '@testing-library/react';

const Wrapper = <T extends unknown>({ id }: { id: T }) => {
    const previousId = usePrevious(id);
    return <div>{String(previousId)}</div>;
};

describe('usePrevious', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return previous string value', () => {
        const { getByText, queryByText, rerender } = render(<Wrapper id="version1" />);
        expect(queryByText('version1')).toBeNull();
        rerender(<Wrapper id="version2" />);
        expect(getByText('version1')).toBeInTheDocument();
        expect(queryByText('version2')).toBeNull();
        rerender(<Wrapper id="version3" />);
        expect(queryByText('version1')).toBeNull();
        expect(queryByText('version2')).toBeInTheDocument();
        expect(queryByText('version3')).toBeNull();
    });

    it('should return previous number value', () => {
        const { getByText, queryByText, rerender } = render(<Wrapper id={1} />);
        expect(queryByText('1')).toBeNull();
        rerender(<Wrapper id={2} />);
        expect(getByText('1')).toBeInTheDocument();
        expect(queryByText('2')).toBeNull();
        rerender(<Wrapper id={3} />);
        expect(queryByText('1')).toBeNull();
        expect(queryByText('2')).toBeInTheDocument();
        expect(queryByText('3')).toBeNull();
    });
});
