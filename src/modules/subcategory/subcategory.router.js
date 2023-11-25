import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'SubCategory Router' })
})

export default router
