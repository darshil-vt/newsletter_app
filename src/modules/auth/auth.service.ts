import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password_hash)) {
      const { password_hash, ...result } = user; 
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email,organization_id: user.organization_id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const payload = { email: user.email, organization_id: user.organization_id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
