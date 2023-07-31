import React, { useState } from "react";
import Style, { StepHead } from "./style";
import { Row, Col } from "antd";
import Button from "components/uiElements/button";
import { Card } from "react-bootstrap";
import IntlMessages from "utils/intlMessages";
import * as constants from "./constants";
import basicStyle from "theme/style";

const { rowStyle } = basicStyle;

const Stepper = ({
  loading,
  steps = [],
  defaultCurrent,
  onNext,
  onPrev,
  onFinish,
}) => {
  const [current, setCurrent] = useState(
    defaultCurrent || constants.DEFAULT_CURRENT
  );
  const next = () => {
    // setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <Style>
      <Row>
        <Card>
          <Card.Body>
            <Col span={24}>
              <Row style={rowStyle}>
                {steps.map(({ title }, index) => (
                  <StepHead span={24 / steps.length} active={index === current}>
                    <IntlMessages id={title} />
                  </StepHead>
                ))}
              </Row>
            </Col>
          </Card.Body>
        </Card>
        <Col span={24} className="step-body">
          {steps[current].content}
        </Col>
        <Col span={24} className="step-footer">
          <Card>
            <Card.Body>
              <div className="step-footer-button-container">
                <Button
                  disabled={loading || current === constants.DEFAULT_CURRENT}
                  onClick={e => (
                    e.preventDefault(), (onPrev && onPrev(current)) || prev()
                  )}
                >
                  <IntlMessages id="stepper.prev" />
                </Button>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={e => (
                    e.preventDefault(),
                    current === steps.length
                      ? (onFinish && onFinish(current)) || null
                      : (onNext && onNext(current)) || next()
                  )}
                >
                  <IntlMessages
                    id={
                      current === steps.length
                        ? "stepper.finish"
                        : "stepper.next"
                    }
                  />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Style>
  );
};
export default Stepper;
