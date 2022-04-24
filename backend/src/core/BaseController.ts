import { Request, Response } from "express";

export abstract class  BaseController {
    protected abstract actImpl(req: Request, res: Response): Promise<void | any>

    private jsonResponse( res: Response, code: number, message: string) {
        return res.status(code).send(message);
    }

    public async act(req: Request, res: Response) {
        try{
            await this.actImpl(req, res);
        }
        catch(err) {
            console.log(err.stack);
        }
    }

    public ok<T>(res: Response, data?: T) {
        if(!!data) {
            res.type('application/json')
            return res.status(200).json(data)
        }
        else {
            res.sendStatus(200);
        }
    }

    public created<T> (res: Response, data?: T) {
        if(!!data) {
            res.type('application/json')
            return res.status(200).json(data)
        }
        else {
            res.sendStatus(200);
        }
    }

    public clientError(res: Response, message?: string) {
        return this.jsonResponse(res, 400, message ? message : 'Unauthorized');
      }
    
      public unauthorized(res: Response, message?: string) {
        return this.jsonResponse(res, 401, message ? message : 'Unauthorized');
      }
    
      public forbidden(res: Response, message?: string) {
        return this.jsonResponse(res, 403, message ? message : 'Forbidden');
      }
    
      public notFound(res: Response, message?: string) {
        return this.jsonResponse(res, 404, message ? message : 'Not found');
      }
    
      public conflict(res: Response, message?: string) {
        return this.jsonResponse(res, 409, message ? message : 'Conflict');
      }
    
      public fail(res: Response, error: Error | string) {
        return res.status(500).json({
          message: error.toString()
        });
      }
      public validationError(res: Response, error: any) {
        return res.status(422).json({
          message: 'Validation error',
          details: error
        });
      }
}