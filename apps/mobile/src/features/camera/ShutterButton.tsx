import { Animated, Pressable, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { colors } from '@/theme/colors';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

/**
 * A physical-feeling shutter release: it compresses on press-in like a real
 * button rather than just firing a flat tap event.
 */
export function ShutterButton({ onPress, disabled }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.88, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  };
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="촬영"
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={disabled}
      hitSlop={12}
    >
      <Animated.View style={[styles.ring, { transform: [{ scale }] }, disabled && styles.disabled]}>
        <Animated.View style={styles.core} />
      </Animated.View>
    </Pressable>
  );
}

const SIZE = 78;

const styles = StyleSheet.create({
  ring: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 4,
    borderColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  core: {
    width: SIZE - 16,
    height: SIZE - 16,
    borderRadius: (SIZE - 16) / 2,
    backgroundColor: colors.cream,
  },
  disabled: {
    opacity: 0.4,
  },
});
