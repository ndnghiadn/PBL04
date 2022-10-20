import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Radio, Space, Button, Checkbox, Modal } from "antd";
import useWindowFocus from "../../../hooks/useWindowFocus";
import Countdown from "react-countdown";
const { TextArea } = Input;

const questionList = [
  {
    id: 1,
    label: "Vượn cổ thích ăn món gì?",
    type: "radio",
    content: [
      {
        label: "Chuối",
        value: "banana",
      },
      {
        label: "Táo",
        value: "apple",
      },
      {
        label: "Bơ",
        value: "avocado",
      },
      {
        label: "Tất cả phương án trên",
        value: "all",
      },
    ],
  },
  {
    id: 2,
    label: "Bạn biết gì về loài vượn cổ?",
    type: "textarea",
  },
  {
    id: 3,
    label: "Hoạt động nào phổ biến thời săn bắt hái lượm?",
    type: "select",
    content: [
      {
        label: "Ăn",
        value: "banana",
      },
      {
        label: "Ngủ",
        value: "banana",
      },
    ],
  },
];

const Container = styled.div`
  position: relative;
  width: 95%;
  height: 95vh;
  border: 2px solid red;
  margin: auto;
  background-color: #eee;
`;
const ButtonNext = styled(Button)`
  position: absolute;
  right: 15px;
  bottom: 15px;
`;
const Counter = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  text-align: right;
`;
const Question = styled.div`
  width: 500px;
  margin: 150px auto;

  & > h3 {
    text-align: center;
    margin-bottom: 25px;
  }
`;

const QuestionElement = ({ data }) => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Question>
      <h3>
        Câu {data.id}: {data.label}
      </h3>
      {data.type === "radio" ? (
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {data.content.map((item, index) => (
              <Radio key={index} value={item.value}>
                {item.label}
              </Radio>
            ))}
            <Radio value={4}>
              Đáp án khác
              {value === 4 ? (
                <Input
                  style={{
                    width: 100,
                    marginLeft: 10,
                  }}
                />
              ) : null}
            </Radio>
          </Space>
        </Radio.Group>
      ) : data.type === "textarea" ? (
        <TextArea rows={4} placeholder="Write your answer here" maxLength={7} />
      ) : (
        data.content.map((item, index) => (
          <>
            <Checkbox key={index}>{item.label}</Checkbox>
            <br></br>
          </>
        ))
      )}
    </Question>
  );
};

const CustomCountdown = React.memo(() => {
  return (
    <Countdown
      renderer={({ days, hours, minutes, seconds, completed }) => {
        return (
          <h2 style={{ color: completed ? "red" : "green" }}>
            {days}:{hours}:{minutes}:{seconds}
          </h2>
        );
      }}
      autoStart
      date={Date.now() + 60 * 60 * 1000}
    />
  );
});
CustomCountdown.displayName = "Countdown-Elm";

const DoingContestPage = () => {
  const [warning, setWarning] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  useWindowFocus({ warning, setWarning });

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      window.close();
    }, 3000);
  };

  const handleNext = () => {
    if (questionIndex === questionList.length - 1) return;
    setQuestionIndex(questionIndex + 1);
  };

  useEffect(() => {
    // trigger if the user has over 3 warnings, close tab & finish
    if (warning <= 3) return;
    setOpen(true);
  }, [warning]);

  return (
    <Container>
      <Counter>
        <CustomCountdown />
        <br />
        <h4>Bị cảnh báo: {warning}</h4>
        <span>
          ({questionIndex + 1}/{questionList.length})
        </span>
      </Counter>
      <QuestionElement data={questionList[questionIndex]} />
      <ButtonNext onClick={handleNext} size="large">
        {questionIndex === questionList.length - 1 ? "Finish" : "Next"}
      </ButtonNext>

      <Modal
        centered
        open={open}
        title="Bạn đã hoàn thành bài thi - Warn: 4"
        onOk={handleFinish}
        onCancel={handleFinish}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleFinish}
          >
            OK
          </Button>,
        ]}
      >
        <p>Thời gian làm bài: 43 phút 25 giây</p>
        <p>Số điểm: 38/40</p>
      </Modal>
    </Container>
  );
};

export default DoingContestPage;
