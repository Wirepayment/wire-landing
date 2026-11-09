# Glossary — wire.mn (mn / en / zh / ko)

Every translation in `messages/<locale>.json` and `content/<locale>/*.ts` uses
these terms. Mongolian is the source. The English column matches the
dashboard's `wire-dashboard/messages/glossary.md`, so a merchant reads the same
word on wire.mn and in app.wire.mn.

## Rules

- **Brand names stay in Latin script and are never translated or
  transliterated:** Wire, QPay, PayLink, StorePay, Toki, MonPay, Pocket Zero.
  No other payment brand is named in any language (rule #9) — no foreign
  wallet, no bank, no operator that is not one of the six connectors.
  `test/brand-names.ts` checks Latin, Cyrillic, Chinese and Korean.
- **Language names** in the picker are never translated: Монгол, English,
  中文, 한국어. "Монгол" is the only Cyrillic allowed in en/zh/ko copy.
- **Style.** English: plain, direct business English, sentence case.
  Chinese: Simplified (简体), formal business register, address the reader as
  您. Korean: formal 합니다 style throughout.
- **Headings split in two (`line1` + `line2`)** form one sentence shown on two
  lines. Translate the whole sentence first, then split it at a natural break;
  both halves are non-empty and read in order (`line1` then `line2`).
- **Facts never exceed the Mongolian copy:** no new claims, no numbers that
  are not in mn.
- **Dates** stay `YYYY-MM-DD HH:MM:SS` (Asia/Ulaanbaatar) and **money** stays
  whole MNT with `₮` in every locale.
- **ICU arguments and rich-text tags** (`{name}`, `<hl>…</hl>`, `<b>`, `<ui>`,
  `<link>`, `<code>`) are kept exactly; only the text around them changes.
- **No guillemets or dagger** in any language; Chinese quotes `“ ”` are fine.
- **Legal pages** start with the notice in the page's language (Mongolian
  prevails):
  - en: This is a translation. The Mongolian version is legally binding.
  - zh: 本页为译文，以蒙古语版本为准。
  - ko: 본 문서는 번역본이며, 몽골어 원문이 법적 효력을 가집니다.

## Terms

| Term | mn | en | zh | ko | Note |
|---|---|---|---|---|---|
| connector | Суваг / connector | Payment channel / channel | 支付渠道 / 渠道 | 결제 채널 / 채널 | One of the six live connectors. Code and the API say connector; on screen say channel. |
| operator | Төлбөрийн оператор / оператор | Payment operator | 支付运营商 | 결제 사업자 | The provider behind a channel. |
| payment gateway | Төлбөрийн gateway / гарц | Payment gateway | 支付网关 | 결제 게이트웨이 | What Wire is. |
| merchant | Мерчант / бизнес | Merchant | 商户 | 가맹점 | The registered business that receives the money. |
| business | Бизнес | Business | 企业 | 사업자 | The merchant as the owner sees it. |
| settlement | Орлого хүлээн авах / тооцоо | Settlement | 结算 | 정산 | Money landing in the merchant's own account; Wire never holds it. |
| settlement account | Орлого хүлээн авах данс | Settlement account | 收款账户 | 정산 계좌 | |
| bank account | Банкны данс / данс | Bank account | 银行账户 | 은행 계좌 | |
| webhook | Webhook | Webhook | Webhook | Webhook | Kept in Latin in every language. |
| project | Project | Project | 项目 | 프로젝트 | One integration: its own API keys and one webhook. Latin on Mongolian screens. |
| payment link | Төлбөрийн линк | Payment link | 支付链接 | 결제 링크 | |
| payment page | Төлбөрийн хуудас | Payment page / hosted checkout | 支付页面 | 결제 페이지 | The hosted page on pay.wire.mn. |
| dashboard | Dashboard / хяналтын самбар | Dashboard | 管理后台 | 대시보드 | app.wire.mn. |
| KYC | Баталгаажуулалт (KYC) / бизнесийн мэдээлэл | KYC / business verification | KYC（企业信息核验） | KYC(사업자 정보 확인) | |
| verification | Баталгаажуулалт | Verification | 身份验证 | 인증 | Phone and DAN proofs of the owner. |
| ДАН | ДАН | DAN (state e-ID) | DAN（蒙古国政府电子身份认证） | DAN(몽골 정부 전자 신원 인증) | Spell out on first use per page, then "DAN". |
| agreement | Гэрээ | Agreement | 协议 | 계약 | Signed electronically; the Mongolian text is binding. |
| API key | API түлхүүр / API key | API key | API 密钥 | API 키 | `sk_live_…` stays as is. |
| refund | Буцаалт | Refund | 退款 | 환불 | |
| QR | QR / QR код | QR / QR code | 二维码 | QR 코드 | |
| bank app | Банкны апп | Bank app | 银行 App | 은행 앱 | |
| card payment | Картын төлбөр | Card payment | 银行卡支付 | 카드 결제 | Visa and Mastercard are card schemes and may be named. |
| e-wallet | Цахим хэтэвч | E-wallet | 电子钱包 | 전자지갑 | |
| installments | Хуваан төлөх | Buy now, pay later / installments | 先买后付 / 分期付款 | 후불 결제 / 분할 결제 | |
| transaction | Гүйлгээ | Transaction | 交易 | 거래 | |
| fee | Шимтгэл | Fee | 手续费 | 수수료 | Charged only on successful transactions. |
| sign up | Бүртгүүлэх | Sign up | 注册 | 가입 | |
| sandbox | Sandbox | Sandbox | 沙盒 | 샌드박스 | Not used in public copy: production has no test mode (rule #19). |
