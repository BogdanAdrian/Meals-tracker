import React from 'react';
import Toolbar from '../../components/Toolbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openModal } from '../../state-management/app/actions';
import { modalNames } from '../Modal/constants';
import { getAllMeals, deleteMeal } from '../../state-management/meals/asyncActions';
import { USER_ROLES } from '../../enums';
import { List } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import './ManageAllMeals.scss';

const { RangePicker } = DatePicker;

class ManageAllMeals extends React.Component {
  static propTypes = {
    meals: PropTypes.array.isRequired,
    user: PropTypes.object,
    dbUser: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    getAllMeals: PropTypes.func.isRequired,
    deleteMeal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);


    this.state = {
      selectedMeal: null,
      startDatetime: null,
      endDatetime: null,
      meals: props.meals
    };

    // get all meals
    this.props.getAllMeals();

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getItemClickHandler = this.getItemClickHandler.bind(this);
    this.getRenderItem = this.getRenderItem.bind(this);
    this.handleFilterDatesSelected = this.handleFilterDatesSelected.bind(this);
    this.handleFilterDatesChange = this.handleFilterDatesChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.meals !== this.props.meals) {
      this.setState({ meals: this.props.meals });
    }
  } 

  handleAdd() {
    this.props.openModal(modalNames.MEAL, { meal: {}, role: USER_ROLES.ADMIN });
  }
  async handleRemove() {
    await this.props.deleteMeal(this.state.selectedMeal.uid, this.state.selectedMeal.id);
    this.props.getAllMeals();
  }
  handleEdit() {
    this.props.openModal(modalNames.MEAL, { meal: this.state.selectedMeal, role: USER_ROLES.ADMIN });
  }

  getItemClickHandler(meal) {
    return () => {
      if (this.state.selectedMeal === meal) {
        // unselect
        this.setState({ selectedMeal: null });
      } else {
        // select
        this.setState({ selectedMeal: meal });
      }
    };
  }

  filterMeals() {
    if (!this.state.startDatetime || !this.state.endDatetime) {
      this.setState({ meals: this.props.meals });
    } else {
      const startDateTimeMom = moment(this.state.startDatetime);
      const endDateTimeMom = moment(this.state.endDatetime);
      const startDate = startDateTimeMom.format('YYYY-MM-DD');
      const startTime = startDateTimeMom.format('HH:mm');
      const endDate = endDateTimeMom.format('YYYY-MM-DD');
      const endTime = endDateTimeMom.format('HH:mm');

      const newMeals = this.props.meals.filter(meal => {
        const mealDateTimeMom = moment(meal.datetime);
        const mealDate = mealDateTimeMom.format('YYYY-MM-DD');
        const mealTime = mealDateTimeMom.format('HH:mm');

        return mealDate >= startDate && mealDate <= endDate && mealTime >= startTime && mealTime <= endTime;
      });
  
      this.setState({ meals: newMeals });
    }
  }

  getRenderItem(meal) {
    return (
      <List.Item>
        <div
          onClick={this.getItemClickHandler(meal)}
          className={[meal === this.state.selectedMeal ? 'selected' : '', meal.ontrack ? 'on-track' : ''].join(' ')}
        >
          <span>{meal.uid}</span>
          <span>{meal.userDisplayName}</span>
          <span>{meal.text}</span>
          <span>{moment(meal.datetime).format('MM-DD-YYYY HH:mm')}</span>
          <span>{meal.noOfCalories}</span>
        </div>
      </List.Item>
    );
  }

  getHeader() {
    return (
      <div className='header'>
        <span>Id</span>
        <span>Who</span>
        <span>What</span>
        <span>When</span>
        <span>How much (kcals)</span>
      </div>
    );
  }

  handleFilterDatesSelected(datetimes) {
    this.setState({
      startDatetime: datetimes[0].unix() * 1000,
      endDatetime: datetimes[1].unix() * 1000
    }, () => {
      this.filterMeals();
    });
  }

  handleFilterDatesChange(datetimes) {
    if (!datetimes.length) {
      this.setState({
        startDatetime: null,
        endDatetime: null
      }, () => {
        this.filterMeals();
      });
    }
  }

  render() {
    return (
      <div className='manage-all-meals'>
        <Toolbar
          onAdd={this.handleAdd}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <div className='filter-wrapper'>
          <span>Filter</span>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['Start Time', 'End Time']}
            onOk={this.handleFilterDatesSelected}
            onChange={this.handleFilterDatesChange}
          />
        </div>
        <ul className='meals-list'>
          <List
            size='small'
            bordered
            header={this.getHeader()}
            dataSource={this.state.meals}
            renderItem={this.getRenderItem}
          />
        </ul>
      </div>
    )
  }
}
function mapStateToProps({ meals: { allMeals }, app: { user, dbUser } }) {
  return {
    meals: allMeals,
    user,
    dbUser
  };
}

const mapDispatchToProps = {
  openModal,
  getAllMeals,
  deleteMeal
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAllMeals);
