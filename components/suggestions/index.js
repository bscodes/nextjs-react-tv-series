import Link from 'next/link';
import styles from '../../styles/Suggestions.module.scss';
export default function Suggestions(props) {
  return (
    <>
      <div className={styles.SuggestionWrapper}>
        {props.suggestions.map((item) => (
          <>
            <Link
              href={{
                pathname: '/movie',
                query: { filmId: `${item.show.id}` },
              }}
            >
              <a>
                <h5 key={item.show.id}>{item.show.name} </h5>
              </a>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}
