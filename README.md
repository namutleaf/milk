# MILK

직관적인 매뉴얼 조작, 담백한 렌더링, 프리셋 생태계를 위한 프로 카메라 앱.

Camera + Looks + Community + Preset Marketplace를 하나로 묶는 사진 플랫폼을
목표로, 실행 가능한 작은 버전부터 단계적으로 확장합니다. 전체 로드맵은
[`ROADMAP.md`](./ROADMAP.md) 참고.

## 프로젝트 구조

```
milk/
  apps/
    mobile/            # Expo (React Native) 앱 — 카메라 화면, UI
  packages/
    core/               # 공유 타입: CameraSessionState, LookDefinition, Preset
    looks-engine/        # LOOK 렌더링 파이프라인 (Phase 3부터 구현)
```

## 실행 방법 (내 폰에서 직접 확인하기)

1. 폰에 **Expo Go** 앱 설치 (App Store / Play Store)
2. 이 저장소를 로컬(또는 이 세션과 같은 네트워크)에서 클론
3. 의존성 설치 및 개발 서버 실행:

   ```bash
   npm install
   cd apps/mobile
   npx expo start --tunnel
   ```

4. 터미널에 뜨는 QR 코드를 Expo Go 앱으로 스캔하면 실제 카메라로 바로
   테스트할 수 있습니다. (`--tunnel`은 이 개발 서버가 다른 네트워크의
   폰에서도 보이게 해줍니다. 같은 Wi-Fi에 있다면 `--tunnel` 없이도 됩니다.)

## 현재 상태 (Phase 1)

- 실시간 카메라 뷰파인더
- 셔터 촬영, 카메라 전/후면 전환, 플래시 off/auto/on 토글
- 촬영 후 미리보기 → 저장(앨범) 또는 다시 찍기

다음 단계는 조리개/셔터스피드/ISO/노출 다이얼 조작(Phase 2)입니다.
