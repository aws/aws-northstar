import React, { FunctionComponent } from 'react';
import PivotTable from 'aws-northstar/components/PivotTable';
import data from '../../data';

const Analytics: FunctionComponent = () => {
    return <PivotTable data={data} />
}

export default Analytics;