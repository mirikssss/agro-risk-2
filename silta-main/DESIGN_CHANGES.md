# AgroRisk — изменения дизайна и копирайта

## Что сделано

Лендинг полностью переработан под продукт **AgroRisk** (спутниковый AI risk engine для банков и страховых). Сохранена структура секций по меню: Problem, Solution & Impact, Team, Business Model, Why Us, How It Works, Demo.

---

## Визуальный стиль

- **Фон**: тёмный (near-black `#0a0e17`, deep navy `#0f172a`) с мягкими градиентами, без фиолетовых «game»-градиентов.
- **Мотивы**: орбитальная линия в Hero, тонкая сетка (grid), «satellite scan» (движущаяся линия), полупрозрачные карточки (glassmorphism: `bg-surface-card`, `backdrop-blur`).
- **Акценты**: 
  - satellite green (`#22c55e`) — агро, CTA, успех;
  - cyan/teal (`#06b6d4`) — данные/AI, иконки, ссылки;
  - amber/red — риск, алерты, проблема.
- **Шрифт**: Inter (Google Fonts), жирные заголовки, крупные цифры.
- **Анимации**: лёгкий fade-in, hover на карточках, scan-линия в Hero; учтён `prefers-reduced-motion`.
- **Адаптив**: mobile-first, navbar с бургер-меню на мобильных.

---

## Структура страницы

- Якоря секций: `#problem`, `#solution`, `#team`, `#business`, `#whyus`, `#how`, `#demo`.
- **Navbar**: sticky, слева логотип + «AgroRisk», справа пункты меню + CTA «Request a Pilot»; при скролле уменьшается (shrink) и получает фон `bg-surface-dark/90 backdrop-blur-lg`.

---

## Контент по секциям

1. **Hero**: бейдж «Early Warning for Agricultural Credit Risk», H1 «Turn satellite signals into credit decisions.», подзаголовок, 3 метрики (Weeks earlier, Explainable signals, API-ready), CTA «Book a Demo» / «See How It Works». Справа — абстрактный «satellite map» overlay.
2. **Problem**: 3 карточки (Late Risk Detection, Blind Underwriting, Portfolio Volatility), callout «$300M+ estimated losses in Uzbekistan (2024)» с подписью «source to be added».
3. **Solution & Impact**: текст про early vegetation-based risk scores, 4 impact bullets, блок «What we deliver» (Risk Score, Trend, Alerts).
4. **Team**: 2–4 карточки (роль + «what they own»), бейдж «NASA Space Apps Challenge winners», акцент на research-driven и reliability.
5. **Business Model**: 3 тарифа (Pilot, Institution, API Integration) с «Best for», «Includes», CTA.
6. **Why Us**: 4 блока (Satellite-first, Decision-ready outputs, Explainable signals, API-ready), 2 цитаты в QuoteBlock.
7. **How It Works**: stepper из 4 шагов (Field Identification → Multi-Modal Monitoring → AI Risk Analysis → Actionable Output), блок Tech Stack (Earth Observation, Data/AI, Platform).
8. **Demo**: mock-панель — слева селекты (country, region, crop, year), справа «Risk Output» (score, trend, alerts), кнопки «Open Dashboard» / «Request Live Demo».

---

## Реализация

- **Стек**: React, Vite, TypeScript, Tailwind (CDN + config в `index.html`).
- **Контент**: весь текст в `landingContent.ts` для быстрой правки.
- **Компоненты**: `Navbar`, `Hero`, `Section`, `MetricCard`, `StepCard`, `PricingCard`, `QuoteBlock`, `DemoPanel`, `Footer`.
- **Роутинг**: главная страница — `Landing.tsx`, `/demo` — отдельная страница с тем же стилем и DemoPanel.
- **Футер**: краткий теглайн, ссылки на секции, email-placeholder, «© AgroRisk».

---

## Как посмотреть

```bash
npm install
npm run dev
```

Откройте http://localhost:5173. Для PR: инициализируйте репозиторий (`git init`), добавьте файлы, закоммитьте и создайте PR; скриншоты можно сделать с главной страницы и страницы `/demo`.
