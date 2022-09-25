import Navbar from "../components/Navbar"
import HeadComponent from "../components/HeadComponent"
import NextNProgress from "nextjs-progressbar";
// style
import '../styles/general.scss'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <NextNProgress
        color="#fb8500"
        height={5}
        showOnShallow={true} />
      <HeadComponent />
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
