export default ({ $auth, store }) => {
  if ($auth.user?.isAdmin) {
    $auth.setUser({
      ...$auth.user,
      scope: store.getters['scope/scopes'].map((v) => v.scope)
    });
  }
};
