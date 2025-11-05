export type ResponseFormat = {
  status: Number;
  message: string;
  data: any[];
};

export class ResponseBuilder {
  private status:Number;
  private message: string;
  private data: any[];

  constructor(
    status: Number,
    message: string = "",
    data: any[] = []
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  build(): ResponseFormat {
    return {
      status: this.status,
      message: this.message,
      data: this.data
    };
  }

  static success(status:number,message: string = "Success", data: any[] = []): ResponseFormat {
    return new ResponseBuilder(status, message, data).build();
  }

  static failure(status:number,message: string = "Failed", error: any[] = []): ResponseFormat {
    return new ResponseBuilder(status, message, error).build();
  }
}
