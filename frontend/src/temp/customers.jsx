import {
  BoxArrowUpRight,
  PeopleFill,
  InfoCircle,
  ArrowRight,
} from 'react-bootstrap-icons'
import avatar1 from '../assets/avatars/image-6.png'
import avatar2 from '../assets/avatars/image-10.png'
import avatar3 from '../assets/avatars/image-16.png'
import avatar4 from '../assets/avatars/image-25.png'
import avatar5 from '../assets/avatars/image-26.png'
import avatar6 from '../assets/avatars/image-28.png'
import avatar7 from '../assets/avatars/image-15.png'
import avatar8 from '../assets/avatars/image-3.png'
import { useEffect } from 'react'

export function createCustomerData(
  name,
  phoneNumber,
  email,
  document,
  address,
  state
) {
  return {
    name,
    phoneNumber,
    email,
    document,
    address,
    state,
  }
}
