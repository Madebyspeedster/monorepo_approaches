# AIM - Setup react monorepo project using NPM workspaces

### 👉 More about [NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces#adding-dependencies-to-a-workspace)

---

### Preferred structure

We're going to have next project structure:

```
we're going to have next project structure:
.
└── root/
    ├── node_modules/
    ├── packages/
    │   ├── app1/ (create-react-app)
    │   │   ├── src/
    │   │   └── package.json
    │   └── common/ (shared component library)
    │       └── components
    │       └── utils
    │       └── package.json
    ├── package.json
    └── package.lock.json
```

# Implementation details 📚

## Project init via npm workspaces

- Step/1 - In the root project, create a package.json file with the following config.

```json
{
  "name": "npm_workspaces",
  "private": "true",
  "workspaces": ["./packages/*"]
}
```

- Step/2 Create **packages** directory within the `root` folder

- Step/3 **Create app1**

  - Navigate to the packages folder
  - Create new [CRA](https://reactjs.org/docs/create-a-new-react-app.html) project using following command `npx create-react-app app1 --template typescript`

- Step/4 Once we have `app1` let's do a few changes 🛠

  - In `app1/package.json` rename project name from `app1` to `@ng_speedster/app1`.
    Why? Naming packages with @{domain}/{package-name} will group all the packages inside one common folder in node_modules. It allows for easier debugging if something some packages are not working properly or some else goes wrong. In my case, I have renamed the namekey in the app package as @ng_speedster/app1.
  - Move packages `dependencies` from `app1/package.json` to `root/package.json`. I'm doing that, cause I would like to have consistency between my react projects. In short I just want to have the same versions of react related dependencies:

  ```json
  {
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.4.0",
    "@types/node": "^16.11.21",
    "@types/react": "^17.0.38",
    "@types/react-dom": "^17.0.11",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "5.0.0",
    "typescript": "^4.5.4",
    "web-vitals": "^2.1.3"
  }
  ```

- Step/5 **Create common** package

  - Basically, this step repeats step 3 & 4;
  - Navigate to the packages folder
  - Create new [CRA](https://reactjs.org/docs/create-a-new-react-app.html) project using following command `npx create-react-app common --template typescript`
  - Move packages `dependencies` from `common/package.json` to `root/package.json`.

- Step/6
  - Remove node_modules from `app1` and `common` projects
  - Navigate to the root folder and run `npm install` -
    It will install all the dependencies across all the packages into the root. You can then check the root node_modules folder to locate your package.

## Projects is added, what's next?

### Transpiling JSX into js from the shared component package

As we are not transpiling (converting JSX into createElements) from our shared components package, we will rely on cra to do the transpilation step. It makes the process a whole lot easier. To do so, we have to customize babel by using react-app-rewiredand customize-crapackages. It allows you to customize webpack configuration without ejecting react-scripts.

- Step/1 Installing and configuring react-app-rewired and customize-cra

  - Navigate to the root folder
  - `npm workspace @ng_speedster/app add -D react-app-rewired customize-cra`
  - In the `app1/package.json` make the next changes:

  ```json
  {
    "scripts": {
      "start": "react-app-rewired start",
      "build": "react-app-rewired build",
      "test": "react-app-rewired test",
      "eject": "react-scripts eject"
    }
  }
  ```

- Step/2 Override babel config by creating the config-overrides.js file in the app package.
  ```javascript
  const path = require("path");
  const { override, babelInclude } = require("customize-cra");
  module.exports = function (config, env) {
    return Object.assign(
      config,
      override(
        babelInclude([
          /* transpile (converting to es5) code in src/ and shared component library */
          path.resolve("src"),
          path.resolve("../common"),
        ])
      )(config, env)
    );
  };
  ```
  - It instructs babel to transpile all the files in the app's src directory and shared component package.

---

## So that's it, now you can create component inside common/and import inside app package.

![Example ](/assets/code.png)

# Overall

Honestly, to set up a monorepo project using npm workspaces is not that painful but requires
to dig into some areas:

- [Get familiar with npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces#adding-dependencies-to-a-workspace)
- [react-app-rewire](https://www.npmjs.com/package/react-app-rewired)
  ![react-app-rewire](/assets/react_app_rewire.png)

- [Customize-cra](https://www.npmjs.com/package/customize-cra) takes advantage of `react-app-rewired`'s `config-overrides.js` file. By importing `customize-cra` functions and exporting a few function calls wrapped in our `override` function, you can easily modify the underlying config objects (`webpack`, `webpack-dev-server`, `babel`, etc.) that make up `create-react-app`.

I didn't bring up, how to set up CI/CD builds and configure TS/JS tools - eslint/tslint etc, or how to manage multiple run-time builds, and many other things, therefore any
additional customization depends on what you want to have, so there are no CLI solutions like CRA from scratch etc...
