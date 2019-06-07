import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalHeader from "../../../components/ModalHeader";
import ModalFooter from "../../../components/ModalFooter";
import InputWithLabel from "../../../components/InputWithLabel";
import { closeModal } from "../../../state-management/app/actions";
import { addMeal, editMeal, getMealCalories } from '../../../state-management/meals/asyncActions';
import { USER_ROLES } from '../../../enums';
import "./Meal.scss";
import moment from 'moment';

class Meal extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    getMealCalories: PropTypes.func.isRequired,
    addMeal: PropTypes.func.isRequired,
    editMeal: PropTypes.func.isRequired,
    user: PropTypes.object,
    params: PropTypes.shape({
      meal: PropTypes.object.isRequired,
      role: PropTypes.string
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      datetime: props.params.meal.datetime ? moment(props.params.meal.datetime).format('YYYY-MM-DDTHH:mm') : moment().format('YYYY-MM-DDTHH:mm'),
      noOfCalories: props.params.meal.noOfCalories || 0,
      text: props.params.meal.text || "",
      uid: props.params.meal.uid || ''
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
    this.handleNoOfCalChange = this.handleNoOfCalChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.continueConfirm = this.continueConfirm.bind(this);
    this.handleUidChange = this.handleUidChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.meal !== this.props.params.meal) {
      this.setState({
        datetime: new Date(this.props.params.meal.datetime) || new Date(),
        noOfCalories: this.props.params.meal.noOfCalories || 0,
        text: this.props.params.meal.text || ""
      });
    }
  }

  handleDatetimeChange(event) {
    this.setState({
      datetime: event.target.value
    });
  }

  handleNoOfCalChange(event) {
    this.setState({
      noOfCalories: event.target.value
    });

    if (event.target.name === 'noOfCal') {
      
    }
  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleUidChange({ target }) {
    this.setState({
      uid: target.value
    });
  }

  continueConfirm() {
    if (this.props.params.meal.id) {
      // edit
      this.props.editMeal(this.props.params.meal.uid || this.props.user.uid, this.props.params.meal.id, new Date(this.state.datetime).getTime(), this.state.text, this.state.noOfCalories);
    } else {
      // add
      this.props.addMeal(this.props.params.role === USER_ROLES.ADMIN ? this.state.uid : null, new Date(this.state.datetime).getTime(), this.state.text, this.state.noOfCalories);
    }
    this.props.closeModal();
  }

  async handleConfirm() {
    if (!this.state.noOfCalories) {
      const action = await this.props.getMealCalories(this.state.text);
      this.setState({ noOfCalories: action.noOfCalories }, this.continueConfirm);
    } else {
      this.continueConfirm();
    }
  }

  render() {
    return (
      <div className="meal">
        <ModalHeader title="Add/edit meal" onClose={this.props.closeModal} />
        <div className="meal-modal-body">
          <InputWithLabel
            label="Datetime"
            inputProps={{
              type: "datetime-local",
              value: this.state.datetime,
              onChange: this.handleDatetimeChange
            }}
          />
          <InputWithLabel
            label="Number of calories"
            inputProps={{
              onChange: this.handleNoOfCalChange,
              value: this.state.noOfCalories,
              name: 'noOfCal',
              type: "number"
            }}
          />
          {
            this.props.params.role === USER_ROLES.ADMIN && (
              <InputWithLabel
                label="User id"
                inputProps={{
                  onChange: this.handleUidChange,
                  value: this.state.uid,
                  name: 'uid',
                  type: "text"
                }}
              />
            )
          }
          <div className='meal-text'>
            <label>Text</label>
            <textarea value={this.state.text} onChange={this.handleTextChange}/>
          </div>
        </div>
        <ModalFooter
          onCancel={this.props.closeModal}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

function mapStateToProps({ app: { user } }) {
  return {
    user
  };
}

const mapDispatchToProps = {
  closeModal,
  addMeal,
  editMeal,
  getMealCalories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meal);
