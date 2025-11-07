import express from 'express'
import { CommonController } from 'src/controller/CommonController'

const controllerCommon = new CommonController()

const routerCommon = express.Router()

routerCommon.post(
  "/createCandidate",
  //#swagger.tags = ['Common']
  //#swagger.description = 'API to create a new candidate record'
  //#swagger.parameters['enquiry_raised_date']= { in:'formData',type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' },
  //#swagger.parameters['enquiry_answered_date']= {in:'formData', type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' }
  //#swagger.parameters['name'] = {in:'formData',type:'string',required:true ,example:"abcd"}
  //#swagger.parameters['phone_number'] = {in:'formData',type:'number',required:true ,example:"123456789"}
  //#swagger.parameters['alternative_phonenumber'] = {in:'formData',type:'number',example:"123456789"}
  //#swagger.parameters['email'] = {in:'formData',type:'string',required:true ,example:"abcd@gmail,\.com"}
  //#swagger.parameters['location'] = {in:'formData',type:'string'}
  //#swagger.parameters['role'] = {in:'formData',type:'string'}
  //#swagger.parameters['experience'] = {in:'formData',type:'number'}
  //#swagger.parameters['months'] = {in:'formData',type:'number'}
  //#swagger.parameters['degree'] = {in:'formData',type:'string'}
  //#swagger.parameters['added_by'] = {in:'formData',type:'string'}
  controllerCommon.createCandidate
);




routerCommon.patch(
  "/editCandidate",
  //#swagger.tags = ['Common']
  //#swagger.description = 'API to Edit a  candidate record'
  //#swagger.parameters['id']= { in:'formData',type: 'number',required:true },
  //#swagger.parameters['enquiry_raised_date']= { in:'formData',type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' },
  //#swagger.parameters['enquiry_answered_date']= {in:'formData', type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' }
  //#swagger.parameters['name'] = {in:'formData',type:'string',required:true ,example:"abcd"}
  //#swagger.parameters['phone_number'] = {in:'formData',type:'number',required:true ,example:"123456789"}
  //#swagger.parameters['alternative_phonenumber'] = {in:'formData',type:'number',example:"123456789"}
  //#swagger.parameters['email'] = {in:'formData',type:'string',required:true ,example:"abcd@gmail,\.com"}
  //#swagger.parameters['location'] = {in:'formData',type:'string'}
  //#swagger.parameters['role'] = {in:'formData',type:'string'}
  //#swagger.parameters['experience'] = {in:'formData',type:'number'}
  //#swagger.parameters['months'] = {in:'formData',type:'number'}
  //#swagger.parameters['degree'] = {in:'formData',type:'string'}
  //#swagger.parameters['added_by'] = {in:'formData',type:'string'}
controllerCommon.editCandidate
);


routerCommon.delete("/deleteCandidate",
  //#swagger.tags = ['Common']
  //#swagger.description = 'API to Edit a  candidate record'
  //#swagger.parameters['id']= { in:'query',type: 'number',required:true },
  controllerCommon.deleteCandidate
)

export default routerCommon