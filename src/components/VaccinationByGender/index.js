import {PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts'
import './index.css'

const vaccineGenderColors = ['#f54394', '#5a8dee', '#64c2a6']

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <div className="vaccination-by-gender-container">
      <h1 className="vaccination-by-gender-heading">Vaccination by gender</h1>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={vaccinationByGender}
            startAngle={180}
            endAngle={0}
            dataKey="count"
            nameKey="gender"
            cx="50%"
            cy="70%"
            outerRadius={100}
            label
            labelLine={false}
            legendType="circle"
          >
            {vaccinationByGender.map((entry, index) => (
              <Cell
                key={`cell-${entry.gender}`}
                fill={vaccineGenderColors[index % vaccineGenderColors.length]}
              />
            ))}
          </Pie>
          <Legend iconSize={10} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
