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

function Disclaimer() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 tracking-wide mb-10">
        DISCLAIMER
      </h1>

      {/* Disclaimer */}
      <Section title="Disclaimer">
        <p>
          The World Leaders Consortium (WLC) is an independent, global platform
          committed to bringing together leaders, thinkers, policymakers,
          entrepreneurs, educators, and social change-makers from over 70+
          countries. We are a vision-driven, non-partisan initiative aimed at
          fostering constructive dialogue, building collaborative ecosystems,
          and catalyzing global impact through leadership exchange, innovation,
          diplomacy, and cultural understanding.
        </p>
        <p>
          At WLC, our mission is inspired by the United Nations Sustainable
          Development Goals (UN SDGs) and the broader international
          frameworks that emphasize peace, prosperity, sustainability,
          equality, and innovation for all. We actively support and promote
          the global agenda outlined by the UN, including the missions of its
          specialized agencies such as:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>UNESCO – for global education, culture, and heritage exchange</li>
          <li>UN Women – to promote gender equality and women's empowerment</li>
          <li>UNDP – to strengthen international cooperation on sustainable development</li>
          <li>WHO – for global health and pandemic preparedness</li>
          <li>World Bank – for economic development, inclusive finance, and global poverty reduction</li>
          <li>G20 &amp; G7 Dialogues – for economic growth, multilateral cooperation, and governance reforms</li>
          <li>Paris Climate Agreement – to fight climate change and promote environmental sustainability</li>
        </ul>
        <p>
          Our alignment with these global goals and frameworks is purely
          mission-driven and conceptual. WLC does not claim official
          endorsement or operational partnership with these organizations
          unless otherwise stated or documented through formal collaboration.
        </p>
      </Section>

      {/* Purpose of Visual & Institutional References */}
      <Section title="Purpose of Visual & Institutional References">
        <p>
          To reinforce our themes and agenda, we use public domain imagery,
          institutional references, and visuals of legislative chambers,
          diplomatic meetings, summits, and international forums – such as
          those from the UK Parliament, UN General Assembly, European
          Parliament, and other global events.
        </p>
        <p>
          These visuals are used only to reflect our thematic focus on
          diplomacy, governance, and international cooperation. Their
          inclusion serves as a visual metaphor to convey the essence of our
          mission: to unite diverse global voices under one platform for
          leadership and impact.
        </p>
        <p>
          WLC maintains full respect for the intellectual property, branding,
          and sovereign identity of these institutions. Any such references
          are included strictly for educational, illustrative, or
          representational purposes under fair use principles and do not
          imply any formal affiliation, endorsement, or representation unless
          explicitly documented.
        </p>
      </Section>

      {/* Nature of Our Work */}
      <Section title="Nature of Our Work">
        <p>
          WLC is managed by the Rumarix Consortium Foundation, (A non-profit
          organization). The Consortium serves as a neutral ground for idea
          exchange, international cooperation, and youth and women
          empowerment through the following key initiatives:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Global Summits &amp; Leadership Dialogues</li>
          <li>Youth and Women Leadership Fellowships</li>
          <li>UN SDG Global Series</li>
          <li>Innovation &amp; Entrepreneurship Council</li>
          <li>Climate Action &amp; SDG Alliance</li>
          <li>Education, Culture &amp; Digital Diplomacy Programs</li>
        </ul>
        <p>
          Through these programs, we build intergenerational and
          interdisciplinary platforms where voices from the Global South and
          Global North can come together, fostering mutual respect, policy
          innovation, and sustainable development.
        </p>
      </Section>

      {/* Partnership, Collaboration & Engagement */}
      <Section title="Partnership, Collaboration & Engagement">
        <p>
          WLC engages with government officials, diplomats, think tanks,
          academic institutions, industry leaders, civil society groups, and
          global youth. Many of our members and speakers are respected
          professionals, elected representatives, or diplomats. Their
          participation is based on personal/professional consent and aligns
          with our shared mission.
        </p>
        <p>
          Such collaborations are always transparently disclosed and should
          not be construed as institutional endorsements from any government,
          embassy, or multilateral agency—unless formally acknowledged in
          writing.
        </p>
        <p>
          WLC respects all national laws, diplomatic norms, and cultural
          contexts while designing its programs and communications.
        </p>
      </Section>

      {/* Integrity in Communication */}
      <Section title="Integrity in Communication">
        <p>
          We are committed to maintaining transparency, factual integrity,
          and ethical responsibility in all our content, including websites,
          newsletters, social media, knowledge products, and visual
          campaigns. Our media materials, including event coverage and
          promotional content, are curated with utmost sensitivity to
          cultural, diplomatic, and institutional contexts.
        </p>
        <p>
          WLC does not misrepresent any individual, institution, or
          government. In case of inadvertent error or concern, we welcome
          direct communication and offer prompt correction or clarification.
        </p>
      </Section>

      {/* Building a Global Commons for Leadership */}
      <Section title="Building a Global Commons for Leadership">
        <p>
          The World Leaders Consortium aspires to become a global commons
          where ideas, actions, and innovation converge for the betterment of
          humanity. We believe in:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Upholding democratic values, human rights, and global justice</li>
          <li>Strengthening international peace, economic equity, and climate action</li>
          <li>Enabling future leaders, especially youth and women, to take bold, ethical, and compassionate steps toward solving the world's greatest challenges</li>
        </ul>
        <p>
          We reiterate that WLC is an independent, non-governmental initiative
          operating in alignment with, but not under, the mandates of any
          international government or authority. Our use of imagery,
          references, or names is driven by editorial and mission-based
          storytelling to build engagement and awareness—not to claim
          legitimacy on behalf of any sovereign institution.
        </p>
      </Section>

      {/* Contact Us */}
      <Section title="Contact Us">
        <p>
          For clarification, partnership inquiries, media use permissions, or
          questions regarding our content:
        </p>
        <p className="space-y-1">
          <span className="block font-semibold text-gray-800">
            World Leaders Consortium Secretariat
          </span>
          <span className="block">
            Email:{' '}
            <a
              href="mailto:info@worldleadersconsortium.com"
              className="text-blue-600 underline"
            >
              info@worldleadersconsortium.com
            </a>
          </span>
          <span className="block">Phone: +44 7436 387718</span>
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
        <p>
          We appreciate your trust, collaboration, and engagement as we
          continue building an inclusive global leadership ecosystem—one
          dialogue at a time.
        </p>
      </Section>
    </div>
  )
}

export default Disclaimer