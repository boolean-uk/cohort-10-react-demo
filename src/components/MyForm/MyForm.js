import { useState } from 'react'
import './MyForm.css'

function MyForm () {
  const [name, setName] = useState('edward')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  //TODO: Add your state fields here
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({name, address, phone, email})
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeAddress = (e) => {
    setAddress(e.target.value)
  }

  const handleChangePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>{name || 'Someone'}'s form!</h2>
        <div className="form__section-left">
          <label>
            Full name { name === 'edward' && <span>🔥</span> }
            <input type="text" name="name" required onChange={handleChangeName} value={name}/>
          </label>
          <label>
            Address
            <input type="text" name="address" onChange={handleChangeAddress} value={address}/>
          </label>
          <label>
            Phone Number
            <input type="tel" name="phone" onChange={handleChangePhone} value={phone}/>
          </label>

          <label>
            Email
            <input type="email" name="email" onChange={handleChangeEmail} value={email}/>
          </label>
        </div>

        <div className="form__section-right">
          <label>
            Write your complaint
            <textarea
              name="complaint"
              rows="10"
              placeholder="You can complain here"
            ></textarea>
          </label>

          <div className="form__radio-group">
            <p>How do you want to be contacted? </p>
            <label>
              <input type="radio" name="contact" value="phone" />
              Phone
            </label>

            <label>
              <input type="radio" name="contact" value="email" />
              Email
            </label>

            <label>
              <input type="radio" name="contact" value="post" />
              Slow Mail
            </label>

            <label>
              <input type="radio" name="contact" value="none" />
              No contact!
            </label>
          </div>

          <label>
            I agree you take my data, and do whatever
            <input type="checkbox" name="consent" id="consent" />
          </label>
        </div>
        <input type="submit" value="Submit!" />
      </form>
    </>
  )
}

export default MyForm
