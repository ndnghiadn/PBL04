import Head from "next/head";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Online Exam App</title>
        <meta name="description" content="Online Exam App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>Hello World</Container>
    </>
  );
}
