import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [responseValue, setResponseValue] = useState(null);
  const [query, setQuery] = useState(null);

  async function handleSubmit(text) {
    setLoading(true);
    const path =
      "https://app.staging.baseten.co/routes/7qQlodP/flantest?query=" + query;
    const response = await fetch(path, {
      method: "GET",
    });
    const data = await response.json();
    setResponseValue(data["output"]["flan_item"]);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>MATHLETE</title>
        <meta name="description" content="Fine-tuned Flan-T5 app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="flex gap-5 w-full">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a grade school math question"
            className="p-5 w-full"
          />

          <button onClick={handleSubmit} className="bg-blue-500 text-white p-5">
            Submit
          </button>
        </div>

        <div className="bg-white w-full p-5">
          <h2 className=" font-semibold">Answer</h2>
          {loading ? (
            <div>loading...</div>
          ) : responseValue ? (
            responseValue
          ) : (
            "..."
          )}
        </div>

        <div>
          <p className="text-sm text-gray-600">
            Powered by{" "}
            <a
              href="https://blueprint.baseten.co/"
              target="_blank"
              className="underline"
            >
              Blueprint
            </a>
            . Trained on the{" "}
            <a
              href="https://huggingface.co/datasets/gsm8k"
              target="_blank"
              className="underline"
            >
              GSM8K
            </a>{" "}
            data set.{" "}
            <a
              href="https://github.com/relph/flanqanda"
              target="_blank"
              className="underline"
            >
              GitHub repo
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
