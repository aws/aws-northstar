# NorthStar - Prototyping Design System

[![Github Action Workflow - CI](https://github.com/aws/aws-northstar/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/aws/aws-northstar/actions/workflows/ci.yml)
[![NorthStar UI NPM latest version](https://img.shields.io/npm/v/@aws-northstar/ui)](https://www.npmjs.com/package/@aws-northstar/ui)
[![Coverage Status](https://coveralls.io/repos/github/aws/aws-northstar/badge.svg?branch=main)](https://coveralls.io/github/aws/aws-northstar?branch=main)
[![GitHub Release Date](https://img.shields.io/github/release-date/aws/aws-northstar)](https://github.com/aws/aws-northstar/releases)
[![NPM Download](https://img.shields.io/npm/dw/@aws-northstar/ui)](https://www.npmjs.com/package/@aws-northstar/ui)
![NPM type definitions](https://img.shields.io/npm/types/aws-northstar)
[![Github license](https://img.shields.io/npm/l/aws-northstar)](https://github.com/aws/aws-northstar/blob/main/LICENSE)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/aws/aws-northstar.svg)](https://github.com/aws/aws-northstar/pulls)
[![GitHub issues](https://img.shields.io/github/issues/aws/aws-northstar)](https://github.com/aws/aws-northstar/issues)

NorthStar is an open source design system with reusable React components for rapidly prototyping intuitive, meaningful and accessible user experience. It simplifies your work and ensures consistent, predictable user experience at scale for your customers. With NorthStar, you can focus on innovation and do more with less.

Check out our [documentation website](https://aws.github.io/aws-northstar) for more details.

## Cloudscape Design System and NorthStar v2

On July 19, 2022, AWS released [Cloudscape Design System](https://cloudscape.design/) as open source. Cloudscape is a solution for building intuitive user experiences. It offers guidelines to create web applications, along with the design resources and front-end components to streamline implementation. 

NorthStar v2 (**@aws-northstar/ui**) improves upon the previous version by leveraging [Cloudscape Design System](https://cloudscape.design/) and with updates to the existing components with new features that make the development experience even better.

## NorthStar Legacy

NorthStar legacy (**aws-northstar**), released in October 2020, was built using [Material UI v4](https://v4.mui.com/) as its base and provided approximately 50 components for building prototyping user experience. **This version entered maintenance on April 1, 2023.** 

During the maintenance phase, NorthStar legacy will only receive critical bug fixes and security patches. New features will be exclusively developed for NorthStar v2. **On April 1, 2024, support will end for NorthStar legacy.** 

Refer to [the Migration tabs in the documentation website](https://aws.github.io/aws-northstar/?path=/story/migration-migratingfromlegacy--page) for more information on how to migrate NorthStar legacy to v2.  

## Development

Contribution guide are available at the [Contributing Guidelines](https://github.com/aws/aws-northstar/blob/main/CONTRIBUTING.md).

### Folder Structure

This monorepo hosts source code for NorthStar v2 and its example project. 

| Path                                  |                                                |
| ------------------------------------- | ---------------------------------------------- |
| **packages/ui**                       | Source code for NorthStar v2                   |
| **packages/examples/ui**              | Source code for NorthStar v2 demo app          |

### Prerequisites

* [git-secrets](https://github.com/awslabs/git-secrets#installing-git-secrets)

### Commands

In the project directory, you can run:

#### `yarn storybook`

Runs storybook to navigate all the components on NorthStarv v2. 

Open [http://localhost:6006](http://localhost:6006) to view it in the browser. The page will reload if you make edits.

**It is recommended to use storybook as development environment.**

#### `yarn lint:fix`

Fix lint problems automatically

#### `yarn check:all`

Check all the tests passed, code built, storybook built, documentation built

## License

This project is licensed under the Apache-2.0 License.

## Changelog

Check out the [Changelog](https://github.com/aws/aws-northstar/releases)

