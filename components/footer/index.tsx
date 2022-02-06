import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import { SiGithub } from 'react-icons/si';
import styles from '../../styles/Footer.module.scss';

export const Footer = () => {
  return (
    <>
      <Container className={styles.FooterWrapper}>
        <Row>
          <Col className="text-center">
            <Link href="https://github.com/bscodes/nextjs-react-tv-series">
              <a target="_blank" className={styles.Link}>
                <SiGithub className={styles.GithubIcon} />
              </a>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
