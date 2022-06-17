export default function ({ $vuetify }) {
  if (process.client) {
    const theme = localStorage.getItem('theme.dark') || 'false';
    if (theme) {
      if (theme === 'true') {
        $vuetify.theme.dark = true;
      } else {
        $vuetify.theme.dark = false;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      $vuetify.theme.dark = true;
    }
    localStorage.setItem('theme.dark', $vuetify.theme.dark.toString());
  }
}
