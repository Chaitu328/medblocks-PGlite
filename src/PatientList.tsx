import { useLiveQuery } from '@electric-sql/pglite-react'

function PatientList() {
  // Live query fetching all patients ordered by newest
  const result = useLiveQuery(
    `SELECT id, name, age, gender, "registerDateTime" FROM patients ORDER BY "registerDateTime" DESC`,
    [],
  )

  if (!result || result.rows.length === 0) {
    return <p>No registered patients yet.</p>
  }

  return (
    <>
      <h2>Registered Patients</h2>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Registered At</th>
          </tr>
        </thead>
        <tbody>
          {result.rows.map((p) => (
            <tr key={(p.registerDateTime as Date).getTime()}>
              <td>{p.id as any}</td>
              <td>{p.name as any}</td>
              <td>{p.age as any}</td>
              <td>{p.gender as any}</td>
              <td>{(p.registerDateTime as Date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default PatientList
