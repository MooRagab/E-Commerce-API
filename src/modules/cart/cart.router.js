import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Cart Router' })
})

export default router
