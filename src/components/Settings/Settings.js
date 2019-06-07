import React from "react";
import PropTypes from "prop-types";
import InputWithLabel from "../InputWithLabel";
import "./Settings.scss";

const DEFAULT_EXPECTED_CALORIES = 1700;

class Settings extends React.Component {
  static propTypes = {
    settings: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      expectedNoOfCaloriesPerDay: JSON.parse(props.settings).expectedNoOfCaloriesPerDay || DEFAULT_EXPECTED_CALORIES
    };

    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings !== this.props.settings) {
      this.setState({ expectedNoOfCaloriesPerDay: JSON.parse(this.props.settings).expectedNoOfCaloriesPerDay || DEFAULT_EXPECTED_CALORIES });
    }
  }

  handleSettingsChange(event) {
    this.setState({ expectedNoOfCaloriesPerDay: event.target.value },
      () => {
        this.props.onChange(JSON.stringify({ expectedNoOfCaloriesPerDay: this.state.expectedNoOfCaloriesPerDay }));
    });
  }

  render() {
    return (
      <div className='settings'>
        <InputWithLabel
          inputProps={{
            onChange: this.handleSettingsChange,
            value: this.state.expectedNoOfCaloriesPerDay,
            type: 'number'
          }}
          label='Expected No. of calories per day'
        />
      </div>
    );
  }
}

export default Settings;
