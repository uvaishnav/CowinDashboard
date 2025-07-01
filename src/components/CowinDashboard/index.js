import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage/index'
import VaccinationByAge from '../VaccinationByAge/index'
import VaccinationByGender from '../VaccinationByGender/index'
import './index.css'

class CowinDashboard extends Component {
  apiStates = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

  state = {
    apiStatus: this.apiStates.initial,
    coWinData: null,
  }

  componentDidMount() {
    this.getCoWinData()
  }

  getCoWinData = async () => {
    this.setState({apiStatus: this.apiStates.loading})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {method: 'GET'}

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const coWinDataFormatted = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({
        coWinData: coWinDataFormatted,
        apiStatus: this.apiStates.success,
      })
    } else {
      this.setState({apiStatus: this.apiStates.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderCoWINCharts = () => {
    const {coWinData} = this.state
    return (
      <div className="data-charts-container">
        <VaccinationCoverage
          last7DaysVaccination={coWinData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGender={coWinData.vaccinationByGender}
        />
        <VaccinationByAge vaccinationByAge={coWinData.vaccinationByAge} />
      </div>
    )
  }

  renderCoWinData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case this.apiStates.loading:
        return this.renderLoadingView()
      case this.apiStates.success:
        return this.renderCoWINCharts()
      case this.apiStates.failure:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-main-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="cowin-logo-img"
          />
          <h1 className="logo-heading">Co-Win</h1>
        </div>
        <h1 className="page-heading">CoWIN Vaccination in India</h1>
        <div className="cowin-data-container">{this.renderCoWinData()}</div>
      </div>
    )
  }
}

export default CowinDashboard
