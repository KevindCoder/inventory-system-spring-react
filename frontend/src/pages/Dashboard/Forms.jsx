import { useState } from 'react'
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import PageTitle from '../../components/widgets/PageTitle'

function Forms() {
  const [value, setValue] = useState(new Date())
  const handleChange = (newValue) => {
    setValue(newValue)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageTitle title="Simple forms to fill in 🖊️" />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            <Box style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ padding: '1rem' }}>Simple Form</div>
            </Box>
            <Box component="form" style={{ padding: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Name
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  style={{ marginBottom: '.15rem' }}
                  placeholder="Enter full name"
                  id="outlined-required"
                />
                <Typography
                  variant="caption"
                  style={{ marginTop: '1rem', color: '#999' }}
                >
                  Please enter your full name
                </Typography>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Email
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  type="email"
                  style={{ marginBottom: '.15rem' }}
                  placeholder="Enter email"
                  id="outlined-required"
                />
                <Typography
                  variant="caption"
                  style={{ marginTop: '1rem', color: '#999' }}
                >
                  Please enter your email
                </Typography>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Password
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  type="password"
                  style={{ marginBottom: '.15rem' }}
                  placeholder="Enter password"
                  id="outlined-required"
                />
                <Typography
                  variant="caption"
                  style={{ marginTop: '1rem', color: '#999' }}
                >
                  Please enter your password
                </Typography>
              </div>
              <FormControl>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  style={{ marginBottom: '.25rem' }}
                >
                  Language
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="english"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="english"
                    control={<Radio size="small" />}
                    label="English"
                  />
                  <FormControlLabel
                    value="french"
                    control={<Radio size="small" />}
                    label="French"
                  />
                  <FormControlLabel
                    value="german"
                    control={<Radio size="small" />}
                    label="German"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Paper>
        </Grid>
        {/* ============================================================ */}
        <Grid item xs={6}>
          <Paper>
            <Box style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ padding: '1rem' }}>Date and Time</div>
            </Box>
            <Box component="form" style={{ padding: '1rem 1rem 0 1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Date Desktop
                </Typography>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField size="small" fullWidth {...params} />
                  )}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Date Mobile
                </Typography>
                <MobileDatePicker
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Time
                </Typography>
                <TimePicker
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Date and Time
                </Typography>
                <DateTimePicker
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                />
              </div>
            </Box>
            <Box
              display="flex"
              justifyContent="end"
              style={{ borderTop: '1px solid #e5e5e5', padding: '1rem' }}
            >
              <Button variant="outlined" color="error">
                Cancel
              </Button>
              <Button variant="contained" style={{ marginLeft: '1rem' }}>
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>
        {/* ============================================================ */}
        <Grid item xs={12}>
          <Paper>
            <Box style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ padding: '1rem' }}>Multi Column Form</div>
            </Box>
            <Grid
              component="form"
              container
              item
              spacing={3}
              style={{ padding: '1rem' }}
            >
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Name
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  style={{ marginBottom: '.15rem' }}
                  placeholder="Enter full name"
                  id="outlined-required"
                />
                <Typography
                  variant="caption"
                  style={{ marginTop: '1rem', color: '#999' }}
                >
                  Please enter your full name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Email
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  type="email"
                  style={{ marginBottom: '.15rem' }}
                  placeholder="Enter email"
                  id="outlined-required"
                />
                <Typography
                  variant="caption"
                  style={{ marginTop: '1rem', color: '#999' }}
                >
                  Please enter your email
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Password
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  type="password"
                  style={{ marginBottom: '.15rem' }}
                  placeholder="Enter password"
                  id="outlined-required"
                />
                <Typography
                  variant="caption"
                  style={{ marginTop: '1rem', color: '#999' }}
                >
                  Please enter your password
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  style={{ marginBottom: '.25rem' }}
                >
                  Profile URL
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  style={{ marginBottom: '.15rem' }}
                  placeholder="Enter profile URL"
                  id="outlined-required"
                />
                <Typography
                  variant="caption"
                  style={{ marginTop: '1rem', color: '#999' }}
                >
                  Please enter your profile URL
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{ marginBottom: '.25rem' }}
                  >
                    Language
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="english"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="english"
                      control={<Radio size="small" />}
                      label="English"
                    />
                    <FormControlLabel
                      value="french"
                      control={<Radio size="small" />}
                      label="French"
                    />
                    <FormControlLabel
                      value="german"
                      control={<Radio size="small" />}
                      label="German"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default Forms
