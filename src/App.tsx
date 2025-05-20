import { useEffect, useState } from 'react'
import './App.css'
import { PGliteProvider } from '@electric-sql/pglite-react'
import PatientRegistration from './PatientRegistration'
import { live, PGliteWithLive } from '@electric-sql/pglite/live'
import { PGlite} from '@electric-sql/pglite'

let dbGlobal: PGliteWithLive | undefined

function App() {
  const [db, setDb] = useState<PGliteWithLive | undefined>()

  useEffect(() => {
    async function setupDb() {
      dbGlobal ??= await PGlite.create({
        extensions: { live },
      })
      dbGlobal.query(`
          CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          age INT NOT NULL,
          gender TEXT,
          "registerDateTime" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );`)
      setDb(dbGlobal)
    }
    setupDb()
  }, [])

  return (
    <>
      <h1>Patients Table Registration App</h1>
      <div className="card">
        {db ? (
          <PGliteProvider db={db}>
            <PatientRegistration />
          </PGliteProvider>
        ) : (
          <div>Loading PGlite...</div>
        )}
      </div>
    </>
  )
}

export default App
