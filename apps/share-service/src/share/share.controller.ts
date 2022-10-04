import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, Pagination } from '@app/common';
import { UpdateResult } from 'typeorm';
import { CurrentUser } from '../../../auth/src/current-user.decorator';
import { User } from '../../../auth/src/user/user';
import { ShareService } from './share.service';
import { ShareRequest } from '../dto';
import { Share } from './share';

@Controller('api/v1/share-service/shares')
export class ShareController {
  private readonly logger = new Logger(ShareController.name);

  constructor(private readonly shareService: ShareService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createShareDto: ShareRequest,
    @CurrentUser() user: User,
  ) {
    const companySet = !!createShareDto.company;
    if (!companySet) {
      createShareDto.company = user.company.id;
    }
    this.logger.log(user.company.name + ': Create Share ', createShareDto);
    return this.shareService.create(createShareDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query('member', ParseIntPipe) member: number): Promise<Array<Share>> {
    return this.shareService.findAll(member);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  getPaginated(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('member', ParseIntPipe) member: number,
  ): Promise<Pagination<Share>> {
    return this.shareService.paginate(
      {
        page: page,
        size: size,
      },
      member,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.shareService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShareDto: ShareRequest,
    @CurrentUser() user: User,
  ): Promise<UpdateResult> {
    const companySet = !!updateShareDto.company;
    if (!companySet) {
      updateShareDto.company = user.company.id;
    }
    return this.shareService.update(id, updateShareDto);
  }
}
