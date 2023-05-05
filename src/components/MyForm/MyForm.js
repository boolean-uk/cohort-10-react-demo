import { useState } from 'react'
import './MyForm.css'

const initialFormData = {
  name: 'sara',
  address: '',
  phone: '',
  email: '',
  complaint: '',
  contact: '',
  consent: false,
}

function MyForm () {
  const [formData, setFormData] = useState(initialFormData)

  //TODO: Add your state fields here
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    // event coming from a checkbox?
    // if (type === 'checkbox' && name === 'consent') {
    //   setFormData({...formData, consent: checked})
    // } else if (name === 'address') {
    //   setFormData({...formData, address: value})
    // } e

    if (type === 'checkbox') {
      setFormData({...formData, [name]: checked})
    } else {
      setFormData({...formData, [name]: value})
    }

  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>{formData.name || 'Someone'}'s form!</h2>
        <div className="form__section-left">
          <label>
            Full name { formData.name === 'edward' && <span>🔥</span> }
            <input type="text" name="name" required onChange={handleChange} value={formData.name}/>
          </label>
          <label>
            Address
            <input type="text" name="address" onChange={handleChange} value={formData.address}/>
          </label>
          <label>
            Phone Number
            <input type="tel" name="phone" onChange={handleChange} value={formData.phone}/>
          </label>

          <label>
            Email
            <input type="email" name="email" onChange={handleChange} value={formData.email}/>
          </label>
        </div>

        <div className="form__section-right">
          <label>
            Write your complaint
            <textarea
              name="complaint"
              rows="10"
              placeholder="You can complain here"
              onChange={handleChange}
              value={formData.complaint}
            ></textarea>
          </label>

          <div className="form__radio-group">
            <p>How do you want to be contacted? </p>
            <label>
              <input type="radio" name="contact" value="phone" onChange={handleChange} checked={formData.contact === 'phone'}/>
              Phone
            </label>

            <label>
              <input type="radio" name="contact" value="email" onChange={handleChange} checked={formData.contact === 'email'}/>
              Email
            </label>

            <label>
              <input type="radio" name="contact" value="post" onChange={handleChange} checked={formData.contact === 'post'}/>
              Slow Mail
            </label>

            <label>
              <input type="radio" name="contact" value="none" onChange={handleChange} checked={formData.contact === 'none'}/>
              No contact!
            </label>
          </div>

          <label>
            I agree you take my data, and do whatever
            <input type="checkbox" name="consent" id="consent" onChange={handleChange} checked={formData.consent}/>
          </label>
        </div>
        <input type="submit" value="Submit!" />
      </form>
    </>
  )
}

export default MyForm
