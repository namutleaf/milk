import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

interface Props {
  onRequest: () => void;
  denied: boolean;
}

export function PermissionGate({ onRequest, denied }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MILK</Text>
      <Text style={styles.body}>
        {denied
          ? '카메라 접근이 거부되어 있어요. 설정에서 권한을 허용한 뒤 다시 시도해 주세요.'
          : '사진을 찍으려면 카메라 접근 권한이 필요해요.'}
      </Text>
      {!denied && (
        <Pressable style={styles.button} onPress={onRequest}>
          <Text style={styles.buttonText}>권한 허용하기</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  title: {
    color: colors.cream,
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 4,
  },
  body: {
    color: colors.creamDim,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  buttonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 15,
  },
});
