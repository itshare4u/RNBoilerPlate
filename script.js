#!/usr/bin/env node

console.log("Welcome to React native boilerplate");

const { execSync } = require("child_process");

const installDependencies = () => {
  console.log("\n\n");

  console.log(
    "Project initialized with success! 🚀\n"
  );

  console.log("Installing dependencies... 🛠️\n");
  execSync(`yarn`, { stdio: "inherit" });
  console.log("Dependencies installed successfully. 🚀\n");

  console.log("bundle Installing 🛠️\n");
  execSync(`bundle`, { stdio: "inherit" });
  console.log("bundle installed successfully.🚀\n");

  console.log("pod-install Installing 🛠️\n");
  execSync(`npx pod-install`, { stdio: "inherit" });
  console.log("pod-install installed successfully.🚀\n");
};
const fs = require("fs");

const initializeGit = () => {
  const gitignoreContent = `
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
  `;

  fs.writeFileSync(".gitignore", gitignoreContent);
  console.log(".gitignore file created successfully. 🚀\n");
  try {
    execSync("git add .", { stdio: "inherit", shell: true });
    execSync(`git commit -m 'Initial commit'`, {
      stdio: "inherit",
      shell: true,
    });
  } catch (error) {
    console.error(`🚨 An error occurred while initializing git: ${error}`);
  }
};

const main = async () => {
  execSync("git init", { stdio: "inherit" });
  installDependencies();
  initializeGit();
};

new Promise((resolve) => {
  main();
  resolve();
})
  .then(() => {
    console.log(
      "- 🎉  Congrats! Your project is ready! 🎉\n"
    );
  })
  .catch((error) => {
    console.error(`🚨 An error occurred with post init script: ${error}`);
    throw new Error();
  });
