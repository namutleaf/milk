import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { ShutterButton } from './ShutterButton';

interface Props {
  onCapture: () => void;
  onFlip: () => void;
  captureDisabled?: boolean;
}

export function CameraBottomBar({ onCapture, onFlip, captureDisabled }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.side} />
      <ShutterButton onPress={onCapture} disabled={captureDisabled} />
      <View style={styles.side}>
        <Pressable style={styles.flipButton} onPress={onFlip} hitSlop={12}>
          <Text style={styles.flipLabel}>⟲</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  side: {
    width: 48,
    alignItems: 'center',
  },
  flipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.overlayScrim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipLabel: {
    color: colors.cream,
    fontSize: 22,
  },
});
