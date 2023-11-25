import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Coupon Router' })
})

export default router
