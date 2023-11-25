export const asyncHandler = fun => {
  return (req, res, next) => {
    fun(req, res, next).catch(err => {
      next(new Error(err, { cause: 500 }))
    })
  }
}

export const globalErrorHandler = (err, req, res, next) => {
  if (err) {
    if (process.env.MODE === 'DEV') {
      res.status(err['cause'] || 500).json({
        message: err.message,
        stack: err.stack,
      })
    } else {
      res.status(err['cause'] || 500).json({ message: err.message })
    }
  }
}
