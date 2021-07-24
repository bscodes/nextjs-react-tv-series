import { AppWrapper } from '../context/state';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import { Footer } from '../components/footer';

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
      <Footer />
    </AppWrapper>
  );
}

export default MyApp;
