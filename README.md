# Сайт-портфолио программиста

Готовый статический сайт-портфолио на HTML, CSS и JavaScript.

## Как запустить

Открой файл `index.html` в браузере.

## Где менять проекты и ссылки

Открой файл:

`data/projects.js`

В каждом проекте можно менять:

- `title` — название проекта
- `description` — описание проекта
- `link` — ссылка на проект
- `image` — путь к скриншоту проекта
- `tags` — технологии или категории

Пример:

```js
{
  title: "Мой проект",
  description: "Описание проекта.",
  link: "https://example.com",
  image: "assets/projects/project.jpg",
  tags: ["Python", "JavaScript"]
}
```

Скриншоты проектов загружай в папку:

`assets/projects`

## Где добавлять свои фото

Загружай фото в папку:

`assets/photos`

Потом открой файл:

`data/photos.js`

И добавь путь к фото:

```js
{ src: "assets/photos/my-photo.jpg", alt: "Моё фото" }
```

## Где изменить контакты

Контакты меняются в файле:

`index.html`

Найди блок:

```html
<section id="contacts">
```

И замени:

- `yourmail@example.com`
- `https://t.me/your_username`
- `https://github.com/your_username`

на свои данные.

## Важно про фото

Обычный сайт без сервера не может автоматически читать все файлы из папки.
Поэтому после загрузки фото нужно прописать его путь в `data/photos.js`.
