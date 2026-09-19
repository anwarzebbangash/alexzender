// src/app/privacy/page.tsx
export const metadata = {
  title: "Privacy Policy - AnwarByte",
  description: "Privacy Policy for AnwarByte technical blog.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: August 26, 2026</p>

      <p>
        At <strong>AnwarByte</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by AnwarByte and how we use it.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you visit AnwarByte, we may collect standard information such as your IP address, browser type, Internet Service Provider (ISP), date and time stamp, and referring/exit pages. This information is used for analyzing trends, administering the site, and tracking users&apos; movement around the website.
      </p>

      <h2>Google AdSense & Cookies</h2>
      <p>
        Google, as a third-party vendor, uses cookies to serve ads on AnwarByte. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
      </p>
      <p>
        Users may opt out of personalized advertising by visiting Ads Settings.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us through our Contact page.
      </p>
    </main>
  );
}