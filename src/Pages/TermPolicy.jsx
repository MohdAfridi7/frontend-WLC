import React from 'react'

const Section = ({ title, children }) => (
  <div className="mb-10">
    {title && (
      <h2 className="text-lg font-semibold text-blue-700 mb-3">{title}</h2>
    )}
    <div className="space-y-4 text-sm leading-relaxed text-gray-700">
      {children}
    </div>
    <div className="mt-8 border-t border-gray-200" />
  </div>
)

const SubHeading = ({ children }) => (
  <h3 className="text-base font-semibold text-blue-600 mt-4 mb-2">
    {children}
  </h3>
)

function TermPolicy() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-wide mb-10">
        WORLD LEADERS CONSORTIUM - TERMS &amp; POLICY
      </h1>

      {/* 1. Introduction */}
      <Section title="1. Introduction">
        <p>
          Welcome to the World Leaders Consortium (WLC) – a global initiative
          uniting leaders from politics, business, academia, sports, arts,
          activism, and innovation to foster collaborative leadership for a
          better future. By engaging with WLC in any capacity (membership,
          partnership, participation, or contribution), you agree to comply
          with and be bound by the following Terms &amp; Policy.
        </p>
      </Section>

      {/* 2. Membership & Participation */}
      <Section title="2. Membership & Participation">
        <SubHeading>2.1 Eligibility</SubHeading>
        <p>
          WLC is open to leaders, professionals, and visionaries who align
          with our mission. Participation is by invitation, nomination, or
          successful application.
        </p>

        <SubHeading>2.2 Code of Conduct</SubHeading>
        <p>All participants must adhere to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Respectful, inclusive, and non-discriminatory behavior.</li>
          <li>Intellectual honesty and acknowledgment of sources.</li>
          <li>Compliance with all applicable local and international laws.</li>
        </ul>

        <SubHeading>2.3 Termination of Membership</SubHeading>
        <p>WLC reserves the right to suspend or revoke participation in case of:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Violation of these terms.</li>
          <li>Misuse of the platform or community.</li>
          <li>Engagement in unethical or illegal activities.</li>
        </ul>
      </Section>

      {/* 3. Content & Intellectual Property */}
      <Section title="3. Content & Intellectual Property">
        <SubHeading>3.1 Ownership</SubHeading>
        <p>
          All original content created by WLC is owned by the organization.
          Members retain ownership of their individual contributions but
          grant WLC the non-exclusive right to use, reproduce, and distribute
          it (with proper attribution) for consortium purposes.
        </p>

        <SubHeading>3.2 Use of Logo/Brand</SubHeading>
        <p>
          Members and partners may only use the WLC name and logo with prior
          written consent and in accordance with brand guidelines.
        </p>
      </Section>

      {/* 4. Privacy & Data Use */}
      <Section title="4. Privacy & Data Use">
        <SubHeading>4.1 Data Collection</SubHeading>
        <p>We collect necessary information (name, professional details, country, etc.) to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Facilitate networking and collaboration.</li>
          <li>Curate events, forums, and publications.</li>
        </ul>

        <SubHeading>4.2 Data Protection</SubHeading>
        <ul className="list-disc pl-6 space-y-1">
          <li>Data is stored securely and will not be sold or shared with third parties without consent.</li>
          <li>Participants may request access to, modification of, or deletion of their data.</li>
        </ul>
      </Section>

      {/* 5. Events, Forums & Publications */}
      <Section title="5. Events, Forums & Publications">
        <SubHeading>5.1 Recordings & Media</SubHeading>
        <p>
          WLC reserves the right to record events and use footage or
          photographs in publications, promotional materials, and online
          platforms. Consent is considered granted upon participation unless
          otherwise specified.
        </p>

        <SubHeading>5.2 Code for Public Discourse</SubHeading>
        <p>
          All panel discussions, speeches, and shared content must maintain
          a respectful tone and must not incite hate, violence, or
          misinformation.
        </p>
      </Section>

      {/* 6. Liability & Disclaimers */}
      <Section title="6. Liability & Disclaimers">
        <ul className="list-disc pl-6 space-y-1">
          <li>WLC is not responsible for views expressed by individual participants.</li>
          <li>
            Participation in WLC events is at your own risk. We are not
            liable for any direct or indirect loss or damage resulting from
            involvement.
          </li>
          <li>
            All content is for informational and collaborative purposes and
            should not be construed as legal, political, or financial advice.
          </li>
        </ul>
      </Section>

      {/* 7. Amendments */}
      <Section title="7. Amendments">
        <p>
          WLC may update these Terms &amp; Policy at any time. Continued
          participation implies acceptance of the latest version. Members
          will be notified of significant changes via email or consortium
          communication channels.
        </p>
      </Section>

      {/* 8. Contact Us */}
      <Section title="8. Contact Us">
        <p>For queries, grievances, or suggestions, contact:</p>
        <p className="space-y-1">
          <span className="block">
            Email:{' '}
            <a
              href="mailto:info@worldleadersconsortium.com"
              className="text-blue-600 underline"
            >
              info@worldleadersconsortium.com
            </a>
          </span>
          <span className="block">
            Website:{' '}
            <a
              href="https://www.worldleadersconsortium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              www.worldleadersconsortium.com
            </a>
          </span>
        </p>
      </Section>
    </div>
  )
}

export default TermPolicy