export default function Page() {
  return (
    <main>
      <article className="prose prose-neutral max-w-none">
        <h1>Privacy Policy</h1>
        <p>
          <strong>Last updated:</strong> 20 August 2026
        </p>

        <p>
          This Privacy Policy explains how Spendie (`Spendie`, `we`, `us`, or
          `our`) collects, uses, stores, and protects personal information when
          you use the Spendie website and application.
        </p>

        <p>
          Spendie is operated by <strong>[YOUR FULL LEGAL NAME]</strong>, an
          individual based in the United Kingdom.
        </p>

        <h2>1. Who is responsible for your data?</h2>
        <p>
          For the purposes of applicable UK data protection law, including the
          UK GDPR and Data Protection Act 2018, the operator of Spendie is the
          data controller for the personal information described in this Privacy
          Policy.
        </p>
        <p>
          <strong>Contact:</strong> [CONTACT EMAIL]
        </p>

        <h2>2. Information we collect</h2>
        <h3>2.1 Account information</h3>
        <ul>
          <li>Your email address.</li>
          <li>Your name, if provided.</li>
          <li>Authentication information associated with your account.</li>
          <li>Your Spendie account preferences and settings.</li>
        </ul>

        <h3>2.2 Financial information</h3>
        <p>
          If you connect a financial institution, Spendie may receive financial
          information through Plaid, including account information, balances,
          transactions, merchants, descriptions, dates, amounts, and categories,
          depending on the permissions you grant.
        </p>

        <h3>2.3 Connection credentials and tokens</h3>
        <p>
          Spendie stores Plaid access tokens in its backend infrastructure.
          These tokens are used solely to maintain authorised connections to the
          financial accounts you have connected and to retrieve the financial
          information necessary to provide Spendie`s features. Plaid access
          tokens are treated as sensitive credentials and are not intended to be
          accessible through Spendie`s client-side application.
        </p>

        <h3>2.4 Technical and usage information</h3>
        <p>
          We may collect technical information required to operate and secure
          Spendie, such as browser and device information, IP address,
          timestamps, diagnostic information, and application logs.
        </p>

        <h3>2.5 Analytics</h3>
        <p>
          Spendie may use analytics services such as Vercel Analytics or Google
          Analytics to understand usage and improve the Service. If a
          non-essential analytics technology requires consent under applicable
          law, we will provide the appropriate notice and consent mechanism.
        </p>

        <h2>3. Where we obtain information</h2>
        <p>
          We obtain information directly from you, from your use of Spendie,
          and, where you connect a financial institution, from financial data
          providers such as Plaid acting within the permissions you grant.
        </p>

        <h2>4. How we use your information</h2>
        <ul>
          <li>Create and maintain your account.</li>
          <li>Authenticate you and keep your account secure.</li>
          <li>Connect and synchronise financial accounts.</li>
          <li>
            Display balances, transactions, recurring payments, and related
            data.
          </li>
          <li>Provide and maintain Spendie`s features.</li>
          <li>Diagnose errors, prevent abuse, and improve reliability.</li>
          <li>
            Communicate with you about your account or important Service
            changes.
          </li>
          <li>Comply with legal obligations and protect our legal rights.</li>
        </ul>

        <p>
          We do not sell your personal information or use your financial
          transaction data for personalised advertising.
        </p>

        <h2>5. Lawful bases for processing</h2>
        <ul>
          <li>
            <strong>Contract:</strong> where processing is necessary to provide
            Spendie.
          </li>
          <li>
            <strong>Legitimate interests:</strong> for security, fraud
            prevention, service improvement, troubleshooting, and administration
            where our interests are not overridden by your rights.
          </li>
          <li>
            <strong>Consent:</strong> where applicable, including processing
            that requires consent.
          </li>
          <li>
            <strong>Legal obligation:</strong> where processing is necessary to
            comply with law.
          </li>
        </ul>

        <h2>6. Plaid</h2>
        <p>
          Spendie uses Plaid to connect supported financial institutions and
          retrieve financial information that you authorise us to access.
        </p>
        <p>
          When you use the Plaid connection flow, information may be exchanged
          between you, your financial institution, Plaid, and Spendie as
          necessary to establish and maintain the connection and provide the
          requested functionality.
        </p>
        <p>
          Your use of Plaid may also be subject to Plaid`s own privacy notices
          and terms.
        </p>

        <h2>7. Service providers</h2>
        <ul>
          <li>
            <strong>Supabase</strong> — authentication, database, and related
            infrastructure.
          </li>
          <li>
            <strong>Vercel</strong> — application hosting and deployment
            infrastructure.
          </li>
          <li>
            <strong>Plaid</strong> — financial account connection and
            aggregation.
          </li>
        </ul>

        <h2>8. International transfers</h2>
        <p>
          Some service providers may process information outside the United
          Kingdom. Where personal information is transferred internationally, we
          will use appropriate safeguards required by applicable law.
        </p>

        <h2>9. How long we keep information</h2>
        <p>
          We keep personal information only for as long as reasonably necessary
          for the purposes described in this Privacy Policy, including while
          your account remains active.
        </p>
        <p>
          When you delete your account, we will generally delete or anonymise
          personal information associated with it within a reasonable period,
          unless retention is necessary for legal, dispute-resolution, security,
          fraud-prevention, or other legitimate purposes.
        </p>

        <h2>10. Security</h2>
        <p>
          We use reasonable technical and organisational measures designed to
          protect personal information against unauthorised access, loss,
          misuse, alteration, or disclosure. No internet transmission or storage
          system can be guaranteed completely secure.
        </p>

        <h2>11. Your rights</h2>
        <p>Subject to applicable law, you may have the right to:</p>
        <ul>
          <li>Request access to your personal information.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion.</li>
          <li>Request restriction of processing.</li>
          <li>Object to certain processing.</li>
          <li>Request portability of certain information.</li>
          <li>Withdraw consent where processing is based on consent.</li>
        </ul>
        <p>
          To exercise a right, contact <strong>[CONTACT EMAIL]</strong>. We may
          need to verify your identity before completing a request.
        </p>

        <h2>12. Complaints</h2>
        <p>
          Please contact us first if you have concerns about how we process your
          information. You also have the right to complain to the UK`s
          Information Commissioner`s Office (ICO).
        </p>

        <h2>13. Children`s privacy</h2>
        <p>
          Spendie is intended for adults and is not directed at children. We do
          not knowingly collect personal information from children who are not
          legally permitted to use the Service.
        </p>

        <h2>14. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated
          version will be published on this page with a revised date. If a
          change materially affects how we process personal information, we will
          provide additional notice where required.
        </p>

        <h2>15. Contact</h2>
        <p>
          <strong>Spendie operator:</strong> [YOUR FULL LEGAL NAME]
          <br />
          <strong>Email:</strong> [CONTACT EMAIL]
          <br />
          <strong>Website:</strong> [SPENDIE DOMAIN]
        </p>
      </article>
    </main>
  );
}
