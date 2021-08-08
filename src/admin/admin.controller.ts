import autoBind = require('auto-bind');
import { Controller, Get, Post, Schema } from '../../core/decorators';
import { getOne, createOne } from './admin.schema';
import AdminService from './admin.service';
import CreateAdminDTO from './dto/create-admin.dto';
import GetOneAdminDTO from './dto/get-one-admin.dto';

@Controller('/admin')
export default class AdminController {
  private readonly adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
    autoBind(this);
  }

  @Get('/')
  async getAdmins(): Promise<GetOneAdminDTO[]> {
    const data = await this.adminService.getAdmins();
    return data;
  }

  @Get('/:id')
  @Schema(getOne)
  getAdmin() {
    return this.adminService.getAdmin(2);
  }

  @Post('/')
  // @Schema(createOne)
  createAdmin() {
    return 2;
  }
}
