import { Button, Col, Form } from 'react-bootstrap';
import styles from '../../styles/SearchInput.module.scss';

export default function SearchInput(props) {
  return (
    <>
      <Form onSubmit={props.handleSubmit} className={styles.SearchInput}>
        <Form.Row>
          <Col md={12}>
            <Form.Control
              placeholder="Search any TV Series..."
              value={props.value}
              onChange={props.onChange}
            />
          </Col>
        </Form.Row>
      </Form>
    </>
  );
}
