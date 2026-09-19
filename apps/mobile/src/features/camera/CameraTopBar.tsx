import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import type { FlashMode } from '@milk/core';

interface Props {
  flash: FlashMode;
  onToggleFlash: () => void;
}

const FLASH_LABEL: Record<FlashMode, string> = {
  off: 'OFF',
  on: 'ON',
  auto: 'AUTO',
};

export function CameraTopBar({ flash, onToggleFlash }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.wordmark}>MILK</Text>
      <Pressable style={styles.flashButton} onPress={onToggleFlash} hitSlop={8}>
        <Text style={styles.flashLabel}>⚡ {FLASH_LABEL[flash]}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  wordmark: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 3,
  },
  flashButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.overlayScrim,
  },
  flashLabel: {
    color: colors.cream,
    fontSize: 13,
    fontWeight: '600',
  },
});
