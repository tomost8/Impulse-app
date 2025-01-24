import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

const MyComponent = (
    { onLeftPress, onRightPress, value: initialValue }: 
    { onLeftPress: () => void; onRightPress: () => void; value: string }
) => {
  const [value, setValue] = React.useState('left'); //left should be initialValue but just testing
  //console.log("value", value);

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'left',
            label: 'Left',
            onPress: onLeftPress,
          },
          {
            value: 'right',
            label: 'Right',
            onPress: onRightPress,
          },
          //{ value: 'drive', label: 'Driving', onPress: () => { console.log('Driving'); } },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MyComponent;