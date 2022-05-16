import * as fs from 'fs';

export default class FileService {
  getFileNamesInPath(path: string , files: any = []) {
    fs.readdirSync(path).forEach((file: any) => {
      const fileOrDir = path + "/" + file;
      if(fs.lstatSync(fileOrDir).isFile()) {
        files.push(fileOrDir)
      } else if (fs.lstatSync(fileOrDir).isDirectory()) {
        return this.getFileNamesInPath(fileOrDir , files);
      }
    });
  }
}