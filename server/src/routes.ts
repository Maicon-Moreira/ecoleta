import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import { celebrate, Joi } from 'celebrate'

import PointsController from './controllers/pointsController'
import ItemsController from './controllers/itemsController'

const routes = express.Router()
const upload = multer(multerConfig)

const pointsController = new PointsController()
const itemsController = new ItemsController()

// index, show, create, update, delete

routes.get('/items', itemsController.index)

routes.post('/points',
    upload.single('image'),
    celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    pointsController.create)
routes.get('/points/:id', pointsController.show)
routes.get('/points', pointsController.index)

export default routes