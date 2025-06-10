import Head from "next/head"
import Layout, { siteTitle } from "../components/layout"
import utilStyles from "../styles/utils.module.css"
import Link from "next/link"
import { getSortedPostsData } from "../lib/posts"
import Date from "../components/date"

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  console.log("allPostsData: ", allPostsData)
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <script type="rocketlazyloadscript">
            const domainKey = '684805421c395d186d31a621';
            const proApiUrl = 'https://proapi.qa.experience.com';
            
function getSessionCookie(name) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|;)\s*${name}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}
function generateSessionId() {
  const randomString =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now().toString(36);
  return randomString + timestamp;
}
function getSessionId()  {
  let sessionId = getSessionCookie("ExpSessionId");
  if (!sessionId) {
    sessionId = generateSessionId();
    document.cookie = `ExpSessionId=${sessionId}; path=/;
SameSite=Lax; Secure`;
  }
  return sessionId;
}

async function fetchPixel() {
  try {
    const params = new URLSearchParams({
      domain: domainKey,
      ownerType: "agent",
      type: "other",
      requestPageUrl: encodeURIComponent(window.location.href),
      userSessionId: getSessionId(),
      cookieConsent: true,
    });
    const response = await fetch(
     `${proApiUrl}/api/pixel/v1/domain/pixel?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.url) {
      return data.url;
    } else {
      console.error("Pixel URL not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching pixel:", error);
    return null;
  }
}
function attachPixel(pixelUrl) {
  if (window.ExpDataCollector && typeof window.ExpDataCollector === "object") {
    delete window.ExpDataCollector;
  }
  const script = document.createElement("script");
  script.src = pixelUrl;
  script.async = true;
  script.onload = () => console.log("ExpDataCollector loaded");
  script.onerror = () => console.error("Failed to load ExpDataCollector");
  document.body.appendChild(script);
}
async function loadPixel() {
  const pixelUrl = await fetchPixel();
  if (pixelUrl) {
    attachPixel(pixelUrl);
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadPixel);
} else {
  loadPixel();
}
</script>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I'm Prem Kumar , React Developer in Experience.com</p>
        <h1>
          Read{" "}
          <Link href="/posts/first-post" prefetch={true}>
            <a>this page!</a>
          </Link>
        </h1>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
