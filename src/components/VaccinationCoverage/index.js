import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  console.log(last7DaysVaccination)

  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%">
        <BarChart
          width={500}
          height={300}
          data={last7DaysVaccination}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="vaccine_date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="dose_1" fill="#f54394" />
          <Bar dataKey="dose_2" fill="#5a8dee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
