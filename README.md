## Intro

This package helps in the installation of monorepo modules in subpaths from a git repository with `npm`, which is [currently not supported](https://github.com/npm/npm/issues/2974).

This is done by wrapping the contents of a targetted subpath, and pushing with a tag to the same git repository, where it is now the root path and where the npm installation path can be referenced from. For a private repository, these tags remain private for access only within your organisation.

## Installation and Usage

To install:
```
npm install --save-dev git-subpath
```

To use, ensure that you have a subpath in your monorepo repository that you want to tag for use in your other projects. Prepare the module name and the tag as well. The full command to create the tag should be like the following:
```
git-subpath -p packages/Helper -m Helper -t v0.0.1
```
- `p` flag represents the path for the targetted installation
- `m` flag represents the module name that will be used as part of the tag namespace
- `t` flag represents the version number or id variant that will be used as part of the tag namespace

Upon invoking the above command successfully, the log will reveal the installation instructions at the end
```
=========================

Output install: "npm install --save git+ssh://git@github.com:user/repo.git#v0.0.1-Helper"
```

## Help

Invoke the following after the module has been installed
```
git-subpath --help
```
Instructions such as the following should appear
```
Usage: git-subpath [options]

Options:
  -V, --version         output the version number
  -p, --path <value>    Target path to submit
  -m, --module <value>  Module name
  -t, --tag <value>     Tag version of module
  -h, --help            output usage information
```