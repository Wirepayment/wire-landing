import { CONTACT } from "@/lib/company";
import { DASHBOARD_URL, DOCS_URL } from "@/lib/links";
import type { Guide, GuideStep } from "@/lib/guides";

// Korean answer pages, translated from content/mn/guides.ts (the source:
// same slugs, order, step and FAQ counts). docs.wire.mn has no Korean
// edition, so docs links point at the English docs (/en/docs) and say so in
// their label.

const SIGNUP = { label: "시작하기", href: DASHBOARD_URL };

const FEE_ANSWER =
  "가입, 계좌 연결, 대시보드는 무료이며 월 이용료도 없습니다. 수수료는 성공한 거래에만 부과되며, 선택한 결제 채널에 따라 1%부터 시작합니다. 정확한 요율은 연결을 활성화할 때 해당 채널의 약관에 표시됩니다.";

const SETTLEMENT_ANSWER =
  "정산금은 연결한 은행 계좌로 입금됩니다. 입금 시점은 선택한 결제 채널의 조건에 따라 다릅니다. 모든 거래는 대시보드에 실시간으로 표시됩니다.";

const ACCOUNT_STEPS: GuideStep[] = [
  {
    title: "가입하고 한 번 인증하기",
    body: "app.wire.mn에 로그인하여 계정 소유자의 이메일, 휴대폰, DAN(몽골 정부 전자 신원 인증)을 인증합니다. 인증은 한 번만 하면 되며, 이후 사업자나 프로젝트를 몇 개 개설하더라도 다시 요청하지 않습니다.",
  },
  {
    title: "결제 사업자 활성화하기",
    body: "QPay, PayLink: 대시보드에서 결제 사업자를 선택하고 양식(등록 정보, 주소, 정산 계좌)을 작성합니다. 심사에서 승인된 뒤 계약에 전자 서명하면 즉시 연결이 활성화됩니다. Toki, MonPay, StorePay, Pocket Zero: 결제 사업자와 직접 맺은 계약과 키로 대시보드에서 연결합니다.",
  },
];

