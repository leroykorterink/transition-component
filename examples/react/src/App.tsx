import {
  TransitionControllerRef,
  TransitionPersistence,
  TransitionRouter,
  useTransitionController,
} from '@mediamonks/react-transition-component';
import { createBrowserHistory } from 'history';
import React, { ReactNode, useRef, useState } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import About from './components/pages/About/About';
import { Path } from './routes/Path';
import { StyledNav, StyledNavLink } from './App.styles';
import Home from './components/pages/Home/Home';

interface MyTransitionComponentProps {
  children: ReactNode;
  transitionRef?: TransitionControllerRef;
}

const history = createBrowserHistory();

function MyTransitionComponent({ children, transitionRef }: MyTransitionComponentProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useTransitionController(
    () => ({
      ref: transitionRef,
      setupTransitionInTimeline(timeline) {
        timeline
          .set(divRef.current, {
            scale: 0,
          })
          .to(divRef.current, {
            rotation: 45,
            scaleY: 1,
            scaleX: 0.5,
          })
          .to(divRef.current, {
            scale: 1,
            rotation: 0,
          });

        return timeline;
      },
      setupTransitionOutTimeline(timeline) {
        timeline.to(divRef.current, {
          x: 0,
          scale: 1.5,
          rotation: -270,
          duration: 1,
        });

        return timeline;
      },
    }),
    [divRef, transitionRef],
  );

  return (
    <div
      ref={divRef}
      style={{
        width: 200,
        height: 200,
        background: 'red',
        margin: 20,
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/**
       * Custom history is used in the TransitionRouter so transition happens before transition
       */}
      <TransitionRouter history={history}>
        <StyledNav>
          <StyledNavLink to={Path.Home}>Home</StyledNavLink>
          <StyledNavLink to={Path.About}>About</StyledNavLink>
        </StyledNav>

        <button onClick={() => setShow(!show)}>Toggle TransitionPersistence</button>

        <TransitionPersistence>
          {show && <MyTransitionComponent>TransitionPersistence</MyTransitionComponent>}
        </TransitionPersistence>

        <Route path={Path.About} exact>
          <About />
        </Route>

        <Route path={Path.Home} exact>
          <Home />
        </Route>
      </TransitionRouter>
    </>
  );
}

export default App;
