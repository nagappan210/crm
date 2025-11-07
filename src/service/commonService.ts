import type { CandidateModel, ClientModel } from "src/model/adminModel";
import { PrismaClient } from "../generated/prisma/client";
import { ResponseBuilder, type ResponseFormat } from "src/config/helper";

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

  async addClient(data: ClientModel): Promise<ResponseFormat> {
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
          : "There is an Error in Adding the Client"
      );
    } catch (error) {
      return ResponseBuilder.failure(0, "Error in Adding the Client", [error]);
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

    if (update.phone_number) update.phone_number = Number(update.phone_number);
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
    return ResponseBuilder.failure(0, "Error in updating client", [error]);
  }
}

}
