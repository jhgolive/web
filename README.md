# Prism Remote Control

Prism Live Studio (mobile)에서 웹뷰로 특정 사이트를 띄우고, 외부에서 스크롤/이동/클릭 등을 실시간으로 제어할 수 있는 간단한 시스템입니다.

## 구조
- `server.js` : Express + WebSocket 서버 + `/proxy` 리버스 프록시
- `public/viewer.html` : 프리즘에 띄울 페이지 (iframe)
- `public/controller.html` : 조작용 페이지 (PC/다른폰에서 접속)

## 사용법 (간단)
1. 리포지터리 복제 후 `npm install`
2. `npm start` 로 로컬 실행 (포트 3000)
3. 브라우저에서 `http://localhost:3000/viewer.html?room=myroom` 를 프리즘 웹뷰 URL로 설정
4. 다른 기기에서 `http://localhost:3000/controller.html?room=myroom` 접속해서 제어

## 배포 (Railway)
1. GitHub에 리포 푸시
2. Railway에서 새 프로젝트 생성 → GitHub 리포 연결
3. Build 명령: `npm install && npm run build` (빌드 스텝 없으면 그냥 `npm start`)
4. Environment: `PORT` 자동 지정
5. 배포 후 나온 도메인을 `viewer.html` 웹뷰 URL로 사용

## 팁
- 프록시는 `GET /proxy?url=ENCODED_URL` 방식입니다.
- 방송마다 다른 `room`을 주면 여러 방송 동시 제어 가능.
- Railway 무료 플랜은 cold start/한도에 유의하세요.

## 보안 주의
- 이 코드는 예제 수준입니다. 공개 서비스로 운영하려면 인증, rate limiting, 요청 검증, 리소스 캐싱 등을 추가하세요.
- 프록시로 모든 사이트를 열 수 있으므로 악성 페이지(유해 JS 등) 로부터 보호책 필요.
