import type {
  CandidateModel,
  ClientModel,
  SpamModel,
} from "src/model/adminModel";
import { PrismaClient } from "../generated/prisma/client";
import { ResponseBuilder, type ResponseFormat } from "src/config/helper";
import path from "path";
import fs from "fs";
const db = new PrismaClient();
export class CommonService {
  async createCandidate(data: CandidateModel): Promise<ResponseFormat> {
    try {
      const create = await db.candidate.create({
        data: {
          enquiry_raised_date: new Date(data.enquiry_raised_date),
          enquiry_answered_date: new Date(data.enquiry_answered_date),
          name: data.name,
          phone_number: Number(data.phone_number),
          alternative_phonenumber: Number(data.alternative_phonenumber) ?? 0,
          email: data.email,
          location: data.location,
          role: data.role,
          experience: data.experience,
          months: data.months,
          degree: data.degree,
          added_by: data.added_by,
        },
      });

      let result = create ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result
          ? "The candidate Added"
          : "There is error in  creting the client",
        [create]
      );
    } catch (error) {
      return ResponseBuilder.failure(0, "Error in adding the Candidated", [
        error,
      ]);
    }
  }

  async editCandidate(data: CandidateModel): Promise<ResponseFormat> {
    try {
      const existing = await db.candidate.findUnique({
        where: { id: Number(data.id) },
      });
      if (!existing) {
        return ResponseBuilder.failure(0, "No User Found", []);
      }
      const update: any = {};
      Object.keys(data).forEach((key) => {
        if (key === "id") return; // skip id field
        const val = (data as any)[key];
        update[key] = val === "" ? null : val;
      });

      // Convert necessary fields before saving
      if (update.phone_number)
        update.phone_number = Number(update.phone_number);
      if (update.alternative_phonenumber)
        update.alternative_phonenumber = Number(update.alternative_phonenumber);
      if (update.enquiry_raised_date)
        update.enquiry_raised_date = new Date(update.enquiry_raised_date);
      if (update.enquiry_answered_date)
        update.enquiry_answered_date = new Date(update.enquiry_answered_date);

      const changes = await db.candidate.update({
        where: { id: Number(data.id) },
        data: update,
      });
      let result = changes ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result ? "The value is Updated" : "Error in updating the value",
        [changes]
      );
    } catch (error: any) {
      console.log("error", error);
      return ResponseBuilder.failure(0, "Error in Updating", error);
    }
  }

  async deleteCandidate(id: number): Promise<ResponseFormat> {
    try {
      const existing = await db.candidate.findUnique({
        where: { id: id },
        select: {
          s_delete: true,
        },
      });

      if (!existing) {
        return ResponseBuilder.failure(0, "No User Found", []);
      }

      const newValue = existing.s_delete ? 0 : 1;
      const delets = await db.candidate.update({
        where: { id: Number(id) },
        data: {
          s_delete: newValue,
        },
      });

      let result = delets ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result ? "The Value is deleted" : "The Value is not deleted",
        [delets]
      );
    } catch (error) {
      return ResponseBuilder.failure(0, "Error in Deleting", [error]);
    }
  }

  async createClient(data: ClientModel): Promise<ResponseFormat> {
    try {
      const create = await db.client.create({
        data: {
          enquiry_raised_date: new Date(data.enquiry_raised_date),
          enquiry_answerd_date: new Date(data.enquiry_answerd_date),
          name: data.name,
          phone_number: Number(data.phone_number),
          alternative_phonenumber: Number(data.alternative_phonenumber),
          email: data.email,
          location: data.location,
          business_type: data.business_type,
          service_required: data.service_required,
          lead: data.lead,
          remark: data.remark,
          company_name: data.company_name,
          added_by: data.added_by,
        },
      });
      const result = create ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result
          ? "The Client is added"
          : "There is an Error in Adding the Client",
        [create]
      );
    } catch (error: any) {
      return ResponseBuilder.failure(0, "Error in Adding the Client", [
        error.message,
      ]);
    }
  }

  async editClient(data: ClientModel): Promise<ResponseFormat> {
    try {
      const existing = await db.client.findUnique({
        where: { id: Number(data.id) },
      });

      if (!existing) {
        return ResponseBuilder.failure(0, "No Client Found", []);
      }

      const update: any = {};
      Object.keys(data).forEach((key) => {
        if (key === "id") return;
        const val = (data as any)[key];
        update[key] = val === "" ? null : val;
      });

      if (update.phone_number)
        update.phone_number = Number(update.phone_number);
      if (update.alternative_phonenumber)
        update.alternative_phonenumber = Number(update.alternative_phonenumber);
      if (update.enquiry_raised_date)
        update.enquiry_raised_date = new Date(update.enquiry_raised_date);
      if (update.enquiry_answerd_date)
        update.enquiry_answerd_date = new Date(update.enquiry_answerd_date);

      const changes = await db.client.update({
        where: { id: Number(data.id) },
        data: update,
      });

      const result = changes ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result ? "Client updated successfully" : "Error updating client",
        [changes]
      );
    } catch (error: any) {
      console.log("error", error);
      return ResponseBuilder.failure(0, "Error in updating client", [
        error.message,
      ]);
    }
  }

  async deleteClient(id: number): Promise<ResponseFormat> {
    try {
      const existing = await db.client.findUnique({
        where: { id: Number(id) },
        select: {
          s_delete: true,
        },
      });
      const newVal = existing?.s_delete ? 0 : 1;
      const updates = await db.client.update({
        where: { id: Number(id) },
        data: {
          s_delete: newVal,
        },
      });
      let result = updates ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result ? "The Value is Deleted" : "Error in Deleting the Value",
        [updates]
      );
    } catch (error: any) {
      return ResponseBuilder.failure(0, "Error in Updating the Client", [
        error.message,
      ]);
    }
  }

  async addSpam(data: SpamModel): Promise<ResponseFormat> {
    try {
      const create = await db.spam.create({
        data: {
          enquiry_raised_date: new Date(data.enquiry_raised_date),
          enquiry_answered_date: new Date(data.enquiry_answered_date),
          name: data.name,
          phone_number: Number(data.phone_number),
          email: data.email,
          location: data.location,
          leads: data.leads,
          remarks: data.remarks,
        },
      });
      let result = create ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result ? "The Spam is Added" : "Error in Adding the Spam",
        [create]
      );
    } catch (error: any) {
      return ResponseBuilder.failure(
        0,
        "Error in Adding the Spam",
        error.message
      );
    }
  }

  async editSpam(data: SpamModel): Promise<ResponseFormat> {
    try {
      if (!data.id) {
        throw ResponseBuilder.failure(0, "Spam Id is Required", []);
      }
      const existing = await db.spam.findUnique({
        where: { id: data.id },
      });
      const update: any = {};
      Object.keys(data).forEach((key) => {
        if (key === "id") return;
        const val = (data as any)[key];
        update[key] = val === "" ? null : val;
      });
      if (update.enquiry_raised_date) {
        update.enquiry_raised_date = new Date(update.enquiry_raised_date);
      }
      if (update.enquiry_answered_date) {
        update.enquiry_answered_date = new Date(update.enquiry_answered_date);
      }
      if (update.phone_number) {
        update.phone_number = Number(update.phone_number);
      }
      const updates = await db.spam.update({
        where: { id: Number(data.id) },
        data: update,
      });
      let result = updates ? 1 : 0;
      return ResponseBuilder.success(
        result,
        result ? "The value is Updated" : "Error in Updating the Value",
        [updates]
      );
    } catch (error: any) {
      return ResponseBuilder.failure(0, "Error in Updating the Value", [
        error.message,
      ]);
    }
  }

  async deleteSpam(id: number) {
    try {
      const existing = await db.spam.findUnique({
        where: { id: id },
        select: {
          s_delete: true,
        },
      });
      const newValue = existing?.s_delete ? 0 : 1;
      let deletes = await db.spam.update({
        where: { id: id },
        data: {
          s_delete: newValue,
        },
      });

      let result = deletes ? 1 : 0;
      return ResponseBuilder.success(
        result,
        newValue ? "The value is deleted" : "The value is  undeleted",
        [deletes]
      );
    } catch (error) {
      return ResponseBuilder.failure(0, "Error in Deleting the value", [error]);
    }
  }

  async uploadClientFiles(clientId: number,data: { followUpId: number; transcationId: string },files: any): Promise<ResponseFormat> {
    try {
      if (!clientId) {
        return ResponseBuilder.failure(0, "Client ID is required", []);
      }

      const getFileTypeId = (mimetype: string) => {
        if (mimetype.startsWith("image/")) return 1;
        if (mimetype.startsWith("audio/")) return 2;
        return 3; 
      };
      const basePath = path.join(
        __dirname,
        "..",
        "uploads",
        "clients",
        clientId.toString()
      );
      if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

      const fileDetails: any[] = [];

      const pushFile = (
        type: string,
        arr: Express.Multer.File[] | undefined
      ) => {
        if (!arr) return;
        arr.forEach((f) => {
          fileDetails.push({
            clientId,
            type,
            path: f.path,
            filename: f.filename,
            mimetype: f.mimetype,
            size: f.size,
          });
        });
      };

      pushFile("client", files.clientFile);
      pushFile("payment", files.paymentFile);
      pushFile("followup", files.followupFile);
      console.log("files", files);

      // CLIENT FILES
      if (files.clientFile) {
        for (const file of files.clientFile) {
          await db.client_details_file.create({
            data: {
              client_id: clientId,
              type: getFileTypeId(file.mimetype),
              path: file.filename,
            },
          });
        }
      }

      // PAYMENT FILES
      if (files.paymentFile) {
        for (const file of files.paymentFile) {
          await db.payment_files.create({
            data: {
              client_id: clientId,
              path: file.filename,
              transcation_id: data.transcationId || null,
            },
          });
        }
      }

      // FOLLOWUP FILES
      if (files.followupFile) {
        for (const file of files.followupFile) {
          await db.follow_up_files.create({
            data: {
              client_id: clientId,
              followup_id: Number(data.followUpId),
              type: getFileTypeId(file.mimetype),
              path: file.filename,
            },
          });
        }
      }

      return ResponseBuilder.success(
        1,
        "Files uploaded successfully",
        fileDetails
      );
    } catch (error:any) {
      return ResponseBuilder.failure(0, "Error while uploading client files", [
        [error.message],
      ]);
    }
  }


 async editClientFiles(followUpId: number,transcationId: string,clientId: number,category: string,files: any,deleteIds: number[]): Promise<ResponseFormat> {
    try {
      if (!clientId || !category) {
        return ResponseBuilder.failure(0, "Client ID and category are required", []);
      }
      let table: any;
      switch (category) {
        case "client":
          table = db.client_details_file;
          break;
        case "payment":
          table = db.payment_files;
          break;
        case "followup":
          table = db.follow_up_files;
          break;
        default:
          return ResponseBuilder.failure(0, "Invalid category", []);
      }
      console.log('deleteIds', deleteIds)
      if (Array.isArray(deleteIds) && deleteIds.length > 0) {
        const records = await table.findMany({where: { id: { in: deleteIds.map(Number) } },});
      console.log('records', records)
        for (const record of records) {
          if (record.path) {
            const filePath = path.join(process.cwd(), "uploads", record.path);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.log(" Deleted:", filePath);
            }
          }
        }

        await table.deleteMany({ where: { id: { in: deleteIds.map(Number) } } });
      }

      // ✅ 4. Add new files (if uploaded)
      const fieldName = `${category}File`; // e.g. clientFile, paymentFile, followupFile
      const newFiles = files[fieldName] || [];

      const getFileTypeId = (mimetype: string) => {
        if (mimetype.startsWith("image/")) return 1;
        if (mimetype.startsWith("audio/")) return 2;
        return 3; // docs, pdf, excel, others
      };

      const toRelative = (absPath: string) =>
        path.relative(path.join(process.cwd(), "uploads"), absPath);

      for (const file of newFiles) {
        const relativePath = toRelative(file.path);

        const data: any = {
          client_id: Number(clientId),
          path: relativePath,
        };

        if (category === "client" || category === "followup") {
          data.type = getFileTypeId(file.mimetype);
        }
        if (category === "payment") {
          data.transcation_id = transcationId || null;
        }
        if (category === "followup") {
          data.followup_id = Number(followUpId) || 0;
        }

        await table.create({ data });
      }

      // ✅ 5. Return response
      return ResponseBuilder.success(1, "Files updated successfully", []);
    } catch (err: any) {
      console.error("❌ Error in editClientFiles:", err);
      return ResponseBuilder.failure(0, "Error updating files", [err.message]);
    }
  }




  // async deleteFiles(deleteids)
}
