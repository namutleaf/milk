// Re-exports the native module directly. See mediaLibrary.web.ts for why
// this needs a platform split: expo-media-library's default export crashes
// at import time on web in SDK 57 (no browser has a photo library to save
// into), so web gets a stub with the same shape instead.
export { usePermissions, saveToLibraryAsync } from 'expo-media-library';
