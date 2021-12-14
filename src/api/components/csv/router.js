import { Router } from 'express'
import upload from '../../../network/middlewares/multer'
import { validateCSV } from './controller'
const router = Router()

router.post('/upload', upload.single('file'), validateCSV)

export default router
