import { Report, Support, WorkOrder } from "./types/database";

// all emails and email functions
const nodemailer = require("nodemailer");

const user = "leakloggerreporting@gmail.com";
const pass = "gtms lpgy wtbv elqb";

export async function emailReport(report: Report) {
  if (report.is_anonymous === false) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: pass,
        },
      });

      await transporter.sendMail({
        from: '"LeakLogger" <leakloggerreporting@gmail.com>',
        to: `${report.email}`,
        subject: "Thank you for your report!",
        html: `
<body style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 20px; color: #333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <tr style="background-color: #0077cc; color: #ffffff;">
      <td style="padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Thank You for your report</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="font-size: 16px;">Thank you for submitting a report about a potential water leak. We appreciate your help in keeping the community safe and informed. Below are the details of your report:</p>
        
        <h2 style="font-size: 18px; color: #0077cc; margin-top: 24px;">Report Summary</h2>
        <table cellpadding="6" cellspacing="0" border="0" style="font-size: 15px;">
          <tr>
            <td><strong>Description:</strong></td>
            <td>${report.description}</td>
          </tr>
          <tr>
            <td><strong>Location:</strong></td>
            <td>${report.street}, ${report.city}, ${report.zip}, ${
          report.country
        }</td>
          </tr>
          <tr>
            <td><strong>Report ID:</strong></td>
            <td>${report.id}</td>
          </tr>
          <tr>
            <td><strong>Reported At:</strong></td>
            <td>${new Date(report.created_at).toLocaleString()}</td>
          </tr>
          <tr>
            <td><strong>Private Property:</strong></td>
            <td>${report.is_private ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Anonymous:</strong></td>
            <td>${report.is_anonymous ? "Yes" : "No"}</td>
          </tr>
        </table>

        ${
          report.image_urls && report.image_urls.length > 0
            ? `
          <h2 style="font-size: 18px; color: #0077cc; margin-top: 24px;">Attached Image${
            report.image_urls.length > 1 ? "s" : ""
          }</h2>
          ${report.image_urls.map(
            (url) => `
            <img src="${url}" alt="image" style="max-width: 100%; margin-bottom: 10px; border-radius: 4px; border: 1px solid #ccc;" />
          `
          )}
        `
            : ""
        }

        <p style="font-size: 16px; margin-top: 24px;">We’ll review your report as soon as possible and take necessary action.</p>

        <p style="font-size: 14px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
      </td>
    </tr>
    <tr style="background-color: #f0f0f0;">
      <td style="padding: 20px; text-align: center; font-size: 14px; color: #666;">
        &copy; ${new Date().getFullYear()} LeakLogger. All rights reserved.
      </td>
    </tr>
    <tr style="background-color: #f0f0f0;">
      <td style="padding: 20px; text-align: center; font-size: 14px; color: #666;">
            <img
              src="https://synoptic.uncommmon.dev/leakloggerlogo.png"
              alt="Logo"
              style="max-width: 60px; max-hight: 40px"
            />
      </td>
    </tr>
  </table>
</body>
`,
      });
    } catch (error) {
      console.log("error with mailer: \n" + error);
    }
  } else return;
}

