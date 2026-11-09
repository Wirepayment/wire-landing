import { describe, expect, it } from "vitest";

import { CONNECTORS } from "@/lib/connectors";
import { brandNames } from "./brand-names";

// Forbidden names are spelled backwards here so the repo never holds them in
// clear. Connector names are public on wire.mn and written as they are.
const back = (s: string) => [...s].reverse().join("");

describe("brandNames()", () => {
  it("finds a whole Latin name in any case", () => {
    expect(brandNames(`Pay with ${back("YAPLAICOS")} today`)).toHaveLength(1);
    expect(brandNames(`like ${back("epirtS")}`)).toHaveLength(1);
  });

  it("finds a two-word name with or without the space", () => {
    expect(brandNames(`via ${back("yenom tsom")}`)).toHaveLength(1);
    expect(brandNames(`via ${back("yenomtsom")}`)).toHaveLength(1);
  });

  it("finds an inflected Cyrillic name", () => {
    expect(brandNames(`${back("тмолог")}ын карт`)).toHaveLength(1);
  });

  it("still finds the card connector's processor, which is not a connector", () => {
    expect(brandNames(`${back("idgeN")} processor`)).toHaveLength(1);
    expect(brandNames(`${back("идгэН")}ийн гэрээ`)).toHaveLength(1);
  });

  it("does not flag ordinary words that merely contain a name", () => {
    expect(brandNames("tokens striped money bank Монголын банк")).toEqual([]);
  });

  it("allows every live connector name (owner decision 2026-11-08)", () => {
    for (const c of CONNECTORS) {
      expect(brandNames(`Pay with ${c.name} today`), c.name).toEqual([]);
      expect(brandNames(c.name.toUpperCase()), c.name).toEqual([]);
    }
  });

  it("finds a Chinese name inside unspaced Chinese text", () => {
    expect(brandNames(`您可以使用${back("宝付支")}付款。`)).toHaveLength(1);
    expect(brandNames(`通过${back("行银汗可")}的账户结算`)).toHaveLength(1);
  });

  it("finds a Korean name with a particle, with or without a space", () => {
    expect(brandNames(`${back("이페오카카")}로 결제합니다`)).toHaveLength(1);
    expect(
      brandNames(`${back("오카카")} ${back("이페")}로 결제합니다`),
    ).toHaveLength(1);
    expect(brandNames(`${back("트롬골")} 은행 계좌`)).toHaveLength(1);
  });

  it("finds a Latin name glued to Chinese or Korean", () => {
    expect(brandNames(`${back("tmoloG")}银行`)).toHaveLength(1);
    expect(brandNames(`${back("knabnahK")}은행 계좌`)).toHaveLength(1);
    expect(brandNames(`使用${back("yapilA")}付款`)).toHaveLength(1);
  });

  it("does not flag ordinary Chinese and Korean payment words", () => {
    expect(
      brandNames(
        "支付链接、二维码、银行卡、电子钱包、先买后付。商户在管理后台查看交易和结算，支付页面由支付网关提供。",
      ),
    ).toEqual([]);
    expect(
      brandNames(
        "결제 링크, QR 코드, 카드 결제, 전자지갑, 후불 결제. 가맹점은 대시보드에서 거래와 정산 계좌를 확인합니다. 결제 페이지 코드",
      ),
    ).toEqual([]);
  });

  it("allows every connector name inside Chinese and Korean copy", () => {
    for (const c of CONNECTORS) {
      expect(brandNames(`使用${c.name}支付`), c.name).toEqual([]);
      expect(brandNames(`${c.name}로 결제합니다`), c.name).toEqual([]);
    }
  });

  it("still catches a forbidden name next to a connector name", () => {
    const text = `${CONNECTORS.map((c) => c.name).join(" ")} ${back("epirts")}`;
    expect(brandNames(text)).toHaveLength(1);
  });
});
