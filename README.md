---
marp: true
theme: qut
---

# Marp for VS Code

[Marp](https://marp.app/#get-started) allows the creation of slides using Markdown, which makes it extremely fast and easy to create slides. It also allows the use of CSS to style the slides.

Each slide is separated by `---`.

Enable Marp in VS Code by installing the [Marp extension](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode).

Assumed knowledge:

- Markdown
- CSS
- VS Code

---

<!-- 
_backgroundImage: url('backgrounds/Title.PNG')
_class: title
 -->

# QUT Marp Template

To make a slide a title, add the below declaration to the top of the slide:

```
<!-- 
_backgroundImage: url('backgrounds/Title.PNG')
_class: title
 -->
```

The `_backgroundImage` is the path to the image, and `_class` is the class of the slide.

The styles are defined in the `./themes/qut.css` file:

- Use `section.title` to select title slides 

---

# Using the QUT Theme

To use the QUT theme, you need the `themes` folder in the root of the project, then configure VS Code Settings `Marp: Themes` to add the following path to the `qut.css` file (relative / url only):

```
./themes/qut.css
```

Additionally, add the following to the top of the `.md` file to use the theme:

```
marp: true
theme: qut
```

---

# Suggested structure

The `themes` folder also contains some background images, so I suggest the following structure for your presentation:
  
```
.
├── themes
│   └── qut.css
├── backgrounds
│   ├── Title.PNG
│   ├── Acknowledgement.PNG
│   └── ... add other images here
├── presentation_1.md
├── presentation_2.md
└── ...
```

This way the `_backgroundImage: url('backgrounds/Title.PNG')` will work, but if you have a different structure, you can change the path accordingly.

---
<!--
footer: '**YOUR_ORGANISATION_HERE**<br>ANOTHER_LINE_IF_NEEDED'
-->

# Footer

The QUT PowerPoint template has a footer showing the unit / organisation name, and the CRICOS code.

To enable this in Marp, add the below declaration to the top of the slide:

```
<!--
footer: '**YOUR_ORGANISATION_HERE**<br>ANOTHER_LINE_IF_NEEDED'
-->
```

The `'**YOUR_ORGANISATION_HERE**<br>ANOTHER_LINE_IF_NEEDED'` is the footer text, written in Markdown.

---

# Automatic Deployment - Create `gh-pages` branch

To automatically deploy the slides to GitHub Pages, find the `.github/workflows/deploy-marp.yml` file in this repository and update the `file: [ Template ]` under the `build` job to the names of your `.md` files (without the extension).

For example, let's say your `.md` files are called `presentation_1.md` and `presentation_2.md`, then the `build` job would look like this:

```yml
  build:
    needs: [prepare]
    strategy:
      matrix:
        file: [ presentation_1, presentation_2 ]
    ...
```

---

# Automatic Deployment - GitHub Pages

To enable GitHub Pages, go to the repository settings, and under the `Pages` section, select the `gh-pages` branch and the `root` folder.

You will also need to allow GitHub Actions to read and write to the repository in the `Settings` > `Workflow permissions` section.