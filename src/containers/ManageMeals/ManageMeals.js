import React from 'react';
import Toolbar from '../../components/Toolbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openModal } from '../../state-management/app/actions';
import { modalNames } from '../Modal/constants';
import { getMeals, deleteMeal } from '../../state-management/meals/asyncActions';
import { List } from 'antd';
import groupBy from 'lodash/groupBy';
import { DatePicker } from 'antd';
import moment from 'moment';
import './ManageMeals.scss';

const { RangePicker } = DatePicker;

export class ManageMeals extends React.Component {
  static propTypes = {
    meals: PropTypes.array,
    user: PropTypes.object,
    dbUser: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    getMeals: PropTypes.func.isRequired,
    deleteMeal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.calculatedMeals = props.meals && props.dbUser && props.dbUser.settings ? this.recalculateMeals() : [];

    this.state = {
      selectedMeal: null,
      startDatetime: null,
      endDatetime: null,
      meals: this.calculatedMeals || []
    };

    this.props.getMeals(props.user.uid);

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
      this.calculatedMeals = this.props.meals && this.props.dbUser && this.props.dbUser.settings ? this.recalculateMeals() : [];
      this.setState({ meals: this.calculatedMeals });
    }

    if (prevProps.dbUser !== this.props.dbUser) {
      if (this.props.meals) {
        this.setState({ meals: this.recalculateMeals() });
      }
    }
  } 

  handleAdd() {
    this.props.openModal(modalNames.MEAL, { meal: {} });
  }
  handleRemove() {
    this.props.deleteMeal(this.props.user.uid,this.state.selectedMeal.id);
  }
  handleEdit() {
    this.props.openModal(modalNames.MEAL, { meal: this.state.selectedMeal });
  }

  recalculateMeals() {
    const expectedNoOfCaloriesPerDay = Number.parseInt(JSON.parse(this.props.dbUser.settings).expectedNoOfCaloriesPerDay);
    const grouppedMeals = groupBy(this.props.meals, (meal) => {
      const mealDateObj = new Date(meal.datetime);
      return mealDateObj.getFullYear() + '-' + (mealDateObj.getMonth() + 1) + '-' + mealDateObj.getDate();
    });
    const calculatedMeals = [];
    for (const date in grouppedMeals) {
      let calSum = 0;
      const currentMeals = grouppedMeals[date];

      // calculate sum
      for (let i = 0; i < currentMeals.length; i++) {
        const currentMeal = currentMeals[i];
        calSum += Number.parseInt(currentMeal.noOfCalories);
      }

      // mark meals
      for (let j = 0; j < currentMeals.length; j++) {
        const currnetMealDouble = currentMeals[j];
        const newMeal = {
          ...currnetMealDouble,
          ontrack: Number.parseInt(calSum) < expectedNoOfCaloriesPerDay
        }
        calculatedMeals.push(newMeal);
      }
    }

    return calculatedMeals;
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
      this.setState({ meals: this.calculatedMeals });
    } else {
      const startDateTimeMom = moment(this.state.startDatetime);
      const endDateTimeMom = moment(this.state.endDatetime);
      const startDate = startDateTimeMom.format('YYYY-MM-DD');
      const startTime = startDateTimeMom.format('HH:mm');
      const endDate = endDateTimeMom.format('YYYY-MM-DD');
      const endTime = endDateTimeMom.format('HH:mm');

      const newMeals = this.calculatedMeals.filter(meal => {
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
      <div className='manage-meals'>
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
    );
  }
}

function mapStateToProps({ meals: { meals }, app: { user, dbUser } }) {
  return {
    meals,
    user,
    dbUser
  };
}

const mapDispatchToProps = {
  openModal,
  getMeals,
  deleteMeal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMeals);
