export default function ({ $auth, route, error }) {
  if (!$auth.hasScope(route.name)) {
    return error({ statusCode: 403 });
  }
}
