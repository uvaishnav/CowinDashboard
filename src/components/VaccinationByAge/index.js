import {PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts'
import './index.css'

const vaccineAgeColors = ['#0088FE', '#f54394', '#64c2a6']

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <div className="vaccination-age-container">
      <h3 className="chart-heading">Vaccination by Age</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={vaccinationByAge}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            dataKey="count"
            nameKey="age"
          >
            {vaccinationByAge.map((entry, index) => (
              <Cell
                key={`cell-${entry.age}`}
                fill={vaccineAgeColors[index % vaccineAgeColors.length]}
              />
            ))}
          </Pie>
          <Legend iconSize={10} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
