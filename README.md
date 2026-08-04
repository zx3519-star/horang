<p align="center">
  <img src="icon.png" width="96" alt="Horang icon" />
</p>

<h1 align="center">호랑 (Horang)</h1>

<p align="center">
  프리랜서 일러스트레이터를 위한 커미션·정산 관리 데스크톱 앱
</p>

<p align="center">
  <a href="https://github.com/zx3519-star/horang/releases/latest">
    <img src="https://img.shields.io/github/v/release/zx3519-star/horang" alt="latest release" />
  </a>
  <img src="https://img.shields.io/badge/platform-Windows-blue" alt="platform" />
  <a href="https://zx3519-star.github.io/horang/">
    <img src="https://img.shields.io/badge/website-horang-orange" alt="website" />
  </a>
</p>

---

## 다운로드

**[최신 버전 다운로드](https://github.com/zx3519-star/horang/releases/latest)** — Windows용 설치 파일(`.exe`) 제공

> 이 저장소는 [호랑 공식 웹사이트](https://zx3519-star.github.io/horang/)와 릴리즈 배포를 위한 저장소예요.

## 호랑이 뭔가요?

호랑은 일러스트 커미션을 받는 프리랜서를 위해 만든 데스크톱 앱이에요. 견적부터 결제, 진행
현황, 정산까지 커미션 작업의 전체 흐름을 한 곳에서 관리할 수 있어요. 프로필별로 워크스페이스가
분리돼 있어서 부캐/여러 브랜드를 따로 운영하는 경우에도 각각 독립적으로 관리할 수 있어요.

## 주요 기능

### 커미션 관리
- 캐릭터별 기본 유형 + 스타일 + 추가 옵션을 조합해 견적을 자동 계산
- 선금 + 분할 잔금 결제 플랜, 회차별 입금 처리, 환불 처리
- KRW/USD 지원 — 환율과 PayPal 수수료를 반영한 실수령액 계산
- 진행 단계(의뢰 접수 → 작업 중 → 완료 등)를 프로필마다 원하는 대로 커스텀
- 매출 추이, 미수금, 수수료 합계를 한눈에 보는 대시보드

### 가계부 · 일정 · 메모
- 커미션 결제 내역이 자동으로 연동되는 월별 가계부
- 일/주/월 캘린더와 마감일 리마인더
- 카테고리 보드 형태의 메모 (커미션/고객과 서로 링크 가능)

### AI 기능 (Gemini, 사용자 API 키 직접 연결)
- 과거 커미션 기록 일괄 등록, 가격표 이미지에서 항목 자동 인식
- 안내 문구·메시지 템플릿 자동 생성
- 다국어 번역 (자동 감지 ↔ 한국어, 7개 언어 지원)

### 그 외
- 프로필별 독립 워크스페이스 (로컬 SQLite 저장, 클라우드 전송 없음)
- 첫 실행 시 단계별 튜토리얼과 마스코트 캐릭터
- 자동 업데이트 지원

## 개인정보 & 이용약관

- [개인정보처리방침](https://zx3519-star.github.io/horang/privacy.html)
- [이용약관](https://zx3519-star.github.io/horang/terms.html)

## 기술 스택

Electron · React · TypeScript · SQLite

---

<p align="center">버그 제보나 기능 제안은 <a href="https://github.com/zx3519-star/horang/issues">Issues</a>에 남겨주세요.</p>
