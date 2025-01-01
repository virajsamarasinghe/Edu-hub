import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Resources = () => {
  return (
    <LinearGradient
      colors={['#8C78F0', 'rgba(140, 120, 140, 0)']}
      locations={[0.37, 0.91]}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Contact Page</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
export default Resources;