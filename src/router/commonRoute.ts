import express from 'express'
import { CommonController } from 'src/controller/CommonController'
import { uploadClientFiles } from 'src/middleware/Multer';

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


routerCommon.post(
  "/uploadClientFiles/:clientId",
  //#swagger.tags = ['Client']
  //#swagger.description = 'API to upload client, followup, and payment files dynamically based on clientId'
  //#swagger.parameters['clientFile'] = { in: 'formData', type: 'file', required: false }
  //#swagger.parameters['paymentFile'] = { in: 'formData', type: 'file', required: false }
  //#swagger.parameters['followupFile'] = { in: 'formData', type: 'file', required: false }
  //#swagger.parameters['transcationId'] = {in:'formData',type:'string',example:"abcd"}
  //#swagger.parameters['followUpId'] = {in:'formData',type:'number' ,example:"123456789"}
 
  uploadClientFiles,
  controllerCommon.uploadClientFiles
);


routerCommon.patch(
  "/editClientFiles/:clientId",
  //#swagger.tags = ['Client']
  //#swagger.description = 'API to edit (delete and add) client, followup, and payment files for a specific clientId and category'
  //#swagger.parameters['category'] = { in: 'formData', type: 'string', required: true, example: "client", description: "Category of file - client, payment, or followup" }
  //#swagger.parameters['followUpId'] = { in: 'formData', type: 'number', required: false, example: "12345" }
  //#swagger.parameters['transcationId'] = { in: 'formData', type: 'string', required: false, example: "TXN001" }
  //#swagger.parameters['deleteIds'] = { in: 'formData', type: 'string', required: false, example: "[1, 2, 3]" }
  //#swagger.parameters['clientFile'] = { in: 'formData', type: 'file', required: false }
  //#swagger.parameters['paymentFile'] = { in: 'formData', type: 'file', required: false }
  //#swagger.parameters['followupFile'] = { in: 'formData', type: 'file', required: false }
  uploadClientFiles,
  controllerCommon.editClientFiles
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



routerCommon.post(
  "/createClient",
  //#swagger.tags = ['Common']
  //#swagger.description = 'API to create a new candidate record'
  //#swagger.parameters['enquiry_raised_date']= { in:'formData',type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' },
  //#swagger.parameters['enquiry_answerd_date']= {in:'formData', type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' }
  //#swagger.parameters['name'] = {in:'formData',type:'string',required:true ,example:"abcd"}
  //#swagger.parameters['company_name'] = {in:'formData',type:'string',required:true ,example:"abcd"}
  //#swagger.parameters['phone_number'] = {in:'formData',type:'number',required:true ,example:"123456789"}
  //#swagger.parameters['alternative_phonenumber'] = {in:'formData',type:'number',example:"123456789"}
  //#swagger.parameters['email'] = {in:'formData',type:'string',required:true ,example:"abcd@gmail,\.com"}
  //#swagger.parameters['location'] = {in:'formData',type:'string'}
  //#swagger.parameters['business_type'] = {in:'formData',type:'string'}
  //#swagger.parameters['service_required'] = {in:'formData',type:'string'}
  //#swagger.parameters['lead'] = {in:'formData',type:'string'}
  //#swagger.parameters['remark'] = {in:'formData',type:'string'}
  //#swagger.parameters['added_by'] = {in:'formData',type:'string'}
  controllerCommon.addClient
);

routerCommon.patch(
  "/editClient",
  //#swagger.tags = ['Common']
  //#swagger.description = 'API to create a new candidate record'
  //#swagger.parameters['id']= { in:'formData',type: 'number', example: '1' },
  //#swagger.parameters['enquiry_raised_date']= { in:'formData',type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' },
  //#swagger.parameters['enquiry_answerd_date']= {in:'formData', type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' }
  //#swagger.parameters['name'] = {in:'formData',type:'string',required:true ,example:"abcd"}
  //#swagger.parameters['company_name'] = {in:'formData',type:'string',required:true ,example:"abcd"}
  //#swagger.parameters['phone_number'] = {in:'formData',type:'number',required:true ,example:"123456789"}
  //#swagger.parameters['alternative_phonenumber'] = {in:'formData',type:'number',example:"123456789"}
  //#swagger.parameters['email'] = {in:'formData',type:'string',required:true ,example:"abcd@gmail,\.com"}
  //#swagger.parameters['location'] = {in:'formData',type:'string'}
  //#swagger.parameters['business_type'] = {in:'formData',type:'string'}
  //#swagger.parameters['service_required'] = {in:'formData',type:'string'}
  //#swagger.parameters['lead'] = {in:'formData',type:'string'}
  //#swagger.parameters['remark'] = {in:'formData',type:'string'}
  //#swagger.parameters['added_by'] = {in:'formData',type:'string'}
  controllerCommon.editClient
);



routerCommon.delete("/deleteClient",
  //#swagger.tags = ['Common']
  //#swagger.description = 'API to Edit a  candidate record'
  //#swagger.parameters['id']= { in:'query',type: 'number',required:true },
  controllerCommon.deleteClient
)



routerCommon.post(
  "/createSpam",
  //#swagger.tags = ['Common']
  //#swagger.description = 'API to create a new Spam record'
  //#swagger.parameters['enquiry_raised_date']= { in:'formData',type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' },
  //#swagger.parameters['enquiry_answered_date']= {in:'formData', type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' }
  //#swagger.parameters['name'] = {in:'formData',type:'string',required:true ,example:"abcd"}
   //#swagger.parameters['phone_number'] = {in:'formData',type:'number',required:true ,example:"123456789"}
  //#swagger.parameters['email'] = {in:'formData',type:'string',required:true ,example:"abcd@gmail,\.com"}
  //#swagger.parameters['location'] = {in:'formData',type:'string'}
  //#swagger.parameters['leads'] = {in:'formData',type:'string'}
  //#swagger.parameters['remarks'] = {in:'formData',type:'string'}
  //#swagger.parameters['added_by'] = {in:'formData',type:'string'}
  controllerCommon.addSpam
);



routerCommon.patch(
  "/editSpam",
  //#swagger.tags = ['Common']
  //#swagger.description = 'API to create a new candidate record'
  //#swagger.parameters['id']= { in:'formData',type: 'number', example: '1' },
  //#swagger.parameters['enquiry_raised_date']= { in:'formData',type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' },
  //#swagger.parameters['enquiry_answered_date']= {in:'formData', type: 'string', format: 'date-time', example: '2025-11-07T00:00:00Z' }
  //#swagger.parameters['name'] = {in:'formData',type:'string',example:"abcd"}
   //#swagger.parameters['phone_number'] = {in:'formData',type:'number',example:"123456789"}
  //#swagger.parameters['email'] = {in:'formData',type:'string',example:"abcd@gmail,\.com"}
  //#swagger.parameters['location'] = {in:'formData',type:'string'}
  //#swagger.parameters['leads'] = {in:'formData',type:'string'}
  //#swagger.parameters['remarks'] = {in:'formData',type:'string'}
  //#swagger.parameters['added_by'] = {in:'formData',type:'string'}
  controllerCommon.editSpam
);



routerCommon.delete("/deleteSpam",
  //#swagger.tags = ['Common']
  //#swagger.description = 'API to Delete a  Spam record'
  //#swagger.parameters['id']= { in:'query',type: 'number',required:true },
  controllerCommon.deleteSpam
)

export default routerCommon