export async function emailReportOnStatusChange(
  report: Report,
  work_order: WorkOrder
) {
  if (report.is_anonymous === false) {
    let status_body;

    switch (work_order.status) {
      case "pending":
        status_body =
          "the status of your report has been reverted to pending, this means the job has been delayed due needed parts or is more complex then first expected.";
        break;
      case "in_progress":
        status_body =
          "the status has been changes to IN PROGRESS this means someone will be out today to take a look and mend the issue.";
        break;
      case "complete":
        status_body =
          "the status has been changed to Complete this means the job was completed and all is well if there where any issues please subbmit a support issue on out site";
        break;
      case "cancelled":
        status_body =
          "the status was changed to CANCELLED this means the job was not needing a repair, if you beleive we are wrong contact support on our site";
        break;
    }
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: pass,
        },
      });

      await transporter.sendMail({
        from: '"LeakLogger" <leakloggerreporting@gmail.com>',
        to: `${report.email}`,
        subject: "There's an update with your report!",
        html: `
<body style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 20px; color: #333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <tr style="background-color: #0077cc; color: #ffffff;">
      <td style="padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Status Update</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="font-size: 16px;">${status_body} \n\n Below are the details of your report:</p>
        
        <h2 style="font-size: 18px; color: #0077cc; margin-top: 24px;">Report Summary</h2>
        <table cellpadding="6" cellspacing="0" border="0" style="font-size: 15px;">
          <tr>
            <td><strong>Description:</strong></td>
            <td>${report.description}</td>
          </tr>
          <tr>
            <td><strong>Location:</strong></td>
            <td>${report.street}, ${report.city}, ${report.zip}, ${
          report.country
        }</td>
          </tr>
          <tr>
            <td><strong>Status:</strong></td>
            <td>${work_order.status.replace("_", " ").toUpperCase()}</td>
          </tr>
          <tr>
            <td><strong>Report ID:</strong></td>
            <td>${report.id}</td>
          </tr>
          <tr>
            <td><strong>Reported At:</strong></td>
            <td>${new Date(report.created_at).toLocaleString()}</td>
          </tr>
          <tr>
            <td><strong>Private Property:</strong></td>
            <td>${report.is_private ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Anonymous:</strong></td>
            <td>${report.is_anonymous ? "Yes" : "No"}</td>
          </tr>
        </table>

        ${
          report.image_urls && report.image_urls.length > 0
            ? `
          <h2 style="font-size: 18px; color: #0077cc; margin-top: 24px;">Attached Image${
            report.image_urls.length > 1 ? "s" : ""
          }</h2>
          ${report.image_urls.map(
            (url) => `
            <img src="${url}" alt="image" style="max-width: 100%; margin-bottom: 10px; border-radius: 4px; border: 1px solid #ccc;" />
          `
          )}
        `
            : ""
        }

        <p style="font-size: 14px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
      </td>
    </tr>
    <tr style="background-color: #f0f0f0;">
      <td style="padding: 20px; text-align: center; font-size: 14px; color: #666;">
        &copy; ${new Date().getFullYear()} LeakLogger. All rights reserved.
      </td>
    </tr>
    <tr style="background-color: #f0f0f0;">
      <td style="padding: 20px; text-align: center; font-size: 14px; color: #666;">
            <img
              src="https://synoptic.uncommmon.dev/leakloggerlogo.png"
              alt="Logo"
              style="max-width: 60px; max-hight: 40px"
            />
      </td>
    </tr>
  </table>
</body>
        `,
      });
    } catch (error) {
      console.log("error with mailer: \n" + error);
    }
  } else return;
}

export async function emailOnSuport(support: Support) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });

    await transporter.sendMail({
      from: '"LeakLogger" <leakloggerreporting@gmail.com>',
      to: `${support.email}`,
      subject: "Thank you for contacting us!",
      html: `
<body style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 20px; color: #333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <tr style="background-color: #0077cc; color: #ffffff;">
      <td style="padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Thank you for Contacting Support</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="font-size: 16px;">a member of the team will reply to this email thread shortly to assist you \n\nBelow are the details of your support claim:</p>
        <h2 style="font-size: 18px; color: #0077cc; margin-top: 24px;">Support Claim Summary</h2>
        <table cellpadding="6" cellspacing="0" border="0" style="font-size: 15px;">
          <tr>
            <td><strong>Title:</strong></td>
            <td>${support.title}</td>
          </tr>
          <tr>
            <td><strong>Description:</strong></td>
            <td>${support.description}</td>
          </tr>
          <tr>
            <td><strong>ID:</strong></td>
            <td>${support.id}</td>
          </tr>
        </table>
        <p style="font-size: 16px; margin-top: 24px;">We’ll review your claims as soon as possible and take necessary action.</p>
      </td>
    </tr>
    <tr style="background-color: #f0f0f0;">
      <td style="padding: 20px; text-align: center; font-size: 14px; color: #666;">
        &copy; ${new Date().getFullYear()} LeakLogger. All rights reserved.
      </td>
    </tr>
    <tr style="background-color: #f0f0f0;">
      <td style="padding: 20px; text-align: center; font-size: 14px; color: #666;">
            <img
              src="https://synoptic.uncommmon.dev/leakloggerlogo.png"
              alt="Logo"
              style="max-width: 60px; max-hight: 40px"
            />
      </td>
    </tr>
  </table>
</body>
      `,
    });
  } catch (error) {
    console.log("error with mailer: \n" + error);
  }
}
