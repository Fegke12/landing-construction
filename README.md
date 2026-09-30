<div align="center">

# 🏗 BuildPro — сайт строительной компании

**Корпоративный многостраничный сайт компании, которая строит дома и коммерческие объекты под ключ.**
Сделан по техническому заданию: услуги, этапы работы, портфолио объектов, отзывы и форма расчёта стоимости.

[![Открыть сайт](https://img.shields.io/badge/▶_Открыть_сайт-FF6B00?style=for-the-badge)](https://fegke12.github.io/landing-construction/)
[![Проекты](https://img.shields.io/badge/Страница_проектов-1a1a1a?style=for-the-badge)](https://fegke12.github.io/landing-construction/projects.html)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![Без фреймворков](https://img.shields.io/badge/фреймворки-не_нужны-555)

<br>

<img src="docs/screenshots/hero.jpg" alt="Первый экран сайта BuildPro" width="100%">

</div>

---

## Задача

По ТЗ сайт должен вызывать доверие у человека, который выбирает подрядчика на дорогую стройку, и вести его по пути **Главная → Услуги → Проекты → Заявка**. Исходное задание лежит в `uploads/`.

## Что сделано

- **Главная:** первый экран с предложением и двумя действиями, блок цифр (опыт, объекты, гарантия, сроки).
- **Услуги полного цикла** — шесть направлений от проектирования до отделки.
- **Шесть этапов работы** — от заявки до сдачи объекта, с ориентировочными сроками.
- **Реализованные проекты** — карточки с типом объекта, площадью, сроком и городом, плюс отдельная страница `projects.html` с фильтрами по типу объекта.
- **О команде** и **отзывы** в слайдере с автопрокруткой.
- **Форма расчёта стоимости** с типом объекта, площадью и проверкой полей перед отправкой.
- Своя **страница 404**, плавная прокрутка, кнопка «наверх», адаптив под телефоны и планшеты.

## Скриншоты

<table>
  <tr>
    <td width="70%"><img src="docs/screenshots/projects.jpg" alt="Реализованные проекты"></td>
    <td align="center"><img src="docs/screenshots/mobile.jpg" alt="Мобильная версия" width="240"></td>
  </tr>
  <tr>
    <td align="center"><sub>Портфолио объектов</sub></td>
    <td align="center"><sub>Мобильная версия</sub></td>
  </tr>
</table>

## Структура

```
index.html        главная
projects.html     все проекты
404.html          страница «не найдено»
css/style.css     основные стили
css/responsive.css адаптив
js/main.js        меню, слайдер отзывов, фильтры проектов, проверка формы
```

Сборка не нужна — откройте `index.html` в браузере. Хостинг — GitHub Pages.

---

<div align="center"><sub>Сделано <a href="https://github.com/Fegke12">@Fegke12</a> · BuildPro — компания из технического задания</sub></div>
