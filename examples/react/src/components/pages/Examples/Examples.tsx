import {
  TransitionPresence,
  useEnterTransition,
  useLeaveTransition,
  useRouteLeaveTransition,
  useTransitionController,
} from '@mediamonks/react-transition-component';
import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import Heading from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Example } from '../../organisms/Example/Example';
import { Section } from '../../organisms/Section/Section';
import { StyledExamples } from './Examples.styles';
import { setupTransitionInTimeline, setupTransitionOutTimeline } from './Examples.transitions';
import { HeadingType } from '../../atoms/Heading/Heading.data';

function Slide({ children }: { children: ReactNode }) {
  const divRef = useRef<HTMLDivElement>(null);

  const tc = useTransitionController(() => ({
    refs: {
      divRef,
    },
    setupTransitionInTimeline(timeline, { divRef }) {
      timeline.fromTo(
        divRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.7,
        },
      );
    },
  }));

  useEnterTransition(tc);
  useLeaveTransition(tc);

  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 200,
        background: 'blue',
      }}
    >
      {children}
    </div>
  );
}

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let i = 0;

    setInterval(() => {
      i += 1;

      setActiveIndex(i);
    }, 1000);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <TransitionPresence crossFlow>
        <Slide key={activeIndex}>{activeIndex}</Slide>
      </TransitionPresence>
    </div>
  );
}

export default function Examples(): ReactElement {
  const divRef = useRef<HTMLDivElement>(null);

  const transitionController = useTransitionController(() => ({
    refs: {
      div: divRef,
    },
    setupTransitionInTimeline,
    setupTransitionOutTimeline,
  }));

  useEnterTransition(transitionController);
  useRouteLeaveTransition(transitionController);

  return (
    <StyledExamples ref={divRef}>
      <Carousel />

      <Section>
        <Heading as={HeadingType.H2}>Examples</Heading>

        <Paragraph>
          Talk is cheap! Check out these examples to see what{' '}
          <code className="language-markup">@mediamonks/react-transition-component</code> can do.
        </Paragraph>
      </Section>

      <Section>
        <Heading as={HeadingType.H3}>Conditional rendering</Heading>

        <Paragraph>
          Talk is cheap! So lets check out these examples to see what{' '}
          <code className="language-markup">@mediamonks/react-transition-component</code> can do.
        </Paragraph>

        <Example
          id="mediamonks-react-transition-component-template-smrdd"
          caption="Use this CodeSandBox as a template if you want to create a new example"
          runOnClick={false}
        />
      </Section>

      <Section>
        <Heading as={HeadingType.H3}>Image Carousel</Heading>

        <Paragraph>
          We can leverage the <code className="language-markup">TransitionPresence</code> component
          to create complex carousel style components. Every slide is wrapped by the{' '}
          <code className="language-tsx">{'<TransitionPresence />'}</code> component so that we can
          transition in/out each slide if they become active.
        </Paragraph>

        <Example id="new" caption="Hellooo" />
      </Section>

      <Section>
        <Heading as={HeadingType.H3}>Page transitions</Heading>

        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati esse omnis asperiores
          blanditiis voluptatibus nesciunt suscipit rem corporis culpa sint? Ipsum perspiciatis quo
          aliquam, alias pariatur sunt repudiandae aut doloremque!
        </Paragraph>

        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati esse omnis asperiores
          blanditiis voluptatibus nesciunt suscipit rem corporis culpa sint? Ipsum perspiciatis quo
          aliquam, alias pariatur sunt repudiandae aut doloremque! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Facere ut enim est perspiciatis voluptatum earum illum sunt
          aperiam dolore perferendis, magni quisquam nulla odio velit sequi esse totam quod iusto?
        </Paragraph>

        <Example
          id="new"
          caption={
            <>
              <code className="language-markup">@mediamonks/react-transition-component</code> tries
              to be compatible with <code className="language-markup">react-router</code> but for
              page transitions we cannot support the{' '}
              <code className="language-tsx">
                {'<'}Switch{'/>'}
              </code>{' '}
              component because it will only render one Route at a time.
            </>
          }
        />
      </Section>
    </StyledExamples>
  );
}
