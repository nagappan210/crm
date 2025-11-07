import type { RequestHandler } from "express"
import { ResponseBuilder } from "src/config/helper"
import type { CandidateModel } from "src/model/adminModel"
import { CommonService } from "src/service/commonService"

export class CommonController{

    private commonService = new CommonService()

      createCandidate:RequestHandler =async(req,res)=>{
    try {
      const data:CandidateModel = req.body
      const create = await this.commonService.createCandidate(data)
      return res.status(200).json(create)
    } catch (error:any) {
      return res.status(400).json(ResponseBuilder.failure(0, "Internal Server Error", error));
      
    }
  }
  editCandidate:RequestHandler = async(req,res)=>{
    try {
      const data:CandidateModel = req.body
      data.id = Number(data.id)
      const edits = await this.commonService.editCandidate(data)
      return res.status(200).json(edits)
    } catch (error) {
      return res.status(400).json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
      
    }
  }
  
  deleteCandidate:RequestHandler = async(req,res)=>{
    try {
      const id = Number(req.query.id)
      const del = await this.commonService.deleteCandidate(id)
      return res.status(200).json(del)
    } catch (error) {
      return res.status(400).json(ResponseBuilder.failure(0, "Internal Server Error", [error]));
      
    }
  }

}