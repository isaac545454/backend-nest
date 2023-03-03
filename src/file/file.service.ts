import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, path: string) {
    return await writeFile(path, file.buffer);
  }
}
