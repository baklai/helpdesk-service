process.on('uncaughtException', (err) => {
  consola.error(
    `${new Date().toUTCString()} uncaughtException: ${err.message}`
  );
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  consola.error(
    `${new Date().toUTCString()} unhandledRejection: ${reason.message}`
  );
});

const handleValidationError = (err) => {
  let message;
  const key = Object.keys(err.errors);
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    message = err.errors[key[0]].properties.message;
  }
  return message;
};

const apiError = (err, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Oops! The token is invalid.' });
  } else if (err.name === 'ScopedError') {
    res
      .status(401)
      .json({ message: 'Oops! Access to the resource is denied.' });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ message: handleValidationError(err) });
  } else if (err.name === 'MongoServerError') {
    console.error(err);
    res.status(400).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Oops! Internal server error.' });
  }
};

module.exports = { apiError };
