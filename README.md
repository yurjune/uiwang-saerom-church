# 의왕 새롬교회

[의왕 새롬교회 홈페이지](https://uwsch.org)입니다.

## 콘텐츠 제공

콘텐츠는 Headless CMS [Contentful](https://www.contentful.com/)에서 발행하고 관리합니다.

## 페이지 캐시 전략

페이지는 SSG + ISR로 제공되며, 기본 `revalidate` 주기는 `86400초(1일)`입니다.

### Contentful Webhook Revalidate

Contentful webhook은 secret key와 `sys.id`를 전달합니다.
- secret key는 x-revalidate-secret header로 전달합니다.
- `sys.id`가 있으면 `movies/news` 목록과 해당 entry 상세 경로를 갱신합니다.
- `sys.id`가 없으면 `movies/news` 목록만 갱신합니다.

webhook은 다음 entry 액션으로 트리거됩니다.
- Publish
- Unpublish

### Manual Revalidate

revalidate API로 전체 데이터를 수동 갱신할 수 있습니다.

```bash
export REVALIDATE_SECRET='your-secret'

curl -X POST "https://www.uwsch.org/api/revalidate" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET"
```
