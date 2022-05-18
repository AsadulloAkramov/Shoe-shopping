import { Transporter, createTransport } from 'nodemailer';

export default class EmailService {
  private  transporter: Transporter;

  async createTransport() {
    this.transporter = createTransport({
      host: 'asadulla@payme.uz',
      port: 465,
      secure: true,
      auth: {
        user: "testbekov@gmail.com",
        pass: "testbek123"
      }
    })
  }

  async send(params: any) {
    this.createTransport();
    return await this.transporter.sendMail(params);
  }
}