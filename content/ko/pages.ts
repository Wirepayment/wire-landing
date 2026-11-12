import type { PageCopy, PublicPath, SiteCopy } from "@/lib/seo";

// Korean title and description of every public page, translated from
// content/mn/pages.ts (the source).
export const PAGES: Record<PublicPath, PageCopy> = {
  "/": {
    title: "Wire — 몽골을 위한 결제 게이트웨이",
    description:
      "하나의 연동으로 몽골의 은행 앱, 전자지갑, QR, 카드 결제를 받으십시오. 결제 링크, 결제 페이지, REST API와 SDK를 제공합니다.",
  },
  "/features": {
    title: "기능 — 하나의 연결, 여러 채널",
    description:
      "QR, 은행 앱, 카드, 전자지갑, 분할 결제 — QPay, PayLink, Toki, MonPay, StorePay, Pocket Zero를 하나의 API로. 실시간 알림, 보고서, MNT 완전 지원.",
  },
  "/developers": {
    title: "개발자용 — API · SDK · Webhook",
    description:
      "명확한 REST API, 6개 언어 SDK + checkout JS/iOS, 서명된 Webhook. 10분 만에 첫 결제를 받으십시오.",
  },
  "/links": {
    title: "결제 링크 — 몇 초 만에 준비",
    description:
      "대시보드에서 결제 링크를 만들어 메신저, SNS 게시물, 이메일로 공유하십시오. QR 코드와 이미지 미리보기로 누구나 쉽게 사용할 수 있습니다.",
  },
  "/guide": {
    title: "시작 가이드 — 가입부터 결제 수납까지",
    description:
      "Wire 가입, 이메일·휴대폰·DAN 인증, 프로젝트 생성, 결제 사업자 연결 활성화까지의 전체 과정 — 실제 화면과 함께하는 20단계.",
  },
  "/verification": {
    title: "인증 — 이메일, 휴대폰, DAN(KYC)",
    description:
      "Wire에서는 모든 계정 소유자가 이메일 주소를 일회용 코드로, 휴대폰 번호를 SMS로, 개인 정보를 정부 DAN 전자 신원 인증 시스템으로 인증합니다. 정보는 암호화되어 저장됩니다.",
  },
  "/guides/online-payment": {
    title: "웹사이트에서 온라인 결제를 받는 방법",
    description:
      "웹사이트나 앱에서 QR, 은행 앱, 카드, 전자지갑 결제를 하나의 연결로 받으십시오. 가입부터 첫 결제까지 5단계입니다.",
  },
  "/guides/payment-link": {
    title: "웹사이트 없이 결제 받기 — 결제 링크",
    description:
      "Facebook, Instagram, Messenger에서 판매한다면 결제 링크를 만들어 공유하십시오. 개발자가 필요 없으며, 링크 하나로 여러 결제를 받습니다.",
  },
  "/guides/card-payments": {
    title: "몽골에서 온라인 카드 결제 받기",
    description:
      "Visa, Mastercard 및 국내 카드로 결제를 받으십시오. 대시보드에서 카드 결제 채널을 활성화하고 링크와 결제 페이지에서 제공하십시오.",
  },
  "/guides/qr-payments": {
    title: "매장과 앱에 QR 결제 도입하기",
    description:
      "모든 결제에 QR 코드와 은행 앱 딥링크를 제공합니다. 몽골 결제 사업자들의 QR 결제를 하나의 연결로 받으십시오.",
  },
  "/guides/payment-gateway": {
    title: "결제 게이트웨이란 — 여러 결제 사업자, 하나의 연결",
    description:
      "결제 게이트웨이의 작동 방식과 결제 사업자마다 따로 연동하는 방식과의 차이. 하나의 API, 하나의 대시보드, 하나의 Webhook.",
  },
  "/guides/platform": {
    title: "플랫폼·마켓플레이스의 여러 가맹점 결제를 하나의 API로",
    description:
      "가맹점을 API로 등록하고 가맹점을 대신하여 결제를 생성하십시오. 각 가맹점은 결제 대금을 자체 계좌로 직접 받습니다.",
  },
  "/payments-in-mongolia": {
    title: "몽골에서 온라인 결제를 받는 방법",
    description:
      "가입하고 한 번 인증한 뒤 결제 사업자를 활성화하십시오. 결제 페이지, 결제 링크 또는 Wire REST API로 몽골 투그릭(MNT) 결제를 받습니다.",
  },
  "/terms": {
    title: "서비스 이용약관",
    description:
      "Wire(wire.mn) 서비스 이용약관 — 계정, 인증(KYC), 정보 보호, 결제 데이터, 이용자의 의무.",
  },
  "/status": {
    title: "서비스 상태",
    description:
      "Wire 서비스(API, 대시보드, 결제 페이지, 웹사이트)의 현재 운영 상태입니다.",
  },
};

export const SITE: SiteCopy = {
  keywords: [
    "WireMN",
    "Wire",
    "wire.mn",
    "결제 게이트웨이",
    "몽골 결제",
    "전자지갑",
    "BNPL",
    "결제 API",
    "가맹점",
    "Buildry",
  ],
  summary:
    "Wire는 몽골 사업자를 위한 결제 게이트웨이입니다. 하나의 연결로 몽골 결제 사업자들을 통해 QR 코드와 은행 앱(QPay), 카드(PayLink), 전자지갑(Toki, MonPay), 후불 결제(StorePay, Pocket Zero) 결제를 받습니다. 바로 쓸 수 있는 결제 링크나 REST API를 제공하며, 모든 매출을 하나의 대시보드에서 관리합니다.",
  homeCrumb: "홈",
};
