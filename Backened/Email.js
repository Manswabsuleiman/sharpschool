const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
require("dotenv").config();

const sendEmail = async (req, res) => {
  const { childName, dob, gender, class: grade, parentName, parentID, email, phone, address } = req.body;

  if (!childName || !dob || !gender || !grade || !parentName || !parentID || !email || !phone || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Generate PDF in memory
    const doc = new PDFDocument();
    const buffers = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      // Create transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"SharpMind School" <${process.env.EMAIL_USER}>`,
        to: email,                   // Parent
        cc: process.env.ADMIN_EMAIL, // Admin
        subject: "SharpMind School Admission Form Submission",
        html: `
          <h3>Hello ${parentName},</h3>
          <p>Thank you for submitting the admission form for <strong>${childName}</strong>.</p>
          <p>Please find attached a PDF copy of your submission.</p>
          <p>We will contact you shortly regarding admission.</p>
        `,
        attachments: [
          {
            filename: `${childName}_AdmissionForm.pdf`,
            content: pdfBuffer,
          },
        ],
        replyTo: email,
      };

      const info = await transporter.sendMail(mailOptions);

      res.status(200).json({
        success: "Email sent successfully with PDF",
        emailSent: { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject },
        smtpResponse: info.response,
      });
    });

    // PDF content
    doc.fontSize(18).text("SharpMind School Admission Form", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Child Name: ${childName}`);
    doc.text(`Date of Birth: ${dob}`);
    doc.text(`Gender: ${gender}`);
    doc.text(`Class / Grade: ${grade}`);
    doc.moveDown();
    doc.text(`Parent / Guardian Name: ${parentName}`);
    doc.text(`Parent ID / Passport Number: ${parentID}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phone}`);
    doc.text(`Address: ${address}`);
    doc.end();

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Email sending failed", details: error.message });
  }
};

module.exports = sendEmail;
