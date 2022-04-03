import Link from "next/link"

export default function Custom404() {
  return (
    <div>
      <h1>Page not found - Try other pages</h1>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </div>
  )
}