export const GUIDES: Guide[] = [
  {
    slug: "/guides/online-payment",
    label: "웹사이트에서 온라인 결제 받기",
    badge: "가이드",
    line1: "웹사이트에서 온라인 결제를",
    line2: "어떻게 받습니까?",
    answer:
      "Wire에 가입하여 인증을 마치고 결제 사업자를 활성화한 뒤, 웹사이트에서 구매자를 Wire 결제 페이지로 안내하거나 REST API로 연동합니다. 구매자는 활성화한 채널(QR, 은행 앱, 카드 등)로 결제하고, 정산금은 연결한 계좌로 입금됩니다. 바로 쓸 수 있는 결제 링크로 곧바로 시작할 수도 있습니다.",
    stepsTitle: "첫 결제까지 5단계",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "프로젝트를 만들고 API 키 받기",
        body: "프로젝트마다 고유한 sk_live 비밀 키와 하나의 Webhook이 있습니다. 키는 한 번만 표시되므로 비밀번호 관리자에 보관하십시오.",
      },
      {
        title: "구매자를 결제 페이지로 안내하기",
        body: "서버에서 PaymentIntent를 생성하고 이에 대한 checkout session을 연 뒤, 구매자를 pay.wire.mn의 결제 페이지로 보냅니다. 페이지에는 QR 코드, 은행 앱 딥링크, 활성화한 다른 채널이 자동으로 표시됩니다.",
      },
      {
        title: "Webhook으로 확인하기",
        body: "결제가 성공하면 서버로 payment_intent.succeeded 이벤트가 전송됩니다. 모든 이벤트는 HMAC-SHA256으로 서명되어 있으므로 진위를 확인한 뒤 주문을 확정하십시오.",
      },
    ],
    faqs: [
      {
        q: "웹사이트에는 어떤 기술이 필요합니까?",
        a: "어떤 기술이든 가능합니다. Wire는 REST API이므로 모든 언어와 프레임워크에서 호출할 수 있습니다. Go, Python, Node.js, PHP, Ruby, .NET용 SDK가 준비되어 있습니다.",
      },
      {
        q: "개발자가 없으면 어떻게 합니까?",
        a: "대시보드에서 결제 링크를 만들어 웹사이트, 메신저, 게시물에 올리면 됩니다. 누구나 쉽게 사용할 수 있습니다.",
      },
      {
        q: "결제가 들어온 것을 어떻게 알 수 있습니까?",
        a: "모든 거래는 대시보드에 실시간으로 표시되며 이메일 알림이 발송됩니다. 서버가 있다면 서명된 Webhook 이벤트로 자동 통보됩니다.",
      },
      {
        q: "결제 페이지는 얼마 동안 유효합니까?",
        a: "기본적으로 결제 생성 후 10분 동안 유효합니다. 결제되지 않으면 자동으로 취소됩니다.",
      },
      { q: "수수료는 얼마입니까?", a: FEE_ANSWER },
      { q: "대금은 언제 계좌에 입금됩니까?", a: SETTLEMENT_ANSWER },
    ],
    related: [
      {
        label: "빠른 시작(영문 문서)",
        href: `${DOCS_URL}/en/docs/quickstart`,
      },
      {
        label: "결제 페이지(영문 문서)",
        href: `${DOCS_URL}/en/docs/guides/hosted-checkout`,
      },
      { label: "개발자용", href: "/developers" },
      { label: "시작 가이드", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/payment-link",
    label: "웹사이트 없이 결제 받기",
    badge: "결제 링크",
    line1: "웹사이트 없이",
    line2: "어떻게 결제를 받습니까?",
    answer:
      "Wire 대시보드에서 결제 링크를 만들어 Messenger, Facebook 게시물, Instagram 또는 이메일로 보냅니다. 구매자는 링크를 눌러 QR이나 은행 앱으로 결제합니다. 웹사이트도 개발자도 필요 없으며, 링크 하나로 여러 결제를 받을 수 있습니다.",
    stepsTitle: "링크로 결제 받는 방법",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "링크 만들기",
        body: "대시보드의 결제 링크 메뉴에서 제목, 결제 설명, 금액을 입력합니다. 금액은 고정하거나 구매자가 직접 입력하도록 열어 둘 수 있습니다.",
      },
      {
        title: "공유하기",
        body: "링크를 복사하여 메신저로 보내거나, QR 코드를 인쇄하거나, Facebook, Instagram, LinkedIn에 공유합니다. SNS에서는 상호와 금액이 담긴 이미지 미리보기가 자동으로 표시됩니다.",
      },
      {
        title: "결제 현황 확인하기",
        body: "링크별 결제 건수와 누적 수금액이 대시보드에 실시간으로 표시됩니다. 링크를 일시 중지했다가 나중에 다시 활성화할 수 있습니다.",
      },
    ],
    faqs: [
      {
        q: "링크 하나로 여러 사람이 결제할 수 있습니까?",
        a: "예. 링크는 재사용할 수 있으므로 결제마다 새 링크를 만들 필요가 없습니다.",
      },
      {
        q: "구매자가 금액을 입력할 수 있습니까?",
        a: "예. 금액이 열린 링크에서는 구매자가 금액을 입력합니다. 최소 금액을 설정할 수도 있습니다(기부금, 자율 가격 등).",
      },
      {
        q: "구매자에게는 무엇이 보입니까?",
        a: "설정한 결제 설명(예: 주문 #1024)과 금액이 보입니다. 제목은 대시보드 안에서만 쓰이는 이름입니다.",
      },
      {
        q: "매장 계산대에서도 링크를 사용할 수 있습니까?",
        a: "예. 링크의 QR 코드를 인쇄하여 비치하면 구매자가 휴대폰으로 스캔하여 결제합니다.",
      },
      {
        q: "링크 결제와 API 결제는 다릅니까?",
        a: "다르지 않습니다. 모든 링크 결제는 일반 결제로 기록되어 같은 보고서에 표시되며, 같은 Webhook이 전송됩니다.",
      },
      { q: "수수료는 얼마입니까?", a: FEE_ANSWER },
    ],
    related: [
      { label: "결제 링크", href: "/links" },
      {
        label: "결제 링크(영문 문서)",
        href: `${DOCS_URL}/en/docs/guides/payment-links`,
      },
      { label: "시작 가이드", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/card-payments",
    label: "카드 결제 받기",
    badge: "카드 결제",
    line1: "몽골에서 카드 결제를",
    line2: "어떻게 받습니까?",
    answer:
      "Wire 결제 페이지에서 구매자는 Visa, Mastercard 및 국내 카드로 결제할 수 있습니다. 대시보드에서 PayLink 카드 결제 채널을 활성화하고 프로젝트에서 켜면, 결제 링크와 결제 페이지에 카드 결제 옵션이 표시되고 카드 결제도 다른 채널과 같은 대시보드에서 집계됩니다.",
    stepsTitle: "카드 결제 켜기",
    steps: [
      {
        title: "가입하고 한 번 인증하기",
        body: "app.wire.mn에 로그인하여 계정 소유자의 이메일, 휴대폰, DAN(몽골 정부 전자 신원 인증)을 인증합니다.",
      },
      {
        title: "카드 결제 채널 선택하기",
        body: "대시보드의 연결 메뉴에서 카드 결제 채널을 선택하고 등록 정보, 주소, 정산 계좌를 제출합니다.",
      },
      {
        title: "심사와 전자 계약",
        body: "신청이 승인되면 DAN으로 인증된 정보로 해당 채널의 계약에 전자 서명합니다. 계약에 서명하는 즉시 연결이 활성화됩니다.",
      },
      {
        title: "프로젝트에서 켜기",
        body: "각 프로젝트는 사용할 연결을 직접 켭니다. 켜고 나면 해당 프로젝트의 링크, 결제 페이지, API 결제에서 카드가 제공됩니다.",
      },
    ],
    faqs: [
      {
        q: "구매자는 어떤 카드로 결제할 수 있습니까?",
        a: "Visa, Mastercard 및 국내 카드입니다.",
      },
      {
        q: "카드와 QR을 함께 제공할 수 있습니까?",
        a: "예. 프로젝트에서 켠 모든 연결이 하나의 결제 페이지에 표시되며, 구매자는 편한 방법을 선택합니다.",
      },
      {
        q: "카드 결제에는 별도 계약이 필요합니까?",
        a: "예. 다만 모든 절차가 대시보드에서 진행됩니다. 신청서를 제출하고 승인되면 DAN으로 계약에 전자 서명합니다. 서류 작업이나 방문은 필요 없습니다.",
      },
      {
        q: "카드 수수료는 얼마입니까?",
        a: "수수료는 성공한 거래에만 부과됩니다. 카드 결제 채널의 정확한 요율은 연결을 활성화할 때 계약 조건에 표시됩니다.",
      },
      { q: "대금은 언제 계좌에 입금됩니까?", a: SETTLEMENT_ANSWER },
    ],
    related: [
      { label: "기능", href: "/features" },
      {
        label: "결제 사업자 활성화(영문 문서)",
        href: `${DOCS_URL}/en/docs/guides/going-live`,
      },
      { label: "시작 가이드", href: "/guide" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/qr-payments",
    label: "QR 결제 도입하기",
    badge: "QR 결제",
    line1: "QR 결제는",
    line2: "어떻게 도입합니까?",
    answer:
      "Wire 결제 페이지는 결제마다 QR 코드와 은행 앱 딥링크를 생성합니다. 컴퓨터에서는 구매자가 휴대폰으로 QR 코드를 스캔하고, 휴대폰에서는 은행 앱을 바로 열어 결제합니다. 하나의 연결로 몽골 결제 사업자들의 QR 결제를 받을 수 있습니다.",
    stepsTitle: "QR 결제 받는 방법",
    steps: [
      ...ACCOUNT_STEPS,
      {
        title: "제공 방식 선택하기",
        body: "가장 쉬운 방법은 바로 쓸 수 있는 결제 링크입니다. QR 코드를 인쇄하거나 보내면 됩니다. 웹사이트나 앱이 있다면 API로 결제를 생성하고 구매자를 Wire 결제 페이지로 안내합니다.",
      },
      {
        title: "구매자가 스캔하여 결제",
        body: "구매자는 은행 앱이나 전자지갑 앱으로 QR 코드를 스캔합니다. 휴대폰에서는 딥링크가 앱을 바로 엽니다.",
      },
      {
        title: "입금 확인하기",
        body: "거래는 대시보드에 실시간으로 표시되며, 이메일과 Webhook으로 알림을 받습니다.",
      },
    ],
    faqs: [
      {
        q: "어떤 앱으로 QR 코드를 스캔할 수 있습니까?",
        a: "활성화한 결제 사업자가 지원하는 은행 앱과 전자지갑 앱입니다.",
      },
      {
        q: "인쇄한 QR 코드를 계산대에 둘 수 있습니까?",
        a: "예. 결제 링크의 QR 코드를 인쇄할 수 있습니다. 금액이 열린 링크라면 구매자가 금액을 입력합니다.",
      },
      {
        q: "온라인 주문의 QR 코드는 얼마 동안 유효합니까?",
        a: "API로 생성한 결제는 기본적으로 10분 동안 유효합니다. 결제되지 않으면 자동으로 취소됩니다.",
      },
      {
        q: "모바일 앱 안에서도 사용할 수 있습니까?",
        a: "예. 서버에서 REST API로 결제를 생성하십시오. JavaScript와 iOS용 checkout SDK가 제공됩니다.",
      },
      { q: "수수료는 얼마입니까?", a: FEE_ANSWER },
    ],
    related: [
      { label: "결제 링크", href: "/links" },
      {
        label: "결제 페이지(영문 문서)",
        href: `${DOCS_URL}/en/docs/guides/hosted-checkout`,
      },
      { label: "개발자용", href: "/developers" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/payment-gateway",
    label: "결제 게이트웨이란",
    badge: "개념 설명",
    line1: "결제 게이트웨이란",
    line2: "무엇입니까?",
    answer:
      "결제 게이트웨이는 귀사의 사업과 결제 사업자들을 연결하는 계층입니다. 결제 사업자마다 별도의 기술 연동을 구축하는 대신 Wire와 한 번만 연결하면, 하나의 API와 하나의 대시보드로 은행 앱, 전자지갑, QR, 카드, 분할 결제를 받을 수 있습니다.",
    stepsTitle: "결제가 처리되는 과정",
    steps: [
      {
        title: "결제를 생성합니다",
        body: "결제 링크로, 또는 API로 금액을 몽골 투그릭(MNT) 정수로 지정하여 결제를 생성합니다.",
      },
      {
        title: "구매자가 채널을 선택합니다",
        body: "Wire 결제 페이지는 프로젝트에서 켠 모든 채널을 한곳에 보여 줍니다.",
      },
      {
        title: "결제 사업자가 결제를 처리합니다",
        body: "선택된 결제 사업자가 결제를 처리하고, 정산금은 연결한 계좌로 입금됩니다.",
      },
      {
        title: "Wire가 상태를 확인합니다",
        body: "결제 사업자의 알림, 능동 조회, 일일 대사의 3중 확인으로 결제가 누락되지 않도록 합니다. 결과는 대시보드, 이메일, Webhook으로 전달됩니다.",
      },
    ],
    points: {
      title: "결제 사업자마다 따로 연동하는 방식과 비교하면",
      items: [
        "하나의 API, 하나의 SDK — 결제 사업자마다 다른 연동 방식을 익힐 필요가 없습니다",
        "하나의 대시보드 — 모든 채널의 거래와 보고서를 한곳에서",
        "하나의 Webhook — 모든 채널의 알림을 하나의 형식으로, 서명과 함께",
        "채널 추가에 코드 변경 불필요 — 대시보드에서 켜기만 하면 됩니다",
      ],
    },
    faqs: [
      {
        q: "Wire로 어떤 결제를 받을 수 있습니까?",
        a: "QR 코드와 은행 앱(QPay), 카드(PayLink), 전자지갑(Toki, MonPay), 분할 결제(StorePay, Pocket Zero)입니다. 즉 연결한 몽골 결제 사업자들의 채널입니다.",
      },
      {
        q: "결제 사업자마다 계약해야 합니까?",
        a: "QPay와 PayLink는 대시보드 안에서 DAN(몽골 정부 전자 신원 인증)으로 계약에 전자 서명합니다. Toki, MonPay, StorePay, Pocket Zero는 결제 사업자와 직접 맺은 계약을 사용합니다. 어느 경우든 기술 연결은 Wire 하나뿐입니다.",
      },
      {
        q: "Wire는 누가 운영합니까?",
        a: "Buildry AI LLC입니다.",
      },
      {
        q: "제 정보는 안전합니까?",
        a: "개인정보는 AES-256으로 암호화되어 저장되며 제3자에게 제공되지 않습니다. 모든 Webhook은 서명되어 있어 각 알림을 검증할 수 있습니다.",
      },
      { q: "수수료는 얼마입니까?", a: FEE_ANSWER },
    ],
    related: [
      { label: "기능", href: "/features" },
      { label: "개발자용", href: "/developers" },
      { label: "인증", href: "/verification" },
    ],
    cta: SIGNUP,
  },
  {
    slug: "/guides/platform",
    label: "플랫폼의 여러 가맹점 결제",
    badge: "플랫폼 모듈",
    line1: "하나의 API로 여러 가맹점의",
    line2: "결제를 어떻게 받습니까?",
    answer:
      "여러 매장이나 사업자에게 서비스를 제공하는 플랫폼(마켓플레이스, SaaS)은 Wire 플랫폼 모듈로 가맹점을 API로 등록하고 가맹점을 대신하여 결제를 생성합니다. 각 가맹점은 결제 대금을 자체 계좌로 직접 받으며, 자금은 플랫폼에도 Wire에도 쌓이지 않습니다.",
    stepsTitle: "플랫폼 연결 방법",
    steps: [
      {
        title: "플랫폼 키 받기",
        body: "Wire에 문의하여 플랫폼을 등록합니다. Wire가 플랫폼 비밀 키를 발급하며, 이 키는 한 번만 표시됩니다.",
      },
      {
        title: "API로 가맹점 등록하기",
        body: "각 가맹점의 등록 정보(개인 또는 법인)를 API로 전송합니다. 항목은 대시보드 등록과 같습니다.",
      },
      {
        title: "Wire의 심사와 승인",
        body: "모든 신청은 Wire의 심사를 거칩니다. 승인된 가맹점은 자체 계좌로 결제를 받을 수 있습니다. 상태는 API로 확인합니다.",
      },
      {
        title: "가맹점을 대신하여 결제 생성하기",
        body: "키 하나로 모든 가맹점의 결제를 생성하고, 결과를 서명된 Webhook으로 받습니다.",
      },
    ],
    faqs: [
      {
        q: "대금은 어디로 입금됩니까?",
        a: "각 가맹점이 연결한 자체 계좌로 직접 입금됩니다. 플랫폼도 Wire도 가맹점의 자금을 보관하지 않습니다.",
      },
      {
        q: "결제를 분할하여 플랫폼 수수료를 공제할 수 있습니까?",
        a: "불가능합니다. 결제 분할과 수수료 공제는 지원하지 않습니다. 플랫폼의 조건은 Wire와 별도로 협의합니다.",
      },
      {
        q: "가맹점이 이미 Wire에 등록되어 있다면 어떻게 됩니까?",
        a: "Wire가 기존 등록과 병합할 수 있으며, 이 경우 받으신 가맹점 id는 계속 유효합니다.",
      },
      {
        q: "모든 가맹점이 인증을 거칩니까?",
        a: "가맹점의 등록 정보를 API로 보내면 Wire가 심사하여 승인합니다.",
      },
      {
        q: "어떻게 시작합니까?",
        a: `플랫폼에 관해 ${CONTACT.email}로 문의해 주십시오.`,
      },
    ],
    related: [
      { label: "개발자용", href: "/developers" },
      { label: "결제 게이트웨이란", href: "/guides/payment-gateway" },
    ],
    cta: { label: "문의하기", href: `mailto:${CONTACT.email}` },
  },
  {
    slug: "/payments-in-mongolia",
    label: "몽골에서 결제 받기",
    badge: "가이드",
    line1: "몽골에서 온라인 결제를",
    line2: "받는 방법",
    answer:
      "Wire는 몽골을 위한 결제 게이트웨이입니다. 몽골의 사업자나 개인 판매자는 app.wire.mn에 가입하여 계정 소유자의 이메일, 휴대폰, DAN(몽골 정부 전자 신원 인증)을 한 번 인증하고, 원하는 결제 사업자를 활성화합니다. 이후 결제 페이지, 결제 링크 또는 REST API로 결제를 받습니다. 구매자는 은행 앱, 전자지갑, QR, 카드, 후불 결제로 결제하며, 대금은 사업자의 자체 계좌로 입금됩니다.",
    stepsTitle: "가입부터 첫 결제까지",
    steps: [
      {
        title: "가입하고 한 번 인증하기",
        body: "app.wire.mn에 로그인하여 계정 소유자의 이메일, 휴대폰, DAN을 인증합니다. 인증은 한 번만 하면 되며, 이후 사업자나 프로젝트를 몇 개 개설하더라도 다시 요청하지 않습니다.",
      },
      {
        title: "결제 사업자 활성화하기",
        body: "QPay 또는 PayLink는 대시보드에서 사업자 정보와 정산 계좌를 제출합니다. 심사 후 계약에 전자 서명하면 연결이 활성화됩니다. Toki, MonPay, StorePay, Pocket Zero는 결제 사업자와 직접 맺은 계약의 키를 입력합니다.",
      },
      {
        title: "프로젝트와 API 키 만들기",
        body: "프로젝트마다 고유한 sk_live 비밀 키와 하나의 Webhook 엔드포인트가 있습니다. 키는 한 번만 표시되므로 비밀번호 관리자에 보관하십시오.",
      },
      {
        title: "구매자를 결제 페이지로 보내기",
        body: "서버에서 PaymentIntent를 생성하고 checkout session을 연 뒤, 구매자를 pay.wire.mn의 결제 페이지로 리디렉션합니다. 이 페이지에는 QR 코드, 은행 앱 딥링크, 켜 둔 모든 채널이 표시됩니다.",
      },
      {
        title: "Webhook으로 확인하기",
        body: "서버는 HMAC-SHA256으로 서명된 payment_intent.succeeded를 받습니다. 서명을 검증한 뒤 주문을 처리하십시오.",
      },
    ],
    faqs: [
      {
        q: "구매자는 어떤 결제 수단을 사용할 수 있습니까?",
        a: "QR과 은행 앱(QPay), 카드 — Visa, Mastercard, 국내 카드(PayLink), 전자지갑(Toki, MonPay), 후불 결제(StorePay, Pocket Zero)입니다. QPay와 PayLink는 Wire를 통해 연결되며, 나머지는 결제 사업자와 직접 맺은 계약과 키를 대시보드에 입력하여 연결합니다.",
      },
      {
        q: "금액은 어떤 통화로 표시됩니까?",
        a: "몽골 투그릭(MNT)이며 정수로 표시됩니다. MNT에는 보조 단위가 없습니다.",
      },
      {
        q: "어떤 언어의 SDK가 있습니까?",
        a: "서버용 Go, Python, Node.js, PHP, Ruby, .NET과 JavaScript, iOS용 checkout SDK가 있습니다. API는 OpenAPI 3.1 사양으로 기술되어 있습니다.",
      },
      {
        q: "비용은 얼마입니까?",
        a: "가입, 계좌 연결, 대시보드는 무료이며 월 이용료도 없습니다. 수수료는 성공한 거래에만 부과되며 결제 채널에 따라 1%부터 시작합니다. 정확한 요율은 활성화할 때 표시됩니다.",
      },
      {
        q: "웹사이트 없이도 결제를 받을 수 있습니까?",
        a: "예. 대시보드에서 결제 링크를 만들어 메신저, SNS 게시물, 이메일로 공유하거나 QR 코드를 인쇄하면 됩니다.",
      },
      {
        q: "Wire는 누가 운영합니까?",
        a: "Buildry AI LLC입니다.",
      },
    ],
    related: [
      { label: "Wire 홈", href: "/" },
      { label: "개발자 문서(영문)", href: `${DOCS_URL}/en/docs` },
      {
        label: "빠른 시작(영문 문서)",
        href: `${DOCS_URL}/en/docs/quickstart`,
      },
    ],
    cta: { label: "시작하기", href: DASHBOARD_URL },
  },
];
