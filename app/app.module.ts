import { Module } from '@nestjs/common';
import { AuthModule } from './routes/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';


@Module({
  imports: [AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_HOST, // smtp.sendgrid.net
          port: 587,
          secure: false,
          auth: {
            type: "OAuth2",
            accessToken: process.env.ACCESS_TOKEN,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            user: process.env.EMAIL_USER
          },
        },
        defaults: {
          from: `"Tour-Guide-App" <${process.env.EMAIL_USER}>`,
        },
        template: {
          dir: join(__dirname, '../app/routes/auth/models/templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
})
export class AppModule { }
