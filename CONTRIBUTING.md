## Contributor guidelines

### 📚 What do I need to know to help?

If you are looking to help to with a code contribution our project uses *Lit, Typescript, SCSS*. If you don't feel ready to make a code contribution yet, no problem! You can also check out the [issues](https://github.com/khmyznikov/pwa-install/issues).

If you are interested in making a code contribution and would like to learn more about the technologies that we use, check out the list below.

- https://lit.dev/docs
- https://web.dev/web-components
- https://www.typescriptlang.org/docs
- https://sass-lang.com/documentation

<br>

###  🌐 How to contribute translation?
Adding new languages in Lit framework are relatively easy. You need to make a few simple steps and do translation.

1. Define proper [locale code](https://lit.dev/docs/localization/overview/#locale-codes) for your language.
2. Find `lit-localize.json` config file and add new lang code to **targetLocales**.
3. Execute `npm run localize:extract` to generate **XLF** file for new language.
4. Find new file in `i18n` folder.
5. Do translation inside `<target>` tags below `<source>` tag of each string.
6. Execute `npm run localize:build` to generate new locale files.
7. Find `/src/localization/index.ts` and import new locale like the rest of the languages.
8. Execute `npm run build` to update bundle and prepare changes for pull request.

<br>

### 👩‍💻 How to make a contribution?

Never made an open source contribution before? Wondering how contributions work in our project? Here's a quick rundown!

1. Find an issue that you are interested in addressing or a feature that you would like to add.
2. Fork the repository associated with the issue to your local GitHub Account. This means that you will have a copy of the repository  under **your-GitHub-username/pwa-install**.
3. Clone the repository to your local machine using `git clone https://github.com/github-username/pwa-install.git`.
4. Create a new branch for your fix/feature using `git checkout -b branch-name-here`.
5. Make the appropriate changes for the issue you are trying to address or the feature that you want to add.
6. Use `git add insert-paths-of-changed-files-here` to  add the file contents of the changed files to the "snapshot" git uses to manage the state of the project, also known as the index.
7. Use `git commit -m "Insert a short message of the changes made here"` to store the contents of the index with a descriptive message.
8. Push the changes to the remote repository using `git push origin branch-name-here`.
9. Submit a pull request to the upstream repository.
10. Title the pull request with a short description of the changes made  and the issue or bug number associated with your change. For example,  you can title like so *"Added German (de) language"*.
11. In the description of the pull request, explain the changes that you made, any issues you think exist with the pull request you made, and  any questions you have for the maintainer. It's OK if your pull request  is not perfect (no pull request is), the reviewer will be able to help  you fix any problems and improve it!
12. Wait for the pull request to be reviewed by a maintainer.
13. Make changes to the pull request if the reviewing maintainer recommends them.
14. Celebrate your success after your pull request is merged!

<br>

### 🙋‍♀️ Where can I go for help?

If you need help, you can ask questions on our [Discussions](https://github.com/khmyznikov/pwa-install/discussions/categories/q-a)

### 🌈 What does the Code of Conduct mean for me?

Our Code of Conduct means that you are responsible for treating everyone on the project with respect and courtesy regardless of their identity.
