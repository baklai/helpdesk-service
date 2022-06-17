module.exports = function (scope) {
  return (req, res, next) => {
    if (req.user.scope || req.user.isAdmin) {
      if (Array.isArray(req.user.scope) || req.user.isAdmin) {
        const scopes = req.user.scope ? req.user.scope : [];
        if (scopes.includes(scope) || req.user.isAdmin) {
          return next();
        }
      }
    }
    let err = new Error('SCOPE: Access to the resource is denied.');
    err.name = 'ScopedError';
    return next(err);
  };
};
