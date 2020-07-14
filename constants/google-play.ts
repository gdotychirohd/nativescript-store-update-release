export const GooglePlayConstants = {
  PLAY_STORE_PACKAGE_NOT_PUBLISHED_IDENTIFIER: `
    We're sorry, the requested URL was not found on this server.
  `,
  PLAY_STORE_ROOT_WEB: `https://play.google.com/store/apps/details`,
  REGEX: {
    DATE: /Updated<(.|\n)?>(\w*\s\d{1,2},\s\d{4})/gm,
    OS: /Requires\sAndroid<(.|\n)?>(\d{1,3}(.\d{1,3}(.\d{1,3})?)?)/gm,
    VERSION: /Current\sVersion<(.|\n)*?>(\d{1,3}(.\d{1,3}(.\d{1,3})?)?)/gm
  },
}
