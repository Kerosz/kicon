<div align="center">

[![kicon](../../packages/athena/assets/branding.png)](https://github.com/Kerosz/kicon)

<p align="center">
    <strong>Shop online and have time to spend with the loved ones 💝</strong>
</p>

[![GitHub issues](https://img.shields.io/github/issues/Kerosz/kicon?style=for-the-badge)](https://github.com/Kerosz/kicon/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](http://chirila.dev)
[![GitHub license](https://img.shields.io/github/license/Kerosz/kicon?style=for-the-badge)](https://github.com/Kerosz/kicon/blob/main/LICENSE)

</div>
<br />

## What is this directory?

This directory is called tartarus ([/ˈtɑːrtərəs/](https://en.wikipedia.org/wiki/Tartarus)), it is currently used for our NodeJs backend.

## How can I contribute?

To see a detailed installation process please refer to the [Installation and Contributing guide which can be found here](../../INSTALLATION.MD).

## Codebase

### Technologies

The entire codebase consists in **Typescript**

Here is a list of technologies used:

- **NodeJs**: Back-end framework
- **Express**: REST API
- **Jasmine**: Testing framework
- **PostgreSQL**: Data Storage
- **Redis**: Background jobs and caching

### Folder structure

```sh
tartarus/
├── migrations             # Directory for storing assets
├── src                    # Application directory
├──── api                  # Application interface
├────── controllers        # Process incoming requests
├────── middleware         # Intermediary functions
├────── routes             # API route handling
├──── config               # Variables and configurations
├──── loaders              # Startup process modules
├──── modals               # Database models
├──── types                # Global type declaration and interfaces
├──── utils                # Helper functions
└── tests                  # Specs for testing
```