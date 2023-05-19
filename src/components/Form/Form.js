function Form ({handleSubmit, inputName, handleChange, value, buttonText}) {

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name={inputName} onChange={handleChange} value={value}/>
        <button>{buttonText}</button>
      </form>
    </>
  )
}

export default Form
