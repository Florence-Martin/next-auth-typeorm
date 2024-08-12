import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // L'email de votre compte Gmail
    pass: process.env.EMAIL_PASSWORD, // Le mot de passe de votre compte Gmail ou un mot de passe d'application
  },
});

export async function sendResetEmail(to: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER, // Votre email
    to, // L'email du destinataire
    subject: "Réinitialisation de votre mot de passe",
    text: `Vous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien suivant pour définir un nouveau mot de passe : ${resetLink}`,
    html: `<p>Vous avez demandé à réinitialiser votre mot de passe.</p>
           <p><a href="${resetLink}">Cliquez ici pour définir un nouveau mot de passe</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de réinitialisation envoyé");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw new Error("Erreur lors de l'envoi de l'email");
  }
}
