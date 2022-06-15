import styled from "styled-components";
import {Input} from "antd";

export const HomeBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;

  ${Input} {
    margin-bottom: 20px;
  }
`