import styled from '@emotion/styled'

const Textarea = styled.textarea`
  font-family: ${({ theme }) => theme.fonts.alternative};
  font-size: 16px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  resize: none;

  &:focus {
    outline: none;
  }
`

export default Textarea
