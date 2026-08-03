function validate(schema) {
  return (req, res, next) => {
    console.log('req.body:', req.body);
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.issues,
      });
    }
    if (result.data.body !== undefined) req.body = result.data.body;
    if (result.data.params !== undefined) req.params = result.data.params;
    if (result.data.query !== undefined) req.query = result.data.query;
    next();
  };
}

module.exports = validate;