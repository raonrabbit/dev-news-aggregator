# Data Requirements

## Tables

### `articles`
- `id` (uuid primary key)
- `title` (text)
- `url` (text unique)
- `source` (text)
- `published_at` (timestamp)
- `created_at` (timestamp default now)

### `bookmarks`
- `id` (uuid primary key)
- `user_id` (uuid references auth.users)
- `article_id` (uuid references articles)
- `created_at` (timestamp)

### `subscriptions`
- `id` (uuid primary key)
- `user_id` (uuid references auth.users)
- `email` (text)
- `enabled` (boolean default true)

## Data Rules
- `articles.url` unique 제약으로 중복 수집을 방지합니다.
- 목록 조회는 페이지네이션을 적용합니다.
- DB 필터/정렬을 우선 사용하고, 앱 레벨 full scan을 금지합니다.
