import { usePGlite } from '@electric-sql/pglite-react'
import { useState } from 'react'
import PatientList from './PatientList'

function PatientRegistration() {
  const db = usePGlite()

  const [name, setName] = useState('')
  const [age, setAge] = useState<number | ''>('')
  const [gender, setGender] = useState('')

  const registerPatient = async () => {
    if (!name || !age) {
      alert('Please fill name and age')
      return
    }

    await db.query(
      `INSERT INTO patients (name, age, gender) VALUES ($1, $2, $3)`,
      [name, age, gender || null],
    )

    setName('')
    setAge('')
    setGender('')
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

      <PatientList />
    </>
  )
}

export default PatientRegistration
