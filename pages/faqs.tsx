import { Section, Container } from "@/components/craft";
import { google } from "googleapis"
import Head from "next/head";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type Faq = {
  question: string;
  answer: string;
};

export default function Page({ faqs }: { faqs: Faq[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <Section>
      <Head>
        <title>যত প্রশ্ন | ষোলো</title>
        <link rel="canonical" href="https://www.sholo.org/faqs" />
      </Head>
      <Container>
        <h2>যত প্রশ্ন</h2>
        <div className="grid">
          {faqs.map((faq: any, idx: number) => (
            <Disclosure key={faq.question}>
              {({ open, close }) => (
              <div className="mb-2 border rounded">
                <DisclosureButton
                  className="flex justify-between w-full px-4 py-2 text-left focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                  onClick={() => {
                    close();
                    setOpenIdx(open && idx === openIdx ? null : idx)
                  }}
                >
                  <span>{faq.question}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${idx == openIdx ? "rotate-180" : ""}`}
                  />
                </DisclosureButton>
                {open && idx === openIdx && <DisclosurePanel className="px-4 pb-4 pt-2 text-neutral-700">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </DisclosurePanel>}
              </div>
              )}
            </Disclosure>
          ))}
        </div>
      </Container>
    </Section>
  );
}



export async function getStaticProps() {
  const sheetId = process.env.GOOGLE_SHEETS_ID
  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS_JSON

  if (!sheetId) {
    throw new Error("GOOGLE_SHEETS_ID env variable not set")
  }
  if (!credentialsJson) {
    throw new Error("GOOGLE_SHEETS_CREDENTIALS_JSON env variable not set")
  }

  // Parse credentials from env variable
  const credentials = JSON.parse(credentialsJson)

  // Authenticate
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })
  const sheets = google.sheets({ version: "v4", auth })

  // Read data
  const range = "FAQ!A2:F"
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  })

  // Map rows to your type
  const rows = response.data.values || []
  const faqs = rows.map((row, idx) => ({
    question: row[0],
    answer: row[1] || "",
  }))

  return {
    props: {
      faqs,
    },
    revalidate: 3600,
  }
}
