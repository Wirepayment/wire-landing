import type { BlogPostCopy, BlogSlug } from "@/lib/blog";

// Korean blog posts, mirroring content/mn/blog.ts section for section.
export const POSTS: Record<BlogSlug, BlogPostCopy> = {
  "change-payment-method": {
    title: "이제 결제자가 결제 채널을 바꿀 수 있습니다",
    description:
      "Wire 결제 페이지가 채널별 단계 안내를 보여 주고, 청구서가 이미 열린 뒤에도 결제자가 다른 채널로 결제할 수 있게 되었습니다.",
    lead: "Wire 결제 페이지에서 구매자가 한 채널을 골랐지만 결제를 마치지 못하면 이제 돌아가서 다른 채널을 고를 수 있습니다. 가맹점은 연동을 바꿀 필요가 없습니다.",
    sections: [
      {
        heading: "무엇이 바뀌었나",
        body: [
          "결제 페이지는 채널을 세 그룹으로 보여 줍니다: 은행 앱과 카드, 전자지갑, 할부. 채널을 고르면 그 채널에 맞게 쓴 번호 단계와 해당 앱을 여는 버튼이 나타납니다.",
          "결제 화면에 다른 채널로 결제하는 버튼이 새로 생겼습니다. 누르면 채널 선택으로 돌아가고, 다른 채널을 고르면 새 청구서가 열립니다.",
        ],
      },
      {
        heading: "왜 필요한가",
        body: [
          "구매자의 은행 앱이 열리지 않거나, 지갑 잔액이 부족하거나, 할부 한도가 승인되지 않을 수 있습니다. 지금까지는 이런 경우 결제 페이지를 닫고 주문을 다시 시작해야 했습니다. 이제는 같은 페이지에서 다른 채널로 계속할 수 있습니다.",
        ],
      },
      {
        heading: "가맹점에 달라지는 점",
        body: [
          "연동에는 아무 변화가 없습니다. 결제 링크나 Wire 결제 페이지를 쓰는 모든 가맹점에 바로 적용됩니다.",
        ],
        items: [
          "결제 성공 시 보내는 webhook과 결제 상태는 그대로입니다.",
          "대시보드의 거래 목록은 돈이 실제로 들어온 채널을 보여 줍니다.",
          "한 주문의 청구서 두 건이 모두 결제되면 Wire가 이를 감지해 기록하므로 초과 결제분을 환불할 수 있습니다.",
        ],
      },
    ],
    links: [
      { label: "결제 링크", href: "/links" },
      { label: "기능", href: "/features" },
    ],
  },
  "six-channels-one-integration": {
    title: "한 번의 연동으로 여섯 개 결제 채널",
    description:
      "QPay, PayLink, Toki, MonPay, StorePay, Pocket Zero: 어떤 채널이 Wire를 통해 개설되고 어떤 채널이 자체 계약으로 연결되는지, 돈은 어디로 들어가는지 설명합니다.",
    lead: "Wire에서 이제 여섯 개 결제 채널이 운영됩니다: QPay, PayLink, Toki, MonPay, StorePay, Pocket Zero. 가맹점은 한 번 연동한 뒤 대시보드에서 켤 채널을 고릅니다.",
    sections: [
      {
        heading: "여섯 채널, 네 가지 유형",
        body: [
          "구매자는 결제 페이지에서 가맹점이 켠 채널 가운데 자신에게 맞는 것을 고릅니다.",
        ],
        items: [
          "QPay: QR 코드와 은행 앱.",
          "PayLink: Visa, Mastercard 및 국내 카드.",
          "Toki, MonPay: 전자지갑.",
          "StorePay, Pocket Zero: 할부.",
        ],
      },
      {
        heading: "두 가지 연결 방식",
        body: [
          "QPay와 PayLink는 Wire를 통해 개설합니다: 사업자 정보를 보내고 온라인으로 계약을 체결하면 심사 승인 후 채널이 활성화됩니다.",
          "Toki, MonPay, StorePay, Pocket Zero는 결제 사업자와 맺은 자체 계약과 키로 대시보드에서 연결합니다. 돈은 가맹점의 사업자 계정으로 바로 들어가며 Wire는 돈을 보관하지 않습니다.",
        ],
      },
      {
        heading: "채널을 추가해도 코드는 그대로",
        body: [
          "결제 생성 API, webhook, 결제 링크는 모든 채널에서 같습니다. 새 채널을 켜도 연동에 추가할 것이 없고, 매출은 하나의 대시보드에서 채널별로 볼 수 있습니다.",
        ],
      },
    ],
    links: [
      { label: "기능", href: "/features" },
      { label: "시작 가이드", href: "/guide" },
      { label: "Docs", href: "https://docs.wire.mn/en/docs" },
    ],
  },
  "automatic-failover": {
    title: "채널에 장애가 생기면 결제가 다음 채널로 넘어갑니다",
    description:
      "자동 라우팅으로 고른 결제 채널이 응답하지 않으면 Wire가 다음 활성 채널에서 결제를 생성합니다. 언제 전환되고 언제 전환되지 않는지 설명합니다.",
    lead: "Wire가 결제 채널을 자동으로 골랐는데 그 채널에 장애가 생기면 결제가 다음 활성 채널로 스스로 넘어갑니다. 구매자는 오류가 아니라 새 채널의 결제 안내를 보게 됩니다.",
    sections: [
      {
        heading: "작동 방식",
        body: [
          "채널을 지정하지 않고 결제를 확정하면 Wire가 가맹점이 켠 채널 가운데 하나를 고릅니다. 그 채널에 연결할 수 없거나 채널 쪽에서 오류가 나면 Wire는 라우팅 순서의 다음 채널에서 결제를 생성합니다. 이런 전환은 최대 두 번까지 이루어집니다.",
        ],
      },
      {
        heading: "전환되지 않는 경우",
        body: [
          "전환은 채널 장애에만 대비합니다. 다음 경우에는 결제가 다른 채널로 넘어가지 않습니다:",
        ],
        items: [
          "가맹점이 채널을 직접 지정한 경우.",
          "채널이 결제를 거절한 경우. 이것은 장애가 아니라 결정입니다.",
          "구매자의 전화번호를 이미 채널로 보낸 경우. 구매자의 앱에 결제 요청이 이미 도착했을 수 있습니다.",
        ],
      },
      {
        heading: "해야 할 일",
        body: [
          "없습니다. 채널을 두 개 이상 켜고 채널을 지정하지 않는 모든 연동에 적용됩니다. API 응답의 next_action이 항상 구매자에게 보여 줄 안내입니다.",
        ],
      },
    ],
    links: [
      { label: "개발자", href: "/developers" },
      { label: "API 참조", href: "https://docs.wire.mn/en/docs/api" },
    ],
  },
};
