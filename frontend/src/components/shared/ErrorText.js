import styled from '@emotion/styled'

import Text from './Text'

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.colors.danger};
`

export default ErrorText
