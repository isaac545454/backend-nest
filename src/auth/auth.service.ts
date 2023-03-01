import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuhtService {
  constructor(private readonly jwtservice: JwtService) {}
  async createToken() {
    //
    return;
  }
  async checkToken(token: string) {
    return;
  }
}
