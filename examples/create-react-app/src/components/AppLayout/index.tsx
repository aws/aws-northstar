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
import { FunctionComponent, useMemo } from 'react';
import AppLayoutBase from 'aws-northstar/layouts/AppLayout';
import HeaderBase from 'aws-northstar/components/Header';
import SideNavigationBase, { SideNavigationItemType } from 'aws-northstar/components/SideNavigation';
import BreadcrumbGroup from 'aws-northstar/components/BreadcrumbGroup';

const AppLayout: FunctionComponent = ({ children }) => {
    const Header = useMemo(
        () => <HeaderBase title="NorthStar Design System Demo" logoPath="/logo-light-full.png" />,
        []
    );
    const Breadcrumbs = useMemo(() => <BreadcrumbGroup rootPath="Home" />, []);
    const SideNavigation = useMemo(() => {
        return (
            <SideNavigationBase
                header={{ text: 'NorthStar Demo', href: '/' }}
                items={[
                    { text: 'Home', type: SideNavigationItemType.LINK, href: '/' },
                    { text: 'Analytics', type: SideNavigationItemType.LINK, href: '/data' },
                    { text: 'Create order', type: SideNavigationItemType.LINK, href: '/createOrder' },
                ]}
            ></SideNavigationBase>
        );
    }, []);

    return (
        <AppLayoutBase header={Header} navigation={SideNavigation} breadcrumbs={Breadcrumbs}>
            {children}
        </AppLayoutBase>
    );
};

export default AppLayout;
