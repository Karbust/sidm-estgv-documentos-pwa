import { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface Props {
    bgColor: string
    completed: string
}

const ContainerDiv = styled.div`
  height: 1.5em;
  width: 100%;
  background-color: #403d39;
  border-radius: 11px;
  margin: 0;
`

const FilterDiv = styled.div<Props>`
  height: 100%;
  width: ${(props) => props.completed};
  background-color: ${(props) => props.bgColor};
  border-radius: 11px;
  text-align: right;
  transition: width 1s ease-in-out;
`

const Label = styled.span`
  padding: 5px;
  color: white;
  font-size: 0.7em;
  float: left;
`

const ProgressBar: FunctionComponent<Props> = ({ bgColor, completed }) => (
    <ContainerDiv>
        <FilterDiv bgColor={bgColor} completed={completed}>
            <Label>{`${completed}%`}</Label>
        </FilterDiv>
    </ContainerDiv>
)

export default ProgressBar
