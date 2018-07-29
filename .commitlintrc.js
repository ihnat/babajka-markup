module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        '*',
        'core',
        'common',
        'about',
        'acticle',
        'edit-article',
        'select',
        'modal',
        'main',
        'login',
        'tools',
      ],
    ],
    'scope-empty': [2, 'never'],
    'type-enum': [2, 'always', ['fix', 'style', 'feat', 'chore', 'task', 'major', 'merge']],
  },
};
