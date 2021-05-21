import { Button, Col, Form } from 'react-bootstrap';
import styles from '../../styles/SearchInput.module.scss';

export default function SearchInput(props) {
  return (
    <>
      <Form onSubmit={props.handleSubmit} className={styles.SearchInput}>
        <Form.Row>
          <Col md={12}>
            <div className="d-flex flex-row">
              <Form.Control
                placeholder="Search any TV Series..."
                value={props.searchQuery}
                onChange={props.onChange}
              />
              <Button className="ml-2" variant="" type="submit">
                Search
              </Button>
            </div>
          </Col>
        </Form.Row>
      </Form>
    </>
  );
}
