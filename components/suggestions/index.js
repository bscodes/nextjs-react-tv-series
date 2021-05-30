import Link from 'next/link';
import styles from '../../styles/Suggestions.module.scss';
import * as Helpers from '../../utils/Utils';
export default function Suggestions(props) {
  return (
    <>
      <div className={styles.SuggestionWrapper}>
        {props.suggestions.map((item) => (
          <>
            <Link
              key={Helpers.generateKey(new Date().getTime())}
              href={{
                pathname: '/movie',
                query: { filmId: `${item.show.id}` },
              }}
            >
              <a>
                <h5>{item.show.name} </h5>
              </a>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}
