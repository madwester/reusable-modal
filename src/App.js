import React, { Component } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';
import { ScrollLock } from 'react-scrolllock';

const FullScreen = styled.div`
  align-items: center;
  display: flex;
  justify-content: center; 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Overlay = styled.div`
  background-color: black;
  height: 100vh;
  opacity: .5;
  width: 100vw;
  position: absolute;
`;

const InnerModal = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width: 200px;
  padding: 2%;
  z-index: 2;
`;

class Modal extends Component {
  render() {
    const { children, show, onClose } = this.props;
      return (
        <Transition
          items={show}
          from={{ opacity: 0, transform: 'translate(0, 200px)' }}
          enter={{ opacity: 1, transform: 'translate(0, 0)' }}
          leave={{ opacity: 0, transform: 'translate(0, 200px)' }}>
          {show =>
            show && (({ opacity, transform }) => (
              <FullScreen style={{ opacity }}>
              <Overlay onClick={ onClose }></Overlay>
              <ScrollLock></ScrollLock>
              <InnerModal style={{ transform }}>
                {children}
              </InnerModal>
            </FullScreen>
            ))
          }
        </Transition>
      )
  }
}

class App extends Component {
  state = {
    show: false
  }

  toggleModal = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { show } = this.state;
    return (
      <div className="App">
        <button onClick={this.toggleModal}>
          Open
        </button>
        <Modal onClose={this.toggleModal} show={show}>
        <div>
          Customs modal contents
        </div>
        </Modal>
      </div>
    );
  }
}

export default App;
