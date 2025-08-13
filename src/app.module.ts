import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
// import { UserModule } from './user/user.module';
// import { ProfileModule } from './profile/profile.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.DB_URI ?? ''),
    PrismaModule,
    // AuthModule,
    // UserModule,
    // ProfileModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule { }
