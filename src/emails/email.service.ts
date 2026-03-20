import { createElement } from "react";
import { EmailTemplate, SendEmailOptions, TemplatePayloadMap } from "./email.types";
import { templateRegistry } from "./templates";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { getEnv } from "../config/env.config";



export class EmailService {


    async send<T extends EmailTemplate>(options: SendEmailOptions<T>) {

        const { to, subject, template, data } = options;


        const TemplateComponent = templateRegistry[template] as React.ComponentType<TemplatePayloadMap[T]>;

        if (!TemplateComponent) {
            throw new Error(`Email template "${template}" not found`)
        };


        const html = await render(createElement(TemplateComponent, data));

        return this.sendWithGmail({ to, subject, html });

    }

    private async sendWithGmail({ to, subject, html }: {
        to: string | string[];
        subject: string;
        html: string;
    }) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: getEnv.EMAIL_FROM,
                pass: getEnv.EMAIL_PASS
            },
        });

        await transporter.sendMail({
            from: `"AuraAi" <${getEnv.EMAIL_FROM}>`,
            to: Array.isArray(to) ? to.join(", ") : to,
            subject,
            html
        });


    }
}



export const emailService = new EmailService();



/**
 * --------- Email send using resend ---------------
 */


// import { Resend } from "resend";
// import { getEnv } from "../config/env.config";
// import { EmailTemplate, SendEmailOptions, TemplatePayloadMap } from "./email.types";
// import { templateRegistry } from "./templates";
// import React, { createElement } from "react";
// import AppError from "../utils/AppError";
// import { render } from "@react-email/render";



// type Transport = "resend" | "gmail";



// export class EmailService {

//     private resend: Resend;
//     private from: string;

//     constructor() {
//         this.resend = new Resend(getEnv.RESEND_API_KEY);
//         this.from = getEnv.EMAIL_FROM ?? 'noreply@gmail.com';
//     };


//     async send<T extends EmailTemplate>(options: SendEmailOptions<T>) {
//         const { to, subject, template, data } = options;

//         const TemplateComponent = templateRegistry[template] as React.ComponentType<TemplatePayloadMap[T]>;

//         if (!TemplateComponent) {
//             throw AppError.notFound(`Email template "${template}" not found in registry`)
//         }

//         const html = await render(createElement(TemplateComponent, data));

//         const { data: result, error } = await this.resend.emails.send({
//             from: this.from,
//             to: Array.isArray(to) ? to : [to],
//             subject,
//             html
//         });

//         if (error) {
//             throw AppError.badRequest(`Failed to send email: ${error.message}`)
//         }


//         return result;

//     }

// }


// export const emailService = new EmailService();