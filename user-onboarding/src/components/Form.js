import React from 'react'
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { Container } from './Container'
import { StyledForm } from './StyledForm'
import { InputCombo } from './InputCombo'
import { VerticalSplitter } from './VerticalSplitter'
import axios from 'axios'
import { SavedUsers } from './SavedUsers'
import UserCard from './UserCard'

function Form(props) {
  const users = props.users
  const setUsers = props.setUsers

  const [disabledButton, setDisabledButton] = useState(true)

  const initialFormState = {
    name: '',
    email: '',
    pass: '',
    terms: false,
  }

  const [formData, setFormData] = useState(initialFormState)

  const initialErrorsState = {
    name: '',
    email: '',
    pass: '',
    terms: '',
  }
  const [errors, setErrors] = useState(initialErrorsState)

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required('Must include name.')
      .min(6, 'Name must be at least 6 characters long'),
    email: yup
      .string()
      .email('Must be a valid email address.')
      .required('Must include email address.'),
    pass: yup
      .string()
      .required('Password is Required')
      .min(6, 'Passwords must be at least 6 characters long.'),
    terms: yup.boolean().oneOf([true], 'You must accept Terms and Conditions'),
  })

  const setFormErrors = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }))
  }

  const clearFormData = () => {
    setFormData(initialFormState)
    setErrors(initialErrorsState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // debugger

    axios
      .post('https://reqres.in/api/users', formData)
      .then((res) => {
        if (users === undefined) {
          setUsers(res.data)
        } else {
          const newArr = [...users, res.data]
          setUsers(newArr)
        }
        clearFormData()
      })
      .catch((err) => console.log('ERROR', err))
  }

  const handleChange = (e) => {
    const { name, type } = e.target
    const valueToUse = type === 'checkbox' ? 'checked' : 'value'
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target[valueToUse],
      }
    })

    setFormErrors(name, e.target[valueToUse])
  }

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabledButton(!valid))
  }, [formData, errors, formSchema, users])

  return (
    <Container>
      <h1>User Onboarding</h1>

      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        <InputCombo className='input-combo'>
          <VerticalSplitter
            className='vertical-splitter-left'
            style={{ alignItems: 'flex-start' }}
          >
            <label for='id'>Name</label>
          </VerticalSplitter>

          <VerticalSplitter
            className='vertical-splitter-right'
            style={{ alignItems: 'flex-end' }}
          >
            <input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={(e) => handleChange(e)}
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </VerticalSplitter>
        </InputCombo>

        <InputCombo className='input-combo'>
          <VerticalSplitter
            className='vertical-splitter-left'
            style={{ alignItems: 'flex-start' }}
          >
            <label for='email'>Email</label>
          </VerticalSplitter>

          <VerticalSplitter
            className='vertical-splitter-right'
            style={{ alignItems: 'flex-end' }}
          >
            <input
              id='email'
              name='email'
              type='text'
              value={formData.email}
              onChange={(e) => handleChange(e)}
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </VerticalSplitter>
        </InputCombo>

        <InputCombo className='input-combo'>
          <VerticalSplitter
            className='vertical-splitter-left'
            style={{ alignItems: 'flex-start' }}
          >
            <label for='pass'>Password</label>
          </VerticalSplitter>

          <VerticalSplitter
            className='vertical-splitter-right'
            style={{ alignItems: 'flex-end' }}
          >
            <input
              id='pass'
              name='pass'
              type='text'
              value={formData.pass}
              onChange={(e) => handleChange(e)}
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </VerticalSplitter>
        </InputCombo>

        <InputCombo className='input-combo'>
          <VerticalSplitter
            className='vertical-splitter-left'
            style={{ alignItems: 'flex-start' }}
          >
            <label for='terms'>Terms of Service</label>
          </VerticalSplitter>

          <VerticalSplitter
            className='vertical-splitter-right'
            style={{ alignItems: 'flex-start' }}
          >
            <input
              id='terms'
              name='terms'
              type='checkbox'
              checked={formData.terms}
              onChange={(e) => handleChange(e)}
              style={{ boxSizing: 'border-box' }}
            />
          </VerticalSplitter>
        </InputCombo>

        <InputCombo id='submit-btn-input-combo'>
          <button
            style={{ width: '300px', height: '30px' }}
            disabled={disabledButton}
          >
            Submit!
          </button>
        </InputCombo>
      </StyledForm>

      <SavedUsers>
        {users !== undefined &&
          users.map((el) => (
            <UserCard
              name={el.name}
              email={el.email}
              pass={el.pass}
              id={el.id}
              createdAt={el.createdAt}
            />
          ))}
      </SavedUsers>
    </Container>
  )
}

export default Form

// Sample response
// {
//     "name": "Diego Fischer",
//     "email": "diego@carupi.com",
//     "pass": "asdfasdf",
//     "terms": true,
//     "id": "912",
//     "createdAt": "2021-09-09T04:07:15.024Z"
// }
