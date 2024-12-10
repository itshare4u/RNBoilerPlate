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
# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
**/.xcode.env.local

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof
.cxx/
*.keystore
!debug.keystore

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

**/fastlane/report.xml
**/fastlane/Preview.html
**/fastlane/screenshots
**/fastlane/test_output

# Bundle artifact
*.jsbundle

# Ruby / CocoaPods
**/Pods/
/vendor/bundle/

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*

# testing
/coverage

# Yarn
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
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
