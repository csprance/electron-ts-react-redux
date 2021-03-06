import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SingleTodo from '../components/SingleTodo';
import { Dispatch, RootState } from '../redux/redux-types';
import { Todo, todoActions, TodoState } from '../redux/todo';
import { media } from '../styles/styles';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin-bottom: 35px;
  flex-direction: column;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  ${media.tablet`
      flex-direction: column;
  `};
  align-items: center;
  justify-content: center;
`;
const Row = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  max-width: 900px;
  justify-content: center;
  align-items: center;
`;
const Spacer = styled.div`
  height: 50px;
`;

type Props = {
  todos: TodoState;
  addTodoFlow: (todo: Todo) => Promise<void>;
  toggleComplete: (id: number) => void;
};
type State = {
  todo: string;
};
class HomePage extends React.Component<Props, State> {
  static defaultProps = {};
  state = {
    todo: ''
  };

  handleMenuButtonClick = () => {
    console.log('Nothing');
  };

  handleCheckBoxTick = (id: number) => {
    this.props.toggleComplete(id);
  };

  handleClick = async () => {
    this.props.addTodoFlow({
      todoText: this.state.todo,
      id: Date.now(),
      completed: false
    });
    this.setState({
      todo: ''
    });
  };

  handleChange = (e: any) => {
    this.setState({
      todo: e.target.value
    });
  };

  render() {
    const { todos } = this.props;
    const { todo } = this.state;
    return (
      <Wrapper>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={this.handleMenuButtonClick}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Next-SMRT
            </Typography>
          </Toolbar>
        </AppBar>
        <Spacer />
        <Column>
          <Row>
            <TextField
              fullWidth
              id="todo"
              label="Add Todo"
              value={todo}
              onChange={this.handleChange}
              margin="normal"
            />
            <Button
              onClick={this.handleClick}
              variant="fab"
              color="secondary"
              mini
              aria-label="Add"
            >
              <AddIcon />
            </Button>
          </Row>
        </Column>
        <Spacer />
        <Column>
          {todos.map(item => (
            <SingleTodo
              handleCheckBoxTick={this.handleCheckBoxTick}
              todo={item}
              key={item.id}
            />
          ))}
        </Column>
        <Spacer />
      </Wrapper>
    );
  }
}

export default connect(
  (store: RootState) => ({
    todos: store.todo
  }),
  (dispatch: Dispatch) => ({
    addTodoFlow: (todo: Todo) => dispatch(todoActions.addTodoThunk(todo)),
    toggleComplete: (id: number) => dispatch(todoActions.toggleComplete(id))
  })
)(HomePage);
