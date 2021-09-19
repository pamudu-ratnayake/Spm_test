// My_Issue

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardText,
  UncontrolledTooltip,
  Alert,
} from "reactstrap";
// core components
import UserHeaderMyIssue from "components/Headers/UserHeaderMyIssue.js";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import SponsorList from "./SponsorList";

const validationSchema = Yup.object({
  issue: Yup.string().required("Required!"),
});

const My_Issue = (props) => {
  const [details, setDetails] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/eventAdd/getOneEvent/${props.match.params._id}`
      )
      .then((res) => {
        console.log(res);
        setDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let history = useHistory();

  const onSubmit = (values) => {
    console.log("Form Date", values);
    //  values.date_of_the_event = event_date; //watch
    axios
      .post("http://localhost:8080/consulting/addIssue", values)
      .then((res) => {
        console.log(res);
        console.log("Data", values);
        console.log(details._id);
        history.push({
          pathname: `/admin/Event_Support`,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initialValues = {
    enableReinitialize: true,
    validateOnMount: true,
    issue: "",
    // answers:[],
    eventObj: {
      _id: details._id,
      event_name: details.event_name,
      date_of_the_event: details.date_of_the_event,
      event_time: details.event_time,
      location: details.location,
      days_occurs: details.days_occurs,
      event_type: details.event_type,
      description: details.description,
    },
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <UserHeaderMyIssue />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <div className="col">
          <Card
            className="bg-secondary shadow"
            style={({ width: "28rem" }, { height: "50rem" })}
          >
            <CardHeader className="border-0">
              <Row>
                <Col className="border-0" xl="9">
                  <h3 className="mb-0">Hi! We are here to help now ...</h3>
                </Col>
                <Col className="col text-right" xl="3">
                  <Link to={`/admin/Event_Support/${props.match.params._id}`}>
                    <Button color="primary" size="sm">
                      Search for Solution
                    </Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>

            <CardBody>
              <CardText className="h5" style={{ paddingTop: "0.5rem" }}>
                <Row>
                  <Col xs="3">Event Name</Col>
                  <Col xs="1">:</Col>
                  <Col xs="6">{details.event_name}</Col>
                </Row>
              </CardText>

              <CardText className="h5" style={{ paddingTop: "0.5rem" }}>
                <Row>
                  <Col xs="3">Event Date</Col>
                  <Col xs="1">:</Col>
                  <Col xs="6">{details.date_of_the_event}</Col>
                </Row>
              </CardText>

              <CardText className="h5" style={{ paddingTop: "0.5rem" }}>
                <Row>
                  <Col xs="3">Event Time</Col>
                  <Col xs="1">:</Col>
                  <Col xs="6">{details.event_time}</Col>
                </Row>
              </CardText>

              <CardText className="h5" style={{ paddingTop: "0.5rem" }}>
                <Row>
                  <Col xs="3">Location</Col>
                  <Col xs="1">:</Col>
                  <Col xs="6">{details.location}</Col>
                </Row>
              </CardText>

              <CardText className="h5" style={{ paddingTop: "0.5rem" }}>
                <Row>
                  <Col xs="3">Days Occurs</Col>
                  <Col xs="1">:</Col>
                  <Col xs="6">{details.days_occurs}</Col>
                </Row>
              </CardText>

              <CardText className="h5" style={{ paddingTop: "0.5rem" }}>
                <Row>
                  <Col xs="3">Event Type</Col>
                  <Col xs="1">:</Col>
                  <Col xs="6">
                    <span>{details.event_type}</span>
                  </Col>
                </Row>
              </CardText>

              <CardText className="h5" style={{ paddingTop: "0.5rem" }}>
                <Row>
                  <Col xs="3">Event Description</Col>
                  <Col xs="1">:</Col>
                  <Col xs="6">{details.description}</Col>
                </Row>
              </CardText>

              <Row>
                <Form onSubmit={formik.handleSubmit}>
                  <Col style={{ paddingTop: "2rem" }}>
                    <FormGroup>
                      <label>
                        What is your Question? (Above details will display with
                        the question)
                      </label>
                      <Input
                        id="exampleFormControlTextarea1"
                        placeholder="Write a large text here ..."
                        rows="3"
                        type="textarea"
                        name="issue"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.issue}
                      />
                      {formik.touched.issue && formik.errors.issue ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.issue}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col className="mb-4 mt-4">
                    <Button
                      color="primary"
                      id="POST"
                      size="sm"
                      type="submit"
                      data-placement="top"
                      id="tooltip611234743"
                    >
                      Publish
                    </Button>
                    <UncontrolledTooltip
                      delay={0}
                      placement="top"
                      target="tooltip611234743"
                    >
                      Question will publish for answering
                    </UncontrolledTooltip>
                  </Col>
                </Form>
              </Row>
            </CardBody>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default My_Issue;
