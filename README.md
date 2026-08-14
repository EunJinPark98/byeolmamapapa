# ✦ 별마마파파 공식 홈페이지

> 결혼 · 육아 · 가족을 위한 웹서비스를 만듭니다.
> https://eunjinpark98.github.io/byeolmamapapa

빌드 도구 없이 동작하는 정적 사이트입니다. `main`에 push하면 GitHub Actions가
1~2분 안에 자동으로 배포합니다.

## 구성

```
index.html      한 페이지 전체 (히어로 · 서비스 · 소개 · 문의)
styles.css      밤하늘 · 금빛 무드 스타일
script.js       별하늘 캔버스, 별똥별, 스크롤 등장 효과
assets/logo.png 로고
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

## 나중에 도메인을 붙일 때

`byeolmamapapa.com` 같은 도메인을 구입한 뒤 아래 순서로 연결합니다.

**1. 저장소 루트에 `CNAME` 파일을 만들고** 도메인만 한 줄 적습니다.

```
byeolmamapapa.com
```

**2. 도메인 구입처(가비아 · Cloudflare 등)에서 DNS 레코드를 추가합니다.**

| 타입 | 이름 | 값 |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `eunjinpark98.github.io` |

**3. Settings → Pages**에서 인증서가 발급되면 `Enforce HTTPS`를 체크합니다.

**4. 주소가 박혀 있는 아래 파일들도 새 도메인으로 바꿉니다.**

- `index.html` — `canonical` · `og:url` · `og:image` · JSON-LD의 `url` / `logo`
- `robots.txt` — `Sitemap:`
- `sitemap.xml` — `<loc>`

## 서비스 링크

| 서비스 | 상태 | 주소 |
|---|---|---|
| 별빛 초대장 | 운영 중 | https://starinvite.vercel.app |

주소가 바뀌면 `index.html`의 해당 카드 `href`만 고치면 됩니다.
