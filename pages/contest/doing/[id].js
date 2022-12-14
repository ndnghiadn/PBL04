import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Input, Radio, Space, Button, Checkbox, Modal } from "antd";
import useWindowFocus from "../../../hooks/useWindowFocus";
import { useRouter } from "next/router";
import contestApi from "../../../api/contestApi";
import { toast } from "react-toastify";
const CheckboxGroup = Checkbox.Group;

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

const QuestionElement = ({ data, index, result, setResult, setResultList }) => {
  const [value, setValue] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (!data) return;

    setValue(null);
    setCheckedList([]);
    setResult(null);

    setResultList((current) => [
      ...current,
      {
        value: result,
      },
    ]);

    setContent(shuffle(data.content));
  }, [data]);

  useEffect(() => {
    if (data?.type === "radio") {
      setResult(value);
    } else {
      setResult(checkedList);
    }
  }, [value, checkedList]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleChangeCheckbox = (e) => {
    let newList = [];
    if (e.target.checked) {
      if (checkedList.includes(e.target.value)) {
        newList = [...checkedList];
      } else {
        newList = [...checkedList, e.target.value];
      }
    } else {
      newList = checkedList.filter((listItem) => listItem !== e.target.value);
    }
    setCheckedList(newList);
  };

  function shuffle(array) {
    if (!array) return;

    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <Question key={data?._id}>
      <h3>
        Câu {index}: {data?.label}
      </h3>
      {data?.type === "radio" ? (
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {content.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      ) : (
        content.map((item) => (
          <>
            <Checkbox
              onChange={handleChangeCheckbox}
              key={item.value}
              value={item.value}
            >
              {item.label}
            </Checkbox>
            <br></br>
          </>
        ))
      )}
    </Question>
  );
};

const DoingContestPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [warning, setWarning] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [result, setResult] = useState(null);
  const [time, setTime] = useState(0);
  const [isTimeStopped, setIsTimeStopped] = useState(false);
  const [contestDuration, setContestDuration] = useState(45); // 45 minutes default for semi-final contest

  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      try {
        const response = await contestApi.getContestById(id);
        if (response.data.data.type == "final") {
          setContestDuration(75);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [router.isReady]);

  useEffect(() => {
    if (isTimeStopped) return;
    const countdown = setInterval(() => {
      setTime((current) => current + 1);
    }, 60 * 1000); // after 1 minute

    return () => {
      clearInterval(countdown);
    };
  }, [isTimeStopped]);

  useEffect(() => {
    (async () => {
      try {
        const response = await contestApi.startContest(id);
        setQuestionList(response.data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    // trigger if the user has over 3 warnings, close tab & finish
    if (warning <= 3) return;
    setIsTimeStopped(true);
    setOpen(true);
  }, [warning]);

  useEffect(() => {
    if (contestDuration - time > 0) return;
    setIsTimeStopped(true);
    setOpen(true);
  }, [time]);

  useWindowFocus({ warning, setWarning });

  const handleFinish = async () => {
    const tmp = questionList.map((question, index) => ({
      questionId: question._id,
      value: resultList[index + 1] ? resultList[index + 1].value : "",
    }));
    setLoading(true);
    try {
      await contestApi.finishContest(id, {
        time,
        warn: warning,
        data: tmp,
      });
      setLoading(false);
      setOpen(false);
      window.close();
    } catch (err) {
      toast.error("Xảy ra lỗi trong khi nộp bài, hãy thử lại !");
    }
  };

  const handleNext = () => {
    if (questionIndex === questionList.length - 1) {
      setResultList([
        ...resultList,
        {
          value: result,
        },
      ]);
      setIsTimeStopped(true);
      setOpen(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <Container>
      <Counter>
        <h4>
          {contestDuration - time == 0
            ? "Hết giờ làm bài"
            : `Còn lại ${contestDuration - time} phút`}
        </h4>
        <br />
        <h4>Bị cảnh báo: {warning}</h4>
        <span>
          ({questionIndex + 1}/{questionList.length})
        </span>
      </Counter>
      <QuestionElement
        data={questionList[questionIndex]}
        index={questionIndex + 1}
        result={result}
        setResult={setResult}
        setResultList={setResultList}
      />
      <ButtonNext onClick={handleNext} size="large">
        {questionIndex === questionList.length - 1 ? "Finish" : "Next"}
      </ButtonNext>

      <Modal
        centered
        open={open}
        title={`Bạn đã hoàn thành bài thi - Warn: ${warning}`}
        onOk={handleFinish}
        onCancel={() => {
          if (warning > 3 || contestDuration - time <= 0) return;
          setOpen(false);
          setIsTimeStopped(false);
        }}
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
        <p>Thời gian làm bài: {time} phút</p>
      </Modal>
    </Container>
  );
};

export default DoingContestPage;
