import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeProps {
  username: string;
  loginUrl: string;
}

export default function WelcomeEmail({
  username,
  loginUrl = "https://yourapp.com/dashboard",
}: WelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to YourApp! We're excited to have you here.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header/Logo */}
          <Section style={headerSection}>
            <Text style={logo}>YOURAPP</Text>
          </Section>

          {/* Hero Content */}
          <Heading style={h1}>Welcome, {username}!</Heading>
          
          <Text style={text}>
            We're thrilled to have you join our community. YourApp is built to help you 
            streamline your workflow and achieve your goals faster.
          </Text>

          <Text style={text}>
            To get started, we recommend setting up your profile and exploring your 
            new dashboard.
          </Text>

          {/* Main CTA */}
          <Section style={btnContainer}>
            <Button style={button} href={loginUrl}>
              Get Started Now
            </Button>
          </Section>

          <Hr style={hr} />

          {/* Features / Next Steps */}
          <Section>
            <Text style={subheading}>What's next?</Text>
            <ul style={list}>
              <li style={listItem}>🚢 <strong>Launch your first project:</strong> Use our templates to go live in minutes.</li>
              <li style={listItem}>📚 <strong>Check the docs:</strong> Find answers to all your technical questions.</li>
              <li style={listItem}>💬 <strong>Join the community:</strong> Connect with other users in our Discord.</li>
            </ul>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              Need help? Reply to this email or contact us at support@yourapp.com
            </Text>
            <Text style={footer}>
              © 2024 YourApp Inc. | 123 Tech Lane, San Francisco, CA 94107
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
  padding: "48px 24px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  maxWidth: "560px", // Slightly wider for welcome emails
};

const headerSection = {
  paddingBottom: "24px",
};

const logo = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#4f46e5",
  margin: "0",
  textAlign: "center" as const,
};

const h1 = {
  color: "#111827",
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "24px 0",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#4f46e5",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
};

const subheading = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#111827",
};

const list = {
  paddingLeft: "20px",
  color: "#4b5563",
};

const listItem = {
  fontSize: "15px",
  lineHeight: "24px",
  marginBottom: "12px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  color: "#9ca3af",
  fontSize: "13px",
  lineHeight: "20px",
  textAlign: "center" as const,
};