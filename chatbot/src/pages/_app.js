import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <div className="bg-white"><Component {...pageProps} /></div>
}
