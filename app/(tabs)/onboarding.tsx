import React from 'react';
import { StyleSheet, View } from 'react-native';

const NUM_DOTS = 12;
const RADIUS = 40; // radius of the circle (in px)
const DOT_SIZE = 12;

export default function HomeScreen() {
  const dots = [];
  for (let i = 0; i < NUM_DOTS; i++) {
    const angle = (2 * Math.PI * i) / NUM_DOTS - Math.PI / 2; // start from top
    const x = RADIUS * Math.cos(angle);
    const y = RADIUS * Math.sin(angle);
    dots.push(
      <View
        key={i}
        style={[
          styles.dot,
          {
            backgroundColor: i === 2 ? '#CB2F2F' : '#000000',
            left: x + RADIUS - DOT_SIZE / 2,
            top: y + RADIUS - DOT_SIZE / 2,
          }
        ]}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {dots}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});