import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions';
import selector from './selector';
import { bindActionCreators } from 'redux';
import { hashQuery } from '../../reducers/utils';
import { isLoading } from '../../utils/data';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TableRow from '@material-ui/core/es/TableRow/TableRow';
import TableCell from '@material-ui/core/es/TableCell/TableCell';
import EditImageButton from '../../common/editImgBtn';
import DeleteImageButton from '../../common/deleteImgBtn';
import SearchBar from '../../common/searchBar';
import DataTable from '../../common/table';
import EditUserDialog from '../create';
import { UserRoles } from '../../constants/userRoles';
import { push } from 'react-router-redux';

@connect(selector, dispatch => ({
  fetchUsers: bindActionCreators(actions.fetchUsers, dispatch),
  deleteUser: bindActionCreators(actions.deleteUser, dispatch),
  routerPush: bindActionCreators(push, dispatch)
}))
export default class UsersManageList extends Component {
  static propTypes = {
    users: ImmutablePropTypes.map,
    deleteUser: PropTypes.func,
    routerPush: PropTypes.func,
    fetchUsers: PropTypes.func,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.tableHeaders = [
      { label: 'ID' },
      { label: 'EMAIL', id: 'email' },
      { label: 'ROLE' },
      { label: 'ACTIONS' },
    ];
  }

  state = {};

  componentDidMount() {
    const { location } = this.props;
    this.props.fetchUsers(location.query);
  }

  componentDidUpdate(prevProps, prevState, prevContext) { // eslint-disable-line no-unused-vars
    const currentQueryHash = hashQuery(this.props.location.query);
    const prevQueryHash = hashQuery(prevProps.location.query);
    if (prevQueryHash !== currentQueryHash) {
      this.props.fetchUsers(this.props.location.query);
    }
  }

  openCreateUserDialog = () => this.setState({ showCreateDialog: true });

  closeCreateUserDialog = () => this.setState({ showCreateDialog: false });

  handleUserClick = (user) => {
    this.props.routerPush(`/users/${user.get('id')}/bookings`);
  };

  handleUserDeleteClick = (id) => async () => {
    await this.props.deleteUser({ userId: id });
    this.props.fetchUsers(this.props.location.query);
  };

  openUserEditDialog = (user) => async (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showEditDialog: true, userToEdit: user });
  };

  closeEditUserDialog = () => this.setState({ showEditDialog: false });

  renderUserRows = () => {
    const { users } = this.props;
    return users.get('data', List()).map((user) => (
      <TableRow
        hover
        onClick={() => this.handleUserClick(user)}
        tabIndex={-1}
        key={`user_${user.get('id')}`}>
        <TableCell>{user.get('id')}</TableCell>
        <TableCell>{user.get('email')}</TableCell>
        <TableCell>{user.get('role')}</TableCell>
        <TableCell>
          <EditImageButton onEdit={this.openUserEditDialog(user)}/>
          <DeleteImageButton onDelete={this.handleUserDeleteClick(user.get('id'))}/>
        </TableCell>
      </TableRow>
    ));
  };

  render() {
    const { users, location } = this.props;
    const { showCreateDialog, showEditDialog, userToEdit } = this.state;

    return (
      <div>
        <SearchBar createTitle='New User' location={location} onCreateClick={this.openCreateUserDialog}/>
        <div>
          <DataTable
            isLoading={isLoading(users)}
            location={location}
            headers={this.tableHeaders}
            rows={this.renderUserRows()}
            totalCount={users.get('totalCount')}/>
        </div>

        {showCreateDialog &&
          <EditUserDialog
            location={location}
            initialValues={{ role: UserRoles.USER }}
            onClose={this.closeCreateUserDialog}/>}

        {showEditDialog &&
          <EditUserDialog
            edit
            location={location}
            initialValues={{ ...userToEdit.toJS() }}
            onClose={this.closeEditUserDialog}/>
        }
      </div>
    );
  }
}
