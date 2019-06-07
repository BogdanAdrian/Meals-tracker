import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import asyncComponent from '../../components/utils/asyncComponent';
import { closeModal } from '../../state-management/app/actions';
import ModalMat from '@material-ui/core/Modal';
import './Modal.scss';

class Modal extends React.Component {
  static propTypes = {
    modalToShow: PropTypes.string,
    modalParams: PropTypes.object,
    closeModal: PropTypes.func.isRequired
  };

  getModalContent() {
    const { modalToShow } = this.props;
    const ModalContent = modalToShow ? asyncComponent(
      () => import(`../modals/${modalToShow}`)
    ) : () => null;

    return <ModalContent params={this.props.modalParams}/>;
  }

  render(){
    return (
      <ModalMat
        className="modal"
        open={!!this.props.modalToShow}
        onBackdropClick={this.props.closeModal}
        onClose={this.props.closeModal}
      >
        <div className="content">
          {this.getModalContent()}
        </div>
      </ModalMat>
    );
  }
}

function mapStateToProps({ app: { modalToShow, modalParams }}) {
  return {
    modalToShow,
    modalParams
  };
}

const mapDispatchToProps = {
  closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
