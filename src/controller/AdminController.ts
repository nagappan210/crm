import type { RequestHandler } from "express";
import { ResponseBuilder } from "src/config/helper";
import type {
  BusinessModel,
  CandidateModel,
  CategoryModel,
  UserModel,
} from "src/model/adminModel.ts";
import { AdminServices } from "src/service/adminService";

export class AdminController {
  private adminService = new AdminServices();

  createUser: RequestHandler = async (req, res) => {
    try {
      const data: UserModel = req.body;
      const create = await this.adminService.createUser(data);
      return res.status(200).json(create);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  loginUser: RequestHandler = async (req, res) => {
    try {
      const data: UserModel = req.body;
      const loginUser = await this.adminService.LoginUser(data);
      return res.status(200).json(loginUser);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  createService: RequestHandler = async (req, res) => {
    try {
      const data: CategoryModel = req.body;
      const create = await this.adminService.createService(data);
      return res.status(200).json(create);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  editService: RequestHandler = async (req, res) => {
    try {
      const data: CategoryModel = req.body;
      data.id = Number(data.id);
      const edit = await this.adminService.editService(data);
      return res.status(200).json(edit);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  deleteService: RequestHandler = async (req, res) => {
    try {
      const data: CategoryModel = req.body;
      data.id = Number(data.id);
      const create = await this.adminService.deleteService(data);
      return res.status(200).json(create);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  createBusiness: RequestHandler = async (req, res) => {
    try {
      const data = req.body;
      const create = await this.adminService.createBusiness(data);
      return res.status(200).json(create);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Intenal Server Error", [error]));
    }
  };

  editBusiness: RequestHandler = async (req, res) => {
    try {
      const data = req.body;
      data.id = Number(data.id);
      const update = await this.adminService.editBusiness(data);
      return res.status(200).json(update);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  deleteBusiness: RequestHandler = async (req, res) => {
    try {
      const data = req.body;
      data.id = parseInt(data.id);
      const deletes = await this.adminService.deleteBusiness(data);
      return res.status(200).json(deletes);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  createDepartment: RequestHandler = async (req, res) => {
    try {
      const data = req.body;
      const create = await this.adminService.createDepartment(data);
      return res.status(200).json(create);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Intenal Server Error", [error]));
    }
  };

  editDepartment: RequestHandler = async (req, res) => {
    try {
      const data = req.body;
      data.id = Number(data.id);
      const update = await this.adminService.editDepartment(data);
      return res.status(200).json(update);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  deleteDepartment: RequestHandler = async (req, res) => {
    try {
      const data = req.body;
      data.id = parseInt(data.id);
      const deletes = await this.adminService.deleteDepartment(data);
      return res.status(200).json(deletes);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  createCandidateRoll: RequestHandler = async (req, res) => {
    try {
      const payload: BusinessModel = req.body;
      const creates = await this.adminService.candidateRoll(payload);
      return res.status(200).json(creates);
    } catch (error) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
    }
  };

  editCandidateRoll: RequestHandler = async (req, res) => {
    try {
      const payload: BusinessModel = req.body;
      payload.id = Number(payload.id);
      const update = await this.adminService.editCandidateRoll(payload);
      return res.status(200).json(update);
    } catch (error: any) {
      return res
        .status(400)
        .json(ResponseBuilder.failure(0, "Internal Server Error", error));
    }
  };
  deleteCandidateRoll: RequestHandler = async (req, res) => {
    try {
      const id = Number(req.query.id);
      const delets = await this.adminService.deleteCandidateRoll(id);
      return res.status(200).json(delets);
    } catch (error: any) {
      return res.status(400).json(ResponseBuilder.failure(0, "Internal Server Error", error));
    }
  };
  







}
