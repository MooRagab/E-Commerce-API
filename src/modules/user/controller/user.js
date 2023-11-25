export const profile = (req, res) => {
  res.status(200).json({
    message: 'Hello In Your Profile',
    id: req.user,
  })
}
