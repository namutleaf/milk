import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import type { CameraFacing, FlashMode } from '@milk/core';
import { colors } from '@/theme/colors';
import { PermissionGate } from './PermissionGate';
import { CameraTopBar } from './CameraTopBar';
import { CameraBottomBar } from './CameraBottomBar';
import { PhotoReviewOverlay } from './PhotoReviewOverlay';

const FLASH_CYCLE: FlashMode[] = ['off', 'auto', 'on'];

export function CaptureScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const [facing, setFacing] = useState<CameraFacing>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const cameraRef = useRef<CameraView>(null);

  const handleRequestPermissions = useCallback(async () => {
    await requestCameraPermission();
    await requestMediaLibraryPermission();
  }, [requestCameraPermission, requestMediaLibraryPermission]);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current || !isCameraReady || isCapturing) return;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.9 });
      setCapturedUri(photo.uri);
    } finally {
      setIsCapturing(false);
    }
  }, [isCameraReady, isCapturing]);

  const handleRetake = useCallback(() => {
    setCapturedUri(null);
    setIsSaved(false);
  }, []);

  const handleSave = useCallback(async () => {
    if (!capturedUri) return;
    setIsSaving(true);
    try {
      if (!mediaLibraryPermission?.granted) {
        const response = await requestMediaLibraryPermission();
        if (!response.granted) return;
      }
      await MediaLibrary.saveToLibraryAsync(capturedUri);
      setIsSaved(true);
    } finally {
      setIsSaving(false);
    }
  }, [capturedUri, mediaLibraryPermission, requestMediaLibraryPermission]);

  const handleToggleFlash = useCallback(() => {
    setFlash((current) => FLASH_CYCLE[(FLASH_CYCLE.indexOf(current) + 1) % FLASH_CYCLE.length]);
  }, []);

  const handleFlip = useCallback(() => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }, []);

  if (!cameraPermission) {
    return <View style={styles.container} />;
  }

  if (!cameraPermission.granted) {
    return (
      <PermissionGate onRequest={handleRequestPermissions} denied={!cameraPermission.canAskAgain} />
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
        flash={flash}
        onCameraReady={() => setIsCameraReady(true)}
      />
      {capturedUri ? (
        <PhotoReviewOverlay
          uri={capturedUri}
          saving={isSaving}
          saved={isSaved}
          onRetake={handleRetake}
          onSave={handleSave}
        />
      ) : (
        <SafeAreaView style={styles.overlay} pointerEvents="box-none">
          <CameraTopBar flash={flash} onToggleFlash={handleToggleFlash} />
          <View style={styles.spacer} />
          <CameraBottomBar
            onCapture={handleCapture}
            onFlip={handleFlip}
            captureDisabled={!isCameraReady || isCapturing}
          />
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  spacer: {
    flex: 1,
  },
});
