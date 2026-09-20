// Matches expo-modules-core's PermissionResponse shape without depending on
// it directly — it's a transitive dependency, not one apps/mobile declares.
interface PermissionResponse {
  status: 'granted' | 'undetermined' | 'denied';
  expires: 'never' | number;
  granted: boolean;
  canAskAgain: boolean;
}

// expo-media-library's default entry unconditionally requires a native
// module that doesn't exist on web, crashing on import — not just on use.
// MILK doesn't target web as a real platform, so this stub just keeps the
// capture screen's UI testable in a browser without saving anything.
const DENIED_RESPONSE: PermissionResponse = {
  status: 'denied',
  expires: 'never',
  granted: false,
  canAskAgain: false,
};

export function usePermissions(): [
  PermissionResponse | null,
  () => Promise<PermissionResponse>,
  () => Promise<PermissionResponse>,
] {
  const request = async () => DENIED_RESPONSE;
  return [DENIED_RESPONSE, request, request];
}

export async function saveToLibraryAsync(_localUri: string): Promise<void> {
  console.warn('MILK: saving to the photo library is not supported on web.');
}
