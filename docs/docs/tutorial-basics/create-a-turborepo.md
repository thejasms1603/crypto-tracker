# Creating a Turborepo 

In this guide, we will walk you through setting up **Turborepo** in a monorepo to streamline and optimize workflows for both frontend and backend projects. Turborepo is a high-performance build system for JavaScript and TypeScript codebases, designed to make managing monorepos easier.

## What is a Turborepo?

Turborepo is a tool developed by Vercel that helps with managing monorepos efficiently. It speeds up workflows by caching and parallelizing tasks, such as building, testing, linting, and more. By using Turborepo, you can significantly reduce the time it takes to perform these tasks across multiple projects.

## Step 1: Install Turborepo

To begin, navigate to the root of your monorepo and install **Turborepo** as a development dependency.

```bash
npm install --save-dev turbo
```

## Alternatively, if you’re using Yarn
install it with:
```
yarn add --dev turbo
```

This will add Turborepo to your project’s development dependencies.

## Step 2: Configure turbo.json

Turborepo uses a configuration file called turbo.json to define how your monorepo should be built. This configuration file will be placed at the root of your monorepo.

Here’s an example of how a basic turbo.json might look:

```
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^test"]
    }
  }
}
```

Explanation:
 - build: Defines the build process for your applications. The "^build" dependency means that the build step for the current project will depend on the build of the dependencies.
 - dev: Disables caching during development as the build process is often not needed to be cached in a development environment.
 - lint and test: Defines dependencies for linting and testing tasks.

## Step 3: Organize Your Monorepo

We have a monorepo with two main projects: Next.js project and a dockusauraus project. The directory structure might look like this:

```
/monorepo
    /next.js
    /docusauraus
    /packages
  turbo.json
  package.json
```

- /next.js: Our Next.js app.
- /docusauraus: The official documentation of our app.
- /packages: A shared package that both projects can use [optional].

## Step 4: Use Turborepo to Manage Builds
You can now use Turborepo to run scripts across your monorepo. Here’s how to use it:
	1.	Run a command for all packages:
    ```
    npx turbo run build
    ```
If you want to run the build script for both the projects at the same time:

## Step 5: Running Your Monorepo

With Turborepo in place, you can now use a single command to run and manage your monorepo projects. For example, to run the development server for both the project: