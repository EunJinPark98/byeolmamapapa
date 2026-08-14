# ✦ 별마마파파 공식 홈페이지

> 결혼 · 육아 · 가족을 위한 웹서비스를 만듭니다.
> https://byeolmamapapa.com

빌드 도구 없이 동작하는 정적 사이트입니다. `main`에 push하면 GitHub Actions가
1~2분 안에 자동으로 배포합니다.

## 구성

```
index.html      한 페이지 전체 (히어로 · 서비스 · 소개 · 문의)
styles.css      밤하늘 · 금빛 무드 스타일
script.js       별하늘 캔버스, 별똥별, 스크롤 등장 효과
assets/logo.png 로고
CNAME           커스텀 도메인 (byeolmamapapa.com)
.nojekyll       Jekyll 처리 건너뛰기
.github/workflows/deploy-pages.yml   Pages 자동 배포
```

## 로컬에서 보기

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 배포

저장소 **Settings → Pages → Source**가 `GitHub Actions`로 되어 있으면 끝입니다.
이후 `main`에 push할 때마다 워크플로가 알아서 배포합니다.

## 커스텀 도메인 (byeolmamapapa.com)

저장소 루트의 `CNAME` 파일이 도메인을 지정합니다. Actions로 배포하므로 이 파일이
없으면 배포할 때마다 도메인 설정이 풀릴 수 있으니 지우지 마세요.

**도메인 구입처(가비아 · Cloudflare 등)의 DNS 레코드**

| 타입 | 이름 | 값 |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `eunjinpark98.github.io` |

IPv6도 함께 쓰려면 AAAA 레코드를 추가합니다.

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**Settings → Pages**의 `Custom domain`에 `byeolmamapapa.com`을 넣고,
인증서가 발급되면 `Enforce HTTPS`를 체크합니다.

> DNS가 아직 GitHub을 가리키지 않는 상태에서 `CNAME`만 올리면 Pages가
> `github.io` 주소를 도메인 쪽으로 넘겨 버려 사이트가 안 열립니다.
> DNS 레코드를 먼저 넣고 전파를 기다리세요.

주소가 박혀 있는 파일: `index.html`(`canonical` · `og:url` · `og:image` ·
`twitter:image` · JSON-LD의 `url`/`logo`), `robots.txt`, `sitemap.xml`

## 서비스 링크

| 서비스 | 상태 | 주소 |
|---|---|---|
| 별빛 초대장 | 운영 중 | https://starinvite.vercel.app |

주소가 바뀌면 `index.html`의 해당 카드 `href`만 고치면 됩니다.
