// import GetOneAdminDTO from './dto/create-admin.dto';
import GetOneAdminDTO from './dto/get-one-admin.dto';

interface IAdmin {
  name: string;
  id: number;
}

export default class AdminService {
  private readonly admins: IAdmin[] = [
    {
      name: 'max',
      id: 1,
    },
    {
      name: 'Vetal',
      id: 2,
    },
  ];

  async getAdmins(): Promise<GetOneAdminDTO[]> {
    const data = this.admins.map(
      ({ name, id }): GetOneAdminDTO => ({ name, id }),
    );

    return data;
  }

  getAdmin(id: number): IAdmin {
    return this.admins.filter((item) => item.id === id)[0];
  }
}
