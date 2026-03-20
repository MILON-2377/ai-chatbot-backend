import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Hr,
  Img,
} from "@react-email/components";

interface Props {
  otp: string;
  username: string;
  expiresInMinutes: number;
}

export default function VerifyOtpEmail({
  otp,
  username,
  expiresInMinutes,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your verification code: {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo or App Name */}
          <Section style={{ paddingBottom: "20px" }}>
            <Text style={logo}>AuraAi</Text>
          </Section>

          <Heading style={h1}>Verify your email</Heading>
          
          <Text style={text}>
            Hi <strong>{username}</strong>,
          </Text>
          
          <Text style={text}>
            Enter the following verification code to secure your account. 
            This code is valid for <strong>{expiresInMinutes} minutes</strong>.
          </Text>

          {/* OTP Box */}
          <Section style={codeBox}>
            <Text style={otpText}>{otp}</Text>
          </Section>

          <Text style={cautionText}>
            If you didn't request this code, you can safely ignore this email.
          </Text>

          <Hr style={hr} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              Sent by YourApp Inc. <br />
              123 Tech Lane, San Francisco, CA 94107
            </Text>
            <Link href="https://yourapp.com" style={footerLink}>
              Visit our website
            </Link>
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
  padding: "48px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  maxWidth: "480px",
};

const logo = {
  fontSize: "18px",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  color: "#4f46e5", 
  margin: "0",
};

const h1 = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "32px",
  margin: "16px 0",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const codeBox = {
  background: "#f3f4f6",
  borderRadius: "8px",
  margin: "32px 0",
  padding: "20px",
  textAlign: "center" as const,
  border: "1px solid #e5e7eb",
};

const otpText = {
  fontSize: "40px",
  fontFamily: 'monospace', // Monospace helps distinguish characters like '0' and 'O'
  fontWeight: "700",
  letterSpacing: "10px",
  color: "#111827",
  margin: "0",
};

const cautionText = {
  color: "#9ca3af",
  fontSize: "14px",
  lineHeight: "22px",
  marginTop: "24px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "16px",
  marginBottom: "10px",
};

const footerLink = {
  color: "#4f46e5",
  fontSize: "12px",
  textDecoration: "underline",
};