
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { colors } from '../styles/commonStyles';

interface SimpleBottomSheetProps {
  children?: React.ReactNode;
  isVisible?: boolean;
  onClose?: () => void;
  keepOpen?: boolean;
}

const SNAP_POINTS = [0.3, 0.6, 0.9]; // 30%, 60%, 90% of screen height
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SimpleBottomSheet({ 
  children, 
  isVisible = false, 
  onClose, 
  keepOpen = false 
}: SimpleBottomSheetProps) {
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const gestureTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Show bottom sheet with Wii-style animation
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: SCREEN_HEIGHT * (1 - SNAP_POINTS[1]), // Default to 60%
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      setCurrentSnapPoint(1);
    } else {
      // Hide bottom sheet
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: SCREEN_HEIGHT,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, translateY, backdropOpacity]);

  const handleBackdropPress = () => {
    if (!keepOpen && onClose) {
      onClose();
    }
  };

  const snapToPoint = (point: number) => {
    const targetY = SCREEN_HEIGHT * (1 - SNAP_POINTS[point]);
    Animated.spring(translateY, {
      toValue: targetY,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    setCurrentSnapPoint(point);
  };

  const getClosestSnapPoint = (currentY: number, velocityY: number) => {
    const currentProgress = 1 - currentY / SCREEN_HEIGHT;
    
    if (velocityY > 500) return 0; // Fast downward swipe
    if (velocityY < -500) return SNAP_POINTS.length - 1; // Fast upward swipe
    
    // Find closest snap point
    let closest = 0;
    let minDistance = Math.abs(SNAP_POINTS[0] - currentProgress);
    
    for (let i = 1; i < SNAP_POINTS.length; i++) {
      const distance = Math.abs(SNAP_POINTS[i] - currentProgress);
      if (distance < minDistance) {
        minDistance = distance;
        closest = i;
      }
    }
    
    return closest;
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: gestureTranslateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationY, velocityY } = event.nativeEvent;
      const currentY = SCREEN_HEIGHT * (1 - SNAP_POINTS[currentSnapPoint]) + translationY;
      
      const targetSnapPoint = getClosestSnapPoint(currentY, velocityY);
      
      if (targetSnapPoint === 0 && !keepOpen && onClose) {
        onClose();
      } else {
        snapToPoint(targetSnapPoint);
      }
      
      // Reset gesture translation
      gestureTranslateY.setValue(0);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      statusBarTranslucent
      animationType="none"
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View 
          style={[
            styles.backdrop, 
            { opacity: backdropOpacity }
          ]} 
        />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [
                { 
                  translateY: Animated.add(translateY, gestureTranslateY)
                }
              ],
            },
          ]}
        >
          {/* Wii-style Handle */}
          <View style={styles.wiiHandle} />
          
          {/* Wii-style Header */}
          <View style={styles.wiiHeader}>
            <View style={styles.wiiIndicators}>
              <View style={[styles.wiiIndicator, { backgroundColor: colors.wiiBlue }]} />
              <View style={[styles.wiiIndicator, { backgroundColor: colors.wiiGreen }]} />
              <View style={[styles.wiiIndicator, { backgroundColor: colors.wiiYellow }]} />
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.wiiTextDark,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.wiiWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: SCREEN_HEIGHT * 0.3,
    maxHeight: SCREEN_HEIGHT * 0.9,
    borderWidth: 1,
    borderColor: colors.wiiDarkGray,
    boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  wiiHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.wiiDarkGray,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  wiiHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.wiiGray,
    alignItems: 'center',
  },
  wiiIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wiiIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
