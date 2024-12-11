/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// get folder name from terminal argument
const folderName = process.argv[2];
if (!folderName) {
  console.error('Please provide a component name');
  process.exit(1);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// create the folder
fs.mkdir(`../src/components/${capitalizeFirstLetter(folderName)}`, err => {
  if (err) throw err;
  console.log(`Folder ${folderName} created successfully`);

  const fileName = capitalizeFirstLetter(folderName);

  const useHookFileName = capitalizeFirstLetter(fileName);

  // create hook js hookFile.ts
  const hookFile = `import { useAppContext } from '@src/context';

import { ${folderName}Styles } from './${fileName}.style';

const use${useHookFileName} = () => {
  const { color, navigation } = useAppContext();

  // add your code here

  return {
    navigation,
    styles: ${folderName}Styles(color),
  };
};

export default use${useHookFileName};
`;

  fs.writeFileSync(
    path.join(`../src/components/${fileName}`, `use${useHookFileName}.ts`),
    hookFile,
    errHook => {
      if (errHook) throw errHook;
      console.log(`use${fileName}.ts file created successfully`);
    }
  );

  // create styleFile.ts
  const styleFile = `import { StyleSheet } from 'react-native';

import { Palette } from '@src/utils';

export const ${folderName}Styles = ({}: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });
`;
  fs.writeFileSync(
    path.join(`../src/components/${fileName}`, `${fileName}.style.ts`),
    styleFile,
    errStyles => {
      if (errStyles) throw errStyles;
      console.log(`${fileName}.style.ts file created successfully`);
    }
  );

  // create defaultScreen.tsx
  const defaultScreen = `import React from 'react';
import { View } from 'react-native';

import { Text } from '@app/blueprints';

import use${useHookFileName} from './use${useHookFileName}';

const ${useHookFileName}Screen = () => {
  const { styles } = use${useHookFileName}();

  return (
    <View style={styles.container}>
      <Text preset="h1">${useHookFileName} Screen</Text>
    </View>
  );
};

export default React.memo(${useHookFileName});
`;

  fs.writeFileSync(
    path.join(`../src/components/${fileName}`, `${fileName}.tsx`),
    defaultScreen,
    errScreen => {
      if (errScreen) throw errScreen;
      console.log(`${fileName}.tsx file created successfully`);
    }
  );

  const exportToIndex = `export * from './${fileName}/${fileName}';\n`;

  fs.appendFile(`../src/components/index.ts`, exportToIndex, errScreen => {
    if (errScreen) throw errScreen;
    console.log(`${useHookFileName} file created successfully`);
  });
});
