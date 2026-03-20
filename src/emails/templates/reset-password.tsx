import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetProps {
  username: string;
  resetLink: string;
}

export default function PasswordResetEmail({
  username,
  resetLink = "https://yourapp.com/reset-password",
}: PasswordResetProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your YourApp password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Text style={logo}>YOURAPP</Text>
          </Section>

          <Heading style={h1}>Password Reset Request</Heading>
          
          <Text style={text}>
            Hi <strong>{username}</strong>,
          </Text>
          
          <Text style={text}>
            We received a request to reset the password for your account. 
            Click the button below to choose a new one. This link will expire in 1 hour.
          </Text>

          {/* Primary Action */}
          <Section style={btnContainer}>
            <Button style={button} href={resetLink}>
              Reset Password
            </Button>
          </Section>

          <Text style={cautionText}>
            For security: If you didn't request this, please ignore this email or 
            contact support if you have concerns. Your password will not change 
            until you access the link above and create a new one.
          </Text>

          <Hr style={hr} />

          {/* Fallback Link for picky email clients */}
          <Section>
            <Text style={footerText}>
              If the button above doesn't work, copy and paste this URL into your browser:
            </Text>
            <Link href={resetLink} style={link}>
              {resetLink}
            </Link>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              Sent by YourApp Security Team <br />
              123 Tech Lane, San Francisco, CA 94107
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// --- Styles ---

const main = {
  backgroundColor: "#f9fafb",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "40px auto",
  padding: "48px 32px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  maxWidth: "520px",
};

const headerSection = {
  marginBottom: "32px",
};

const logo = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#111827",
  margin: "0",
};

const h1 = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "32px",
  margin: "0 0 24px",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "24px",
};

const btnContainer = {
  margin: "32px 0",
};

const button = {
  backgroundColor: "#111827", // Darker color for "Security" feel
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 0",
};

const cautionText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "22px",
  fontStyle: "italic",
};

const hr = {
  borderColor: "#f3f4f6",
  margin: "32px 0",
};

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
  marginBottom: "8px",
};

const link = {
  color: "#4f46e5",
  fontSize: "12px",
  wordBreak: "break-all" as const,
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "18px",
};