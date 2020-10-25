### Examples

``` jsx
import SideNavigation, { SideNavigationItemType } from 'aws-northstar/components/SideNavigation';
import Container from 'aws-northstar/layouts/Container';
import { MemoryRouter } from 'react-router';
import Badge from 'aws-northstar/components/Badge';

const navigationItems = [
    { type: SideNavigationItemType.LINK, text: "Page 1", href: "/page1" },
    { type: SideNavigationItemType.LINK, text: "Page 2", href: "/page2" },
    { type: SideNavigationItemType.LINK, text: "Page 3", href: "/page3" },
    { type: SideNavigationItemType.LINK, text: "Page 4", href: "/page4" },
    { type: SideNavigationItemType.DIVIDER },
    {
        type: SideNavigationItemType.LINK,
        text: "Notifications",
        href: "/notifications",
        info: <Badge color="red" content='23'></Badge>
    },
    {
        type: SideNavigationItemType.LINK,
        text: "Documentation",
        href: "https://docs.aws.amazon.com"
    }
    ];
    
<MemoryRouter>
    <Container headingVariant='h4' title='Default'>
        <SideNavigation
            header={{
                "href": "/",
                "text": "Application name"
            }}
            items={navigationItems}
        />
    </Container>
</MemoryRouter>
```

``` jsx
import SideNavigation, { SideNavigationItemType } from 'aws-northstar/components/SideNavigation';
import { MemoryRouter } from 'react-router';
import Container from 'aws-northstar/layouts/Container';

const navigationItems = [{
    "type": SideNavigationItemType.LINK,
    "text": "Page 1",
    "href": "/page1"
  },
  {
    "type": SideNavigationItemType.LINK,
    "text": "Page 2",
    "href": "/page2"
  },
  {
    "type": SideNavigationItemType.SECTION,
    "text": "Section 1",
    "items": [
      {
        "type": SideNavigationItemType.LINK,
        "text": "Page 4",
        "href": "/page4"
      },
      {
        "type": SideNavigationItemType.LINK,
        "text": "Page 5",
        "href": "/page5"
      },
      {
        "type": SideNavigationItemType.LINK,
        "text": "Page 6",
        "href": "/page6"
      }
    ]},
  {
    "type": SideNavigationItemType.SECTION,
    "text": "Section 2",
    "expanded": true,
    "items": [{
      "type": SideNavigationItemType.LINK,
      "text": "Page 7",
      "href": "/page7"
    },
    {
      "type": SideNavigationItemType.LINK,
      "text": "Page 8",
      "href": "/page8"
    },
    {
      "type": SideNavigationItemType.LINK,
      "text": "Page 9",
      "href": "/page9"
    }
  ]}
];

<MemoryRouter>
    <Container headingVariant='h4' title='With sections'>
        <SideNavigation
            header={{
                "href": "/",
                "text": "Application name"
            }}
            items={navigationItems}
        />
    </Container>
</MemoryRouter>
```