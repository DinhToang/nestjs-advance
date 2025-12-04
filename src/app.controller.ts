import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from './user.decorator';
import { UserEntity } from './user.entity';
import type { Response, Request } from 'express'; // ← type only import
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully' };
  }

  //Accept only Image/PNG file
  @Post('upload-png')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadPngFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/png' })
        .build({ errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return { message: 'PNG file uploaded successfully' };
  }

  @Get('user/:id')
  findOne(
    @User()
    user: UserEntity,
  ) {
    console.log(user);
    return user;
  }

  @Get('get-cookie')
  finndAll(@Req() req: Request) {
    console.log(req.cookies);
    return req.cookies;
  }

  @Get('set-cookie')
  setCookie(
    @Res({ passthrough: true })
    response: Response,
  ) {
    response.cookie('userId', '133213212');
    response.send('Cookie saved successfully');
  }
}
