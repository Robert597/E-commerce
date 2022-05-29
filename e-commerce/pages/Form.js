import React, {useState} from 'react'

const Form = () => {
    const [banner, setBanner] = useState(false);
  return (
    <div>
        {
            !banner && (
              <>
                <form className='productFormContainer'>
                    <input type="text" required placeholder='Name'/>
                    <input type="number" required placeholder='Price'/>
                    <input type="file" required />
                    <textarea placeholder='Description'></textarea>
                    <button type='submit'>Submit</button>
                </form>
                 <p>Edit Banner Text <span onClick={() => {setBanner(true)}}>Click Here</span></p>
                 </>
            )
        }
        {banner && (
          <>
          <form className='bannerFormContainer'>
             <input type="text" required placeholder='Big Text'/>
             <input type="text" required placeholder='Small Text'/>
          </form>
           <p>Add a new Product <span onClick={() => {setBanner(false)}} style={{cursor: "pointer"}}>Click Here</span></p>
           </>
        )}
       
    </div>
  )
}

export default Form;