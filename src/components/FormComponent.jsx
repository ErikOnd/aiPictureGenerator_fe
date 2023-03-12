import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const FormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [userData, setUserData] = useState({
    prompt: "",
    n: 1,
    size: "1024x1024",
  });
  const apiUrl = process.env.REACT_APP_BE_URL;

  const postData = async () => {
    try {
      const response = await fetch(`${apiUrl}/openai/generateImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        setImgData(await response.json());
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error("An error occurred:", error);
      throw error;
    }
  };

  return (
    <>
      <h1 className="mt-5">Generate your Image</h1>
      <Form className="mt-5">
        <Form.Group as={Row} controlId="description">
          <Col>
            <Form.Control
              type="text"
              placeholder="Describe what you want to have generated..."
              value={userData.prompt}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  prompt: e.target.value,
                });
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="resolution">
          <Col>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              value={userData.size}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  size: e.target.value,
                });
              }}
            >
              <option value="" disabled defaultValue>
                Select Resolution
              </option>
              <option value={"256x256"}>small</option>
              <option value={"512x512"}>medium</option>
              <option value={"1024x1024"}>large</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="amount">
          <Col>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              value={userData.n}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  n: parseInt(e.target.value),
                });
              }}
            >
              <option value="" disabled defaultValue>
                Amout of images
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Button
          variant="dark"
          size="lg"
          onClick={() => {
            setIsLoading(true);
            postData();
          }}
        >
          Generate
        </Button>
      </Form>

      {isLoading === true && <Spinner animation="border" className="mt-5" />}

      {isError === true && (
        <Alert variant="danger" className="mt-5">
          Couldn't find an Image
        </Alert>
      )}

      {imgData && (
        <Row
          xs={1}
          md={imgData && imgData.data.length === 1 ? 1 : 2}
          lg={
            imgData && imgData.data.length === 1
              ? 1
              : imgData.data.length === 2
              ? 2
              : 3
          }
          className="g-4 mt-5"
        >
          {imgData.data.map((image) => {
            return (
              <Col className="my-4 w-100">
                <Image
                  src={image.url}
                  alt={userData.prompt}
                  fluid="true"
                  className="ai-img"
                ></Image>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};
export default FormComponent;
