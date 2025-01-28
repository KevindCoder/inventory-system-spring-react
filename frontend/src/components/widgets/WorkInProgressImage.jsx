import { Box } from '@mui/material'
import illustrationImage from '../../assets/illustrations/Starting a business project-amico.svg'

const WorkInProgressImage = () => {
  return (
    <Box
      style={{
        width: '100%',
        height: '20rem',
        // background: '#f9a',
        padding: '1rem 0 1rem',
        marginBottom: '1.5rem'
      }}
    >
      <Box style={{ width: '30rem', height: '30rem', margin: '2rem auto' }}>
        <img
          style={{ maxWidth: '30rem', maxHeight: '30rem' }}
          src={illustrationImage}
        />
      </Box>
    </Box>
  )
}

export default WorkInProgressImage
