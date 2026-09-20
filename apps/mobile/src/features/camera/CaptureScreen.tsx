import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {
  DEFAULT_MANUAL_EXPOSURE,
  type CameraFacing,
  type ExposureMode,
  type FlashMode,
  type ManualExposureSettings,
} from '@milk/core';
import { colors } from '@/theme/colors';
import { PermissionGate } from './PermissionGate';
import { CameraTopBar } from './CameraTopBar';
import { CameraBottomBar } from './CameraBottomBar';
import { PhotoReviewOverlay } from './PhotoReviewOverlay';
import { ManualControlPanel } from './manual/ManualControlPanel';

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
  const [exposureMode, setExposureMode] = useState<ExposureMode>('auto');
  const [manualExposure, setManualExposure] = useState<ManualExposureSettings>(DEFAULT_MANUAL_EXPOSURE);

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

  const handleToggleExposureMode = useCallback(() => {
    setExposureMode((current) => (current === 'auto' ? 'manual' : 'auto'));
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
          {/* expo-camera has no manual exposure API, so this only previews the
              interaction; wiring it to the sensor is the Phase 2 native module. */}
          <ManualControlPanel
            mode={exposureMode}
            onToggleMode={handleToggleExposureMode}
            settings={manualExposure}
            onChange={setManualExposure}
          />
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
