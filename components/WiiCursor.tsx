
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

interface WiiCursorProps {
  x: number;
  y: number;
  visible?: boolean;
}

export default function WiiCursor({ x, y, visible = true }: WiiCursorProps) {
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnimation, glowAnimation]);

  if (!visible) return null;

  return (
    <View style={[styles.container, { left: x - 15, top: y - 15 }]} pointerEvents="none">
      {/* Glow effect */}
      <Animated.View 
        style={[
          styles.glow,
          {
            opacity: glowAnimation,
            transform: [{ scale: pulseAnimation }]
          }
        ]} 
      />
      
      {/* Main cursor */}
      <Animated.View 
        style={[
          styles.cursor,
          {
            transform: [{ scale: pulseAnimation }]
          }
        ]}
      >
        {/* Inner dot */}
        <View style={styles.innerDot} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  glow: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: colors.wiiBlue,
    opacity: 0.3,
  },
  cursor: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: colors.wiiWhite,
    borderWidth: 2,
    borderColor: colors.wiiBlue,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(74, 144, 226, 0.4)',
    elevation: 3,
  },
  innerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.wiiBlue,
  },
});
