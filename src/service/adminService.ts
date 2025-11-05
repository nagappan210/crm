import { ResponseBuilder, type ResponseFormat } from "src/config/helper";
import { PrismaClient } from "src/generated/prisma/client";
import { TokenClass } from "src/middleware/Authentication";
import type { BusinessModel, CategoryModel, UserModel } from "src/model/adminModel.ts";
const db = new PrismaClient();
const authClass = new TokenClass();
export class AdminServices {
  async createUser(data: UserModel): Promise<ResponseFormat> {
    try {
      const hasedpassword: string = await authClass.Bcrypt(data.password);
      const token = await authClass.tokenGeneration(data.name, data.roll);
      const create = await db.user.create({
        data: {
          name: data.name,
          password: hasedpassword,
          roll: data.roll,
        },
      });
      let result = create ? 1 : 0;
      return ResponseBuilder.success(result, "The user Craeted", [
        {
          create,
          token: token,
        },
      ]);
    } catch (error: any) {
      return ResponseBuilder.failure(0, "Error in Creating a user", [error]);
    }
  }

  async LoginUser(data: UserModel): Promise<ResponseFormat> {
    try {
      const user = await db.user.findUnique({
        where: { name: data.name },
      });

      if (!user) {
        return ResponseBuilder.failure(0, "User Not Found", []);
      }
      const isValid = await authClass.BcryptCompare(
        data.password,
        user?.password as string
      );
      if (!isValid) {
        return ResponseBuilder.failure(0, "InCorrect Password", []);
      }

      const token = await authClass.tokenGeneration(
        user.name as string,
        user.roll as string
      );

      return ResponseBuilder.success(1, "User Login SucessFull", [
        {
          token,
          user,
        },
      ]);
    } catch (error) {
      return ResponseBuilder.failure(0, "Error in Loging a user", [error]);
    }
  }

  async createService(data: CategoryModel): Promise<ResponseFormat> {
    try {
      const create = await db.service.create({
        data: {
          name: data.name,
        },
      });
      let result = create ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result ? "The value is added" : "Error in Adding the Value",
        [create]
      );
    } catch (error) {
      return ResponseBuilder.failure(0, "Error in adding the Service", [error]);
    }
  }

  async editService(data: CategoryModel): Promise<ResponseFormat> {
    try {
      const editService = await db.service.update({
        where: { id: Number(data.id) },
        data: {
          name: data.name,
        },
      });
      let result = editService ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result ? "The value is edited" : "Error in Editing the value",
        [editService]
      );
    } catch (error) {
      return ResponseBuilder.failure(0, "Error in Editing the Service", [
        error,
      ]);
    }
  }

  async deleteService(data: CategoryModel): Promise<ResponseFormat> {
    try {
      const existing = await db.service.findUnique({
        where: { id: Number(data.id) },
      });
      const newState = existing?.s_delete ? 0 : 1;
      const update = await db.service.update({
        where: { id: Number(data.id) },
        data: {
          s_delete: newState,
        },
      });
      let result = update ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result ? "The value is Deleted" : "The value is reactivated",
        [update]
      );
    } catch (error) {
      return ResponseBuilder.failure(
        0,
        "Error in Deleting or Reactivating the the value",
        [error]
      );
    }
  }


  async createBusiness(data:BusinessModel):Promise<ResponseFormat>{
    try {
      const create = await db.business.create({
        data:{
          name:data.name
        }
      })
      let result = create ? 1 : 0 
      return ResponseBuilder.success(result,result ? "The value is created":"Error in Creating Value",[create])
    } catch (error) {
      return ResponseBuilder.failure(0,"Error in Creating the Buisness",[error])
    }
  }


  async editBusiness(data:BusinessModel):Promise<ResponseFormat>{
    try {
      const update = await db.business.update({
        where:{id:Number(data.id)},
        data:{
          name:data.name
        }
      })
      let result = update ? 1 : 0
      return ResponseBuilder.success(result,result ? "The value is updated":"The value is not Updated",[update])
    } catch (error) {
      return ResponseBuilder.failure(0,"Error in Editing the Business",[error])
    }
  }

  async deleteBusiness(data:BusinessModel):Promise<ResponseFormat>{
    try {
      const existing = await db.business.findUnique({
        where:{id:Number(data.id)},
        select:{
          s_delete:true
        }
      })

      const newState = existing?.s_delete ? 1 :0 
      const update = await db.business.update({
        where:{id:Number(data.id)},
        data:{s_delete:newState}
      })

      let result = update ? 1 : 0 
      return ResponseBuilder.success(result,result?"The value is deleted":"Error in deleting the value",[update])

    } catch (error) {
      return ResponseBuilder.failure(0,"Error in Deleting",[error])
    }
  }




  
  async createDepartment(data:BusinessModel):Promise<ResponseFormat>{
    try {
      const create = await db.department.create({
        data:{
          name:data.name
        }
      })
      let result = create ? 1 : 0 
      return ResponseBuilder.success(result,result ? "The value is created":"Error in Creating Value",[create])
    } catch (error) {
      return ResponseBuilder.failure(0,"Error in Creating the Buisness",[error])
    }
  }


  async editDepartment(data:BusinessModel):Promise<ResponseFormat>{
    try {
      const update = await db.department.update({
        where:{id:Number(data.id)},
        data:{
          name:data.name
        }
      })
      let result = update ? 1 : 0
      return ResponseBuilder.success(result,result ? "The value is updated":"The value is not Updated",[update])
    } catch (error) {
      return ResponseBuilder.failure(0,"Error in Editing the Business",[error])
    }
  }

  async deleteDepartment(data:BusinessModel):Promise<ResponseFormat>{
    try {
      const existing = await db.department.findUnique({
        where:{id:Number(data.id)},
        select:{
          s_delete:true
        }
      })

      const newState = existing?.s_delete ? 1 :0 
      const update = await db.business.update({
        where:{id:Number(data.id)},
        data:{s_delete:newState}
      })

      let result = update ? 1 : 0 
      return ResponseBuilder.success(result,result?"The value is deleted":"Error in deleting the value",[update])

    } catch (error) {
      return ResponseBuilder.failure(0,"Error in Deleting",[error])
    }
  }


  // async createClinet(data:)


}
