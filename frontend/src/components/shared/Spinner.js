import { useTheme } from '@emotion/react'

import { RingLoader } from 'react-spinners'

export default function Spinner({ ...props }) {
  const theme = useTheme()
  return <RingLoader {...props} color={theme.colors.text} />
}
