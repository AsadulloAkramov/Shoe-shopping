import * as TJS from "typescript-json-schema";
import FileService from './services/FileServices';

class JsonSchemaModule {
  public classes: any;
  public models: any;
  public definitions: any;

  private fileService = new FileService();
  constructor() {
    try {
      this.getClasses();
      this.getModels();
      this.assign();
    } catch (e) {
      console.error("JsonSchemaModule error:", e);
    }
  }

  private getModels() {
    const modelsPath = "./node_modules/@payme/id-models/src";
    const modelFiles: string[] = [];
    this.fileService.getFileNamesInPath(modelsPath, modelFiles);
    const program = TJS.getProgramFromFiles(
      modelFiles,
      { strictNullChecks: true },
      "/"
    );
    this.models = TJS.generateSchema(program, "*", {
      required: true,
    }).definitions;
  }

  private getClasses() {
    const classesPath = "../../../src/validations";
    const classesFiles: string[] = [];
    this.fileService.getFileNamesInPath(classesPath, classesFiles);
    const program = TJS.getProgramFromFiles(
      classesFiles,
      { strictNullChecks: true },
      "/"
    );
    this.classes = TJS.generateSchema(program, "*", {
      required: true,
    }).definitions;
  }

  private assign() {
    this.definitions = Object.assign(this.models, this.classes);
  }
}

export default new JsonSchemaModule();
