# ✦ 별마마파파 공식 홈페이지

> 결혼 · 육아 · 가족을 위한 웹서비스를 만듭니다.
> https://byeolmamapapa.com

빌드 도구 없이 동작하는 정적 사이트입니다. GitHub Pages에 그대로 올라갑니다.

## 구성

```
index.html      한 페이지 전체 (히어로 · 서비스 · 소개 · 문의)
styles.css      밤하늘 · 금빛 무드 스타일
script.js       별하늘 캔버스, 별똥별, 스크롤 등장 효과
assets/logo.png 로고
CNAME           커스텀 도메인 (byeolmamapapa.com)
.nojekyll       Jekyll 처리 건너뛰기
```

## 로컬에서 보기

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 배포 (GitHub Pages)

1. 저장소 **Settings → Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `(root)` → Save
4. **Custom domain**: `byeolmamapapa.com` 입력 → Save
5. `Enforce HTTPS` 체크 (인증서 발급까지 몇 분 걸릴 수 있습니다)

### DNS 설정

도메인 구입처(가비아 · Cloudflare 등)에서 아래 레코드를 추가합니다.

| 타입 | 이름 | 값 |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<GitHub 사용자명>.github.io` |

`main`에 push하면 1~2분 안에 자동으로 반영됩니다.

## 서비스 링크

| 서비스 | 상태 | 주소 |
|---|---|---|
| 별빛 초대장 | 운영 중 | https://starinvite.vercel.app |

주소가 바뀌면 `index.html`의 해당 카드 `href`만 고치면 됩니다.
