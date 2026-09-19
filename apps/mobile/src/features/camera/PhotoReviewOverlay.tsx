import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

interface Props {
  uri: string;
  saving: boolean;
  saved: boolean;
  onRetake: () => void;
  onSave: () => void;
}

/**
 * Phase 1 stops here (save or retake). Phase 3 inserts a LOOK picker
 * between capture and save on this same screen.
 */
export function PhotoReviewOverlay({ uri, saving, saved, onRetake, onSave }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.preview} resizeMode="contain" />
      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={onRetake}>
          <Text style={styles.secondaryLabel}>다시 찍기</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={onSave} disabled={saving || saved}>
          <Text style={styles.primaryLabel}>{saved ? '저장됨' : saving ? '저장 중…' : '앨범에 저장'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
  },
  preview: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 28,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  secondaryLabel: {
    color: colors.cream,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    backgroundColor: colors.accent,
  },
  primaryLabel: {
    color: colors.background,
    fontWeight: '700',
  },
});
