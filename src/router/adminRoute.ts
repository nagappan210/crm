import express from "express";
import { AdminController } from "src/controller/AdminController";
import { authVerify } from "src/middleware/verify";
const controllerAdmin = new AdminController();

const adminRouter = express.Router();

adminRouter.post("/createUser",
    //#swagger.tags = ['Admin']
    //#swagger.parameters['name'] = {in:'formData',type:'string',required:true} 
    //#swagger.parameters['password'] = {in:'formData',type:'string',required:true} 
    //#swagger.parameters['roll'] = {in:'formData',type:'string',required:true} 
controllerAdmin.createUser)

adminRouter.post("/loginUser",
    //#swagger.tags = ['Admin']
    //#swagger.parameters['name'] = {in:'formData',type:'string',required:true} 
    //#swagger.parameters['password'] = {in:'formData',type:'string',required:true}
controllerAdmin.loginUser)


adminRouter.get("/check",authVerify(["admin","BA"]),
//#swagger.tags = ['Admin']
  (req, res) => {
    res.json({
      success: true,
      message: "You are an admin",
      user: (req as any).user,
    });
  }
);



adminRouter.post("/createService",
  //#swagger.tags = ['Admin']
  //#swagger.parameters['name'] = {in:'formData',type:'string',required:true}
  controllerAdmin.createService
)
adminRouter.patch("/editService",
  //#swagger.tags = ['Admin']
  //#swagger.parameters['id'] = {in:'formData',type:'string',required:true}
  //#swagger.parameters['name'] = {in:'formData',type:'string',required:true}
  controllerAdmin.editService
)
adminRouter.delete("/deleteService",
  //#swagger.tags = ['Admin']
  //#swagger.parameters['id'] = {in:'formData',type:'string',required:true}
  controllerAdmin.deleteService
)


adminRouter.post("/createDepartment",
  //#swagger.tags = ['Admin']
  //#swagger.parameters['name'] = {in:'formData',type:'string',required:true}
  controllerAdmin.createDepartment
)
adminRouter.patch("/editDepartment",
  //#swagger.tags = ['Admin']
  //#swagger.parameters['id'] = {in:'formData',type:'string',required:true}
  //#swagger.parameters['name'] = {in:'formData',type:'string',required:true}
  controllerAdmin.editDepartment
)
adminRouter.delete("/deleteDepartment",
  //#swagger.tags = ['Admin']
  //#swagger.parameters['id'] = {in:'formData',type:'string',required:true}
  controllerAdmin.deleteDepartment
)





export default adminRouter;
