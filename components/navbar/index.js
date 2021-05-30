import styles from '../../styles/Navbar.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import { truncate } from '../../utils/Utils';

export default function Navbar(props) {
  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.Back}>
          <Link href="/">
            <a className={styles.Link} onClick={props.onClick}>
              <IoIosArrowBack />
            </a>
          </Link>
        </div>
        <h4 className="m-0 mx-auto p-0"> {truncate(props.title, 18)} </h4>
      </div>
    </>
  );
}
