import { Body, Controller, Put } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor( private readonly dashboardService:DashboardService){}

    @Put('update')
    async update(@Body() body:{id: number,email:string,full_name:string,user_name:string,phone:string}):Promise<any>{
        const {id, email,full_name ,user_name,phone} = body;
        return await this.dashboardService.update(id,email,full_name,user_name,phone);
    }
}
