import { Box, Typography } from '@mui/material'

function PageTitle({ title }) {
  return (
    <Box
      style={{
        width: '100%',
        borderBottom: '1px solid #e5e5e5',
        padding: '1rem 0',
        marginTop: '64px',
        marginBottom: '1.5rem',
        display: 'flex', // Flexbox to center the content
      }}
    >
      <Typography variant="h7" style={{ userSelect: 'none' }}>
        {title}
      </Typography>
    </Box>
  )
}

export default PageTitle
