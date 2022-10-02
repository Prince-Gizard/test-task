import React from 'react'
import styled from '@emotion/styled'

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
registerLocale('ru', ru)

export default function DateRangePicker({
  text,
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  className,
}) {
  return (
    <Container className={className}>
      <Text>{text}</Text>
      <DateContainer>
        <DatePickerWrapper>
          <DatePicker
            selected={startDate}
            onChange={(date) => onChangeStartDate(date ? date.getTime() : date)}
            maxDate={endDate}
            isClearable
            locale="ru"
            showYearDropdown
            dropdownMode="select"
            dateFormat="d MMMM yyyy г."
          />
        </DatePickerWrapper>
        <Dash>—</Dash>
        <DatePickerWrapper>
          <DatePicker
            selected={endDate}
            onChange={(date) => onChangeEndDate(date ? date.getTime() : date)}
            minDate={startDate}
            isClearable
            locale="ru"
            showYearDropdown
            dropdownMode="select"
            dateFormat="d MMMM yyyy г."
          />
        </DatePickerWrapper>
      </DateContainer>
    </Container>
  )
}

const Container = styled.div``

const Text = styled.div`
  margin-bottom: 10px;
`

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const DatePickerWrapper = styled.div`
  margin: 5px 0;
`

const Dash = styled.div`
  margin: 0 10px;
`
