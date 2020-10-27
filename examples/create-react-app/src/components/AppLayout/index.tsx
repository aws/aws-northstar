import React, { FunctionComponent, useMemo } from 'react';
import AppLayoutBase from 'aws-northstar/layouts/AppLayout';
import HeaderBase from 'aws-northstar/components/Header';
import SideNavigationBase, { SideNavigationItemType } from 'aws-northstar/components/SideNavigation';
import BreadcrumbGroup from 'aws-northstar/components/BreadcrumbGroup';

const AppLayout: FunctionComponent = ( {children} ) => {
    const Header = useMemo(() => (
        <HeaderBase title="NorthStar Design System Demo" logoPath="/logo-light-full.png" />
    ), []);
    const Breadcrumbs = useMemo(() => <BreadcrumbGroup rootPath="Home" />, []);;
    const SideNavigation = useMemo(() => {
        return <SideNavigationBase 
            header={{text: 'NorthStar Demo', href: '/'}}
            items={[
                {text: 'Home', type: SideNavigationItemType.LINK, href: '/'},
                {text: 'Analytics', type: SideNavigationItemType.LINK, href: '/data'},
                {text: 'Create order', type: SideNavigationItemType.LINK, href: '/createOrder'},
            ]}
        ></SideNavigationBase>
    }, []);

    return <AppLayoutBase
        header={Header}
        navigation={SideNavigation}
        breadcrumbs={Breadcrumbs}
    >
        {children}
    </AppLayoutBase>
}

export default AppLayout;