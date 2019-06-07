import React from "react";
import "./Toolbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import PropTypes from "prop-types";

library.add(faPlus, faMinus, faPen, faPaperPlane);

class Toolbar extends React.Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onEmailInvite: PropTypes.func
  };


  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleEmailInvite = this.handleEmailInvite.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailInvite() {
    this.props.onEmailInvite(this.state.email);
    this.setState({ email: ''});
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div className="toolbar">
        <FontAwesomeIcon
          className="toolbar-button add"
          onClick={this.props.onAdd}
          icon='plus'
        />
        <FontAwesomeIcon
          className="toolbar-button edit"
          onClick={this.props.onEdit}
          icon='pen'
        />
        <FontAwesomeIcon
          className="toolbar-button remove"
          onClick={this.props.onRemove}
          icon='minus'
        />
        {
          this.props.onEmailInvite && (
            <React.Fragment>
              <input placeholder='Invite someone. Type email.' value={this.state.email} onChange={this.handleEmailChange} className='invite-input'/>
              <FontAwesomeIcon
                className="toolbar-button invite"
                onClick={this.handleEmailInvite}
                icon='paper-plane'
              />
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

export default Toolbar;
