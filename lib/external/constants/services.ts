import { readFileSync } from "fs";

const mailing = {
    emailTemplate: (email: string) => ({
        to: email,
        from: process.env.OFFICIAL_EMAIL,
        subject: "Resetting Password Request",
        text: `We've sent an email with a password-reset link to ${email}. Please check your inbox or spam messages`,
        html: () => {
            try {
                const HTMLString = readFileSync(
                    "public/templates/users/passwordResetLink/index.html",
                    "utf-8"
                );
                const newHTML = HTMLString.replace(
                    "[DOMAIN_PLACEHOLDER]",
                    `${process.env.BACKEND_URL}`
                );
                return newHTML;
            } catch (err) {
                console.error("Error reading the HTML file:", err);
                return "";
            }
        },
    }),
};

export { mailing };
