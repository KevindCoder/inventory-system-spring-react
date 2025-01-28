import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext'

const DbContext = createContext()

export const useDb = () => {
  return useContext(DbContext)
}

export const DbProvider = ({ children }) => {
  const [firstName, setFirstName] = useState('...')
  const [lastName, setLastName] = useState('...')
  const [userEmail, setUserEmail] = useState('...')
  const [thoughts, setThoughts] = useState([])
  const { currentUser } = useAuth()

  const createUserDocument = (
    uid,
    passedFirstName,
    passedLastName,
    passedEmail
  ) => {
    db.collection('users')
      .doc(uid)
      .set({
        firstName: passedFirstName,
        lastName: passedLastName,
        email: passedEmail
      })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  const addThoughtToDocument = (uid, newThoughts) => {
    db.collection('thoughts')
      .doc(uid)
      .set({
        thoughtsArray: newThoughts
      })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  const resetStateValues = () => {
    setThoughts([])
    setFirstName('...')
    setLastName('...')
    setUserEmail('...')
  }

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      // sub to user's document in thoughts collection
      let unsubThoughts = db
        .collection('thoughts')
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          let docData = doc.data()
          if (docData && docData.thoughtsArray)
            setThoughts(docData.thoughtsArray)
        })
      // update user's first name, last name and email
      db.collection('users')
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          let docData = doc.data()
          if (docData && docData.firstName) setFirstName(docData.firstName)
          if (docData && docData.lastName) setLastName(docData.lastName)
          if (docData && docData.email) setUserEmail(docData.email)
        })
    } else {
      resetStateValues()
    }
  }, [currentUser])

  const value = {
    thoughts,
    firstName,
    lastName,
    userEmail,
    createUserDocument,
    addThoughtToDocument
  }

  return <DbContext.Provider value={value}>{children}</DbContext.Provider>
}
