#!/usr/bin/env node
// Submit every URL in the live wire.mn and docs.wire.mn sitemaps to IndexNow
// (Bing — which ChatGPT search and Copilot read from — Yandex, Seznam, …).
//
//   node scripts/indexnow.mjs              # both sites
//   node scripts/indexnow.mjs --dry-run    # list the URLs, send nothing
//
// Run after a deploy of `landing` or `docs` that changed public content. The
// key is public by design: the engine verifies ownership by fetching
// https://<host>/<key>.txt, served from apps/{landing,docs}/public/. To rotate,
// add a new key file to both apps, deploy, then change KEY here.
// No dependencies — Node 18+ fetch.

const KEY = "9610be02b0dcdb6cffcc9509a4f650fb";
const SITES = ["https://wire.mn", "https://docs.wire.mn"];
const dryRun = process.argv.includes("--dry-run");

let failed = false;
for (const site of SITES) {
  try {
    await submit(site);
  } catch (err) {
    failed = true;
    console.error(`${site}: ${err.message}`);
  }
}
process.exit(failed ? 1 : 0);

async function submit(site) {
  const host = new URL(site).host;
  const keyLocation = `${site}/${KEY}.txt`;

  const keyRes = await fetch(keyLocation);
  const keyBody = (await keyRes.text()).trim();
  if (!keyRes.ok || keyBody !== KEY) {
    throw new Error(
      `key file check failed: GET ${keyLocation} -> ${keyRes.status} (deployed yet?)`,
    );
  }

  const sm = await fetch(`${site}/sitemap.xml`);
  if (!sm.ok) throw new Error(`sitemap fetch failed: ${sm.status}`);
  const xml = await sm.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => new URL(u).host === host);
  if (urlList.length === 0)
    throw new Error("sitemap has no URLs for this host");

  console.log(`IndexNow: ${urlList.length} URL(s) for ${host}`);
  if (dryRun) {
    for (const u of urlList) console.log(`  ${u}`);
    return;
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
  });
  // 200 = accepted, 202 = accepted (key validation pending).
  console.log(`  api.indexnow.org -> HTTP ${res.status}`);
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(await res.text());
  }
}
