## About

This document provides a set of best practices for contributions - bug reports, code submissions / pull requests, etc.

## Submitting bugs

### Due diligence

Before submitting a bug, please do the following:

Perform basic troubleshooting steps:

- Make sure you’re on the latest version. If you’re not on the most recent version, your problem may have been solved already! Upgrading is always the best first step.
- Try older versions. If you’re already on the latest release, try rolling back a few minor versions (e.g. if on 1.7, try 1.5 or 1.6) and see if the problem goes away. This will help the devs narrow down when the problem first arose in the commit log.
- Try upgrading/downgrading versions of peer dependencies.

### What to put in your bug report

Make sure your report gets the attention it deserves: bug reports with missing information may be ignored or assigned back to you, delaying a fix. The below constitutes a bare minimum; more info is almost always better:

- What operating system are you on? Windows? Mac OS X? 

- What browser are you using? Chrome? Safari? Firefox? Internet Explorer? and which version is it? Chrome Version 81.0.4044.138 (Official Build) (64-bit)? Again, more detail is better.

- Which version or versions of NorthStar are you using? Ideally, you followed the advice above and have ruled out (or verified that the problem exists in) a few different versions.

- How can the developers recreate the bug on their end? If possible, include a copy of your code and screenshots (if applicable.)

- What version of the Node are you using in your development environment? 

A common tactic is to pare down your code until a simple (but still bug-causing) “base case” remains. Not only can this help you identify problems which aren’t real bugs, but it means the developer can get to fixing the bug faster.

## Contributing changes

### Licensing of contributed material

Keep in mind as you contribute, that code, docs and other material submitted to NorthStar are usually considered licensed under the same terms as the rest of the work.

- Anything submitted to a project falls under the licensing terms in the repository’s top level LICENSE file.

- Please don’t add your own copyright headers to new files! Our precommit hook will add our copyright header to new files.

- Not least because even a new file created by one individual (who often feels compelled to put their personal copyright notice at the top) will inherently end up contributed to by dozens of others over time, making a per-file header outdated/misleading.


### Licensing of third party dependencies

Only third party dependencies with the following licenses can be used in NorthStar.

- MIT
- Apache-2.0
- BSD/BSD-2-Clause/BSD-3-Clause;
- ISC

We have included the license check step in the pre commit hook to ensure any new third party dependencies are compliant with license requirements.

### Version control branching

Always make a new branch for your work, no matter how small. This makes it easy for others to take just that one set of changes from your repository, in case you have multiple unrelated changes floating around.

A corollary: don’t submit unrelated changes in the same branch/pull request! The maintainer shouldn’t have to reject your awesome bugfix because the feature you put in with it needs more review.

Always branch off of the `main` branch. Note that depending on how long it takes for the dev team to merge your patch, the copy of `main` you worked off of may get out of date! If you find yourself ‘bumping’ a pull request that’s been sidelined for a while, make sure you rebase to latest `main` to ensure a speedier resolution.

### Code formatting

Follow the style you see used in the primary repository! Consistency with the rest of the project always trumps other considerations. It doesn’t matter if you have your own style or if the rest of the code breaks with the greater community - just follow along.

You can find detailed Coding Guidelines [here](/#/Contribution%20Guide/Coding%20Guidelines).  

### Documentation isn’t optional
It’s not! Patches without documentation will be returned to sender. By “documentation” we mean:

- The description of the component and props. 
- Full examples on how users should use the component should be included in the `<Component>.md` file.
- General guidelines for the component
- Storybook usecases
- Description and parameter list of shared util methods you added. 

### Tests aren’t optional
Any bugfix that doesn’t include a test proving the existence of the bug being fixed, may be suspect. Ditto for new features that can’t prove they actually work.

We’ve found that test-first development really helps make features better architected and identifies potential edge cases earlier instead of later. Writing tests before the implementation is strongly encouraged.
