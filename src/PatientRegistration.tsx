import { useState } from 'react'

function PatientRegistration() {
    const [name, setName] = useState('')
    const [age, setAge] = useState<number | ''>('')
    const [gender, setGender] = useState('')

    const registerPatient = async () => {
    if (!name || !age) {
      alert('Please fill name and age')
      return
    }
  }

  return (
     <>
      <h2>Register New Patient</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          registerPatient()
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          aria-label="Gender"
        >
          <option value="">Select Gender (optional)</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Register Patient</button>
      </form>

    </>
  )
}

export default PatientRegistration