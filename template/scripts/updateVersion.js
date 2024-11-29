const fs = require('fs');
const { execSync } = require('child_process');

// Đường dẫn đến package.json
const packagePath = '../package.json';
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Hàm lấy phiên bản cài đặt của package
function getInstalledVersion(pkgName) {
  try {
    const result = execSync(`yarn list --pattern "${pkgName}" --depth=0`, {
      encoding: 'utf8',
    });
    const regex = new RegExp(`${pkgName}@(\\d+\\.\\d+\\.\\d+)`);
    const match = result.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error(`Could not find version for ${pkgName}`);
    return null;
  }
}

// Cập nhật dependencies
['dependencies', 'devDependencies'].forEach(depType => {
  if (packageJson[depType]) {
    Object.keys(packageJson[depType]).forEach(pkg => {
      const installedVersion = getInstalledVersion(pkg);
      if (installedVersion) {
        packageJson[depType][pkg] = `^${installedVersion}`;
        console.log(`Updated ${pkg} to version ^${installedVersion}`);
      } else {
        console.warn(`Could not update version for ${pkg}`);
      }
    });
  }
});

// Ghi lại package.json
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
console.log('Package versions updated in package.json!');